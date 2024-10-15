<template>
  <v-container>
    <v-card class="gestao-produtos-container">
      <v-card-title>
        <h1>Gestão de Produtos</h1>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="abrirDialogoAdicionarProduto">Adicionar Produto</v-btn>
      </v-card-title>
      <!-- Tabela de Peças -->
      <v-card-text>
        <v-data-table :headers="headers" :items="produtos" class="elevation-1 tabela-escura" item-class="tabela-item">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-content-end">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-btn color="blue" @click="editarProduto(item)">
                <v-icon>mdi-pencil</v-icon> Editar
              </v-btn>
              <v-btn color="red" @click="excluirProduto(item)">
                <v-icon>mdi-delete</v-icon>Excluir
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>




    <!-- Modal para incluir nova peça ou editar peça existente -->
    <v-dialog v-model="dialogoAdicionar" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Produto</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="novoProduto.nome" label="Nome do Produto" required></v-text-field>
            <v-text-field v-model="novoProduto.codigo" label="Código do Produto" required></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="adicionarProduto">Adicionar</v-btn>
          <v-btn color="red" @click="dialogoAdicionar = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de confirmação de exclusão -->
    <v-dialog v-model="modalExcluirVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>
          <!-- Deseja realmente excluir a peça <strong>{{ produtoParaExcluir.nome }}</strong>? -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModalExcluir">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="confirmarExcluirPeca">Excluir</v-btn>
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
      produtos: [],
      dialogoAdicionar: false,
      novoProduto: {
        nome: "",
        codigo: "",
      },
      headers: [
        { text: "Nome do Produto", value: "nome" },
        { text: "Código", value: "codigo" },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async carregarProdutos() {
      try {
        this.produtos = await produtoService.getProducts();
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    },
    abrirDialogoAdicionarProduto() {
      this.dialogoAdicionar = true;
    },
    async adicionarProduto() {
      if (this.$refs.form.validate()) {
        try {
          await produtoService.addProduct(this.novoProduto);
          this.dialogoAdicionar = false;
          this.carregarProdutos(); // Atualiza a lista após adicionar
        } catch (error) {
          console.error("Erro ao adicionar produto:", error);
        }
      }
    },
    editarProduto(item) {
      console.log("Editar produto:", item);
      // Implementar lógica de edição
    },
    excluirProduto(item) {
      console.log("Excluir produto:", item);
      // Implementar lógica de exclusão
    },
  },
  mounted() {
    this.carregarProdutos();
  },
};
</script>


<style scoped>
.coluna-botao {
  width: 100px;
}

.gestao-produtos-container {
  margin-top: 70px;
  height: 80vh;
  width: 90vw;
  padding: 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}

.v-btn {
  margin-right: 10px;
}

.tabela-escura .v-data-table__wrapper {
  background-color: #444;
  /* Cor de fundo escura para a tabela */
  color: #fff;
  /* Cor do texto */
}

.tabela-escura th {
  background-color: #555;
  /* Cor de fundo dos cabeçalhos da tabela */
  color: #fff;
  /* Cor do texto dos cabeçalhos */
}

.tabela-escura td {
  background-color: #444;
  /* Cor de fundo das células */
  color: #fff;
  /* Cor do texto das células */
}

.tabela-escura {
  background-color: #444;
  /* Cor de fundo das células */
  color: #fff;
  /* Cor do texto das células */
}
</style>