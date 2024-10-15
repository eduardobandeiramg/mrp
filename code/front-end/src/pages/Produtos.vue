<template>
  <v-container>
    <v-card class="gestao-pecas-container">
      <v-card-title>
        <h1>Gestão de Produtos</h1>
        <v-spacer></v-spacer>
        <v-btn class="mb-12" color="primary" @click="abrirModalIncluirPeca">
          Adicionar Peça
        </v-btn>
      </v-card-title>
      <!-- Tabela de Peças -->
      <v-card-text>
        <v-data-table :headers="headers" :items="pecas" class="elevation-1 tabela-escura" item-class="tabela-item">

          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-content-end">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn class="" color="blue" @click="abrirModalEditarPeca(item)">
                <v-icon>mdi-pencil</v-icon> Editar
              </v-btn>
              <v-btn class="" color="red" @click="abrirModalExcluirPeca(item)">
                <v-icon>mdi-delete</v-icon>Excluir
              </v-btn>
              </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>




    <!-- Modal para incluir nova peça ou editar peça existente -->
    <v-dialog v-model="modalVisivel" max-width="1500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="novaPeca.nome" label="Nome da Peça" required></v-text-field>
            <v-text-field v-model="novaPeca.codigo" label="Código da Peça" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="fecharModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="salvarPeca">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de confirmação de exclusão -->
    <v-dialog v-model="modalExcluirVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>
          <!-- Deseja realmente excluir a peça <strong>{{ pecaParaExcluir.nome }}</strong>? -->
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
export default {
  data() {
    return {
      modalVisivel: false,
      modalExcluirVisivel: false,
      modalTitulo: 'Incluir Nova Peça',
      editando: false, // Define se estamos no modo de edição
      headers: [
        { text: 'Nome da Peça', value: 'nome' },
        { text: 'Código da Peça', value: 'codigo' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      pecas: [
        { nome: 'Peça A', codigo: '123' },
        { nome: 'Peça B', codigo: '456' },
      ],
      novaPeca: {
        nome: '',
        codigo: '',
      },
      pecaParaExcluir: null, // Armazena a peça a ser excluída
      indexEditando: null, // Armazena o índice da peça que está sendo editada
    };
  },
  methods: {
    abrirModalIncluirPeca() {
      this.modalTitulo = 'Incluir Nova Peça';
      this.editando = false;
      this.limparFormulario();
      this.modalVisivel = true;
    },
    abrirModalEditarPeca(item) {
      this.modalTitulo = 'Editar Peça';
      this.editando = true;
      this.novaPeca = { ...item }; // Carrega os dados da peça para edição
      this.indexEditando = this.pecas.indexOf(item);
      this.modalVisivel = true;
    },
    abrirModalExcluirPeca(item) {
      this.pecaParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModal() {
      this.modalVisivel = false;
      this.limparFormulario();
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.pecaParaExcluir = null;
    },
    salvarPeca() {
      if (this.novaPeca.nome && this.novaPeca.codigo) {
        if (this.editando) {
          // Atualiza a peça existente
          this.$set(this.pecas, this.indexEditando, { ...this.novaPeca });
        } else {
          // Adiciona uma nova peça
          this.pecas.push({ ...this.novaPeca });
        }
        this.fecharModal();
      } else {
        alert('Por favor, preencha todos os campos!');
      }
    },
    confirmarExcluirPeca() {
      const indice = this.pecas.indexOf(this.pecaParaExcluir);
      if (indice > -1) {
        this.pecas.splice(indice, 1);
      }
      this.fecharModalExcluir();
    },
    limparFormulario() {
      this.novaPeca = {
        nome: '',
        codigo: '',
      };
      this.indexEditando = null;
    },
  },
};
</script>


<style scoped>
.coluna-botao {
  width: 100px;
}

.gestao-pecas-container {
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