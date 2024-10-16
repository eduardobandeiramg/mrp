<template>
  <v-container>
    <v-card class="gestao-produtos-container">
      <v-card-title>
        <h1>Gestão de Produtos</h1>
        <v-spacer></v-spacer>
        <v-btn  class="mb-12" color="primary" @click="abrirModalIncluir">Adicionar Produto</v-btn>
      </v-card-title>

      <!-- Tabela de Produto -->
      <v-card-text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify"></v-text-field>
        <v-data-table :headers="headers" :items="produtos" :search="search" class="elevation-1 tabela-escura">
          <template v-slot:item.isActive="{ item }">
            <span>{{ item.isActive ? 'Sim' : 'Não' }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-content-end">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-btn color="blue" @click="abrirModalEditar(item)">
                <v-icon>mdi-pencil</v-icon> Editar
              </v-btn>
              <v-btn color="red" @click="abrirModalExcluir(item)">
                <v-icon>mdi-delete</v-icon>Excluir
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>




    <!-- Modal para incluir nova ou editar existente -->
    <v-dialog v-model="modalVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="novoProduto.description" label="Nome do Produto" required></v-text-field>
            <v-text-field v-model="novoProduto.code" label="Código do Produto" required></v-text-field>
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
        <v-card-text>Deseja realmente excluir o produto <strong>{{ produtoParaExcluir?.description }}</strong>?</v-card-text>
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
import produtoService from "@/services/Produtos.js";

export default {
  data() {
    return {
      search: '',
      produtos: [],
      novoProduto: { nome: "", codigo: "", },

      modalVisivel: false,
      modalExcluirVisivel: false,
      modalTitulo: 'Incluir Novo Produto',
      editando: false,
      produtoParaExcluir: null,
      indexEditando: null,

      headers: [
        { align: 'center', title: "Nome do Produto", key: "description" },
        { align: 'center', title: "Código", key: "code" },
        { align: 'center', title: "Está ativo?", key: "isActive" },
        { align: 'center', title: "Ações", key: "actions", sortable: false },
      ],
    };
  },
  methods: {

    /////////////////////////////////////////////////
    abrirModalIncluir() {
      this.modalTitulo = 'Incluir Nova produto';
      this.editando = false;
      this.limparFormulario();
      this.modalVisivel = true;
    },
    abrirModalEditar(item) {
      this.modalTitulo = 'Editar produto';
      this.editando = true;
      this.novoProduto = { ...item };
      this.indexEditando = this.produtos.indexOf(item);
      this.modalVisivel = true;
    },
    fecharModal() {
      this.modalVisivel = false;
      this.limparFormulario();
    },
    abrirModalExcluir(item) {
      this.produtoParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.produtoParaExcluir = null;
    },
    limparFormulario() {
      this.novoProduto = { description: '', code: '' };
      this.indexEditando = null;
    },
    /////////////////////////////////////////////////


    async carregarProdutos() {
      try {
        this.produtos = await produtoService.getProducts();
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    },
    


    async salvar() {
      try {
        if (this.editando) {
          await produtoService.updateProduct(this.novoProduto.id, this.novoProduto);
        } else {
          await produtoService.addProduct(this.novoProduto);
        }
        this.fecharModal();
        this.carregarProdutos();
      } catch (error) {
        console.error('Erro ao salvar produto:', error);
      }
    },

    async confirmarExcluir() {
      try {
        await produtoService.deleteProduct(this.produtoParaExcluir.id);
        this.fecharModalExcluir();
        this.carregarProdutos();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    },
    
    
  },
  mounted() {
    this.carregarProdutos();
  },
};
</script>


<style scoped>

.gestao-produtos-container {
  margin-top: 70px;
  padding: 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}

.tabela-escura .v-data-table__wrapper {
  background-color: #444;
  color: #fff;
}

.tabela-escura th {
  background-color: #555;
  color: #fff;
}

.tabela-escura td {
  background-color: #444;
  color: #fff;
}

.v-btn {
  margin-right: 10px;
}


</style>