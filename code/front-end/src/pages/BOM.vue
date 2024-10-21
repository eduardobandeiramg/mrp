<template>
  <v-container>
    <v-card flat class="hierarquia-container">

      <v-card-title>
        <h1>Bild Of Materials</h1>
        <v-spacer></v-spacer>
        <v-btn class="mb-12" color="primary" @click="abrirModalIncluir">Adicionar hierarquia</v-btn>
      </v-card-title>
      <v-card-text>

        <v-treeview :items="items" item-title="description" item-value="id" open-all>

          <template v-slot:prepend="{ item }">
            <v-row class="align-center">
              <v-col>
                <v-icon v-if="!item.children"> mdi-cube </v-icon>
              </v-col>
              <v-col>
                <v-btn v-if="!item.children" icon @click="abrirModalExcluir(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>

            </v-row>
          </template>

        </v-treeview>

      </v-card-text>
    </v-card>

    <!-- Modal para incluir ou editar hierarquia -->
    <v-dialog v-model="modalVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="novaHierarquia.qtd" label="Número" type="number"
              :rules="[rules.required, rules.isNumber]" required variant="solo"></v-text-field>

            <v-select v-model="novaHierarquia.productId" :items="produtos" item-title="description" item-value="id"
              label="Selecionar Produto" :rules="[rules.required]" required variant="solo" />

            <v-select v-model="novaHierarquia.materialId" :items="materiais" item-title="description" item-value="id"
              label="Selecionar Material" :rules="[rules.required]" required variant="solo" />

            <v-select v-model="novaHierarquia.parentBuildOfMaterialId" :items="combinacaoProdutosMateriais"
              item-title="description" item-value="id" label="Selecionar Produto ou Material" variant="solo" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="salvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Modal de confirmação de exclusão -->
    <v-dialog v-model="modalExcluirVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>Deseja realmente excluir a hierarquia <strong>{{
          hierarquiaParaExcluir?.nome }}</strong>?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModalExcluir">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="confirmarExcluir">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>

</template>

<script>

const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
import produtoService from "@/services/Produtos.js";
import pecasService from "@/services/Pecas.js";
import bomService from "@/services/BOM.js"


export default {
  data: () => ({

    hierarquia: [],
    items: [],

    active: [],
    open: [],
    users: [],

    modalVisivel: false,
    modalExcluirVisivel: false,
    modalTitulo: 'Incluir Nova Peça',
    editando: false,
    hierarquiaParaExcluir: null,
    indexEditando: null,
    active: [],
    open: [],

    novaHierarquia: {
      qtd: null,
      productId: null,
      materialId: null,
      parentBuildOfMaterialId: null,
    },

    valid: false, // Controla a validade do formulário
    rules: {
      required: value => !!value || 'Este campo é obrigatório.',
      isNumber: value => !isNaN(value) || 'Este campo deve ser um número.',
    },
    novoMaterial: null,
    novoProduto: null,
    produtos: [], // Lista de produtos
    materiais: [], // Lista de materiais
    combinacaoProdutosMateriais: [], // Combinação de produtos e materiais

  }),

  methods: {
    async fetchUsers(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500)

      const response = fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => (item.children.push(...json)))
        .catch(err => console.warn(err))

      console.log(response)
      return response
    },

    async carregarProdutos() {
      try {
        this.produtos = await produtoService.getProducts();
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    },
    async carregarMateriais() {
      try {
        this.materiais = await pecasService.getMaterials();
      } catch (error) {
        console.error("Erro ao carregar materiais:", error);
      }
    },
    async combinarListas() {
      await this.carregarProdutos();
      await this.carregarMateriais();
      await this.fetchHierarquia();

      this.combinacaoProdutosMateriais = [...this.produtos, ...this.materiais];
    },

    async salvar() {
      // Verifica se o formulário é válido
      if (this.$refs.form.validate()) {
        try {
          this.novaHierarquia.qtd = Number(this.novaHierarquia.qtd);
          await bomService.addBOM(this.novaHierarquia);

          this.fecharModal();
          this.carregarProdutos();
        } catch (error) {
          console.error('Erro ao salvar Build of Materials:', error);
        }
      }
    },


    async fetchHierarquia() {
      // Usar Promise.all para garantir que todas as promessas de fetchChildren sejam resolvidas
      this.items = await Promise.all(
        this.produtos.map(async (produto) => {
          const children = await this.fetchChildren(produto);  // Aguardar a resposta de fetchChildren

          return {
            id: produto.id,
            description: produto.description,
            children: children.map(child => ({
              id: child.id,
              description: child.material.description,  // Cada filho também deve ter description
            })),

          };
        })
      );

      console.log(this.items);
      return this.items;
    },
    async fetchChildren(item) {
      try {
        const response = await bomService.getBOMByProductId(item.id);
        return response

      } catch (error) {
        console.error("Erro ao carregar materiais:", error);
      }
    },

    /////////////////////////////////////////////////
    abrirModalIncluir() {
      this.modalTitulo = 'Incluir Nova Peça';
      this.editando = false;
      this.limparFormulario();
      this.modalVisivel = true;

    },
    abrirModalEditar(item) {
      this.modalTitulo = 'Editar Peça';
      this.editando = true;
      this.novaHierarquia = { ...item };
      this.indexEditando = this.users.indexOf(item);
      this.modalVisivel = true;
    },
    fecharModal() {
      this.modalVisivel = false;
      this.limparFormulario();
    },
    abrirModalExcluir(item) {
      this.hierarquiaParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.hierarquiaParaExcluir = null;
    },
    limparFormulario() {
      this.novaHierarquia = {
        qtd: null,
        productId: null,
        materialId: null,
        parentBuildOfMaterialId: null,
      },
        this.indexEditando = null;
    },
    /////////////////////////////////////////////////
  },
  mounted() {
    this.combinarListas()
  },

}
</script>

<style scoped>
.botoes {}

.hierarquia-container {
  margin-top: 70px;
  padding: 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}
</style>
