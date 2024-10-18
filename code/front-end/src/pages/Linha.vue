<template>
  <v-container>
    <v-card flat class="linha-container">
      <v-card-title>
        <h1>Gestão de Linhas de Produção</h1>
        <v-spacer></v-spacer>
        <v-btn class="mb-12" color="primary" @click="abrirModalIncluir"> Adicionar Linha </v-btn>
      </v-card-title>

      <!-- Tabela de Linhas -->
      <v-card-text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify"></v-text-field>
        <v-data-table :items="linhas" :headers="headers" :search="search" class="elevation-1 tabela-escura">
          <template v-slot:[`item.acao`]="{ item }">
            <div class="d-flex justify-content-end">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-btn color="blue" @click="abrirModalEditar(item)">
                <v-icon>mdi-pencil</v-icon>Editar
              </v-btn>
              <v-btn color="red" @click="abrirModalExcluir(item)">
                <v-icon>mdi-delete</v-icon>Excluir
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Modal para incluir ou editar linha -->
    <v-dialog v-model="modalVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="novaLinha.name" label="Nome da linha" required></v-text-field>
            <!-- <v-text-field v-model="novaLinha.code" label="Código da linha" required></v-text-field> -->
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
        <v-card-text>Deseja realmente excluir a linha <strong>{{ linhaParaExcluir?.nome }}</strong>?</v-card-text>
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
import linhaService from '@/services/Linha.js';

export default {
  data() {
    return {
      search: '',
      linhas: [],
      novaLinha: { name: '' },

      modalVisivel: false,
      modalExcluirVisivel: false,
      modalTitulo: 'Incluir Nova Linha',
      editando: false,
      linhaParaExcluir: null,
      indexEditando: null,

      headers: [
        { align: 'center', title: 'Nome', key: 'name' },
        { align: 'center', title: 'Ações', key: 'acao', sortable: false },
      ],

    };
  },
  methods: {

    /////////////////////////////////////////////////
    abrirModalIncluir() {
      this.modalTitulo = 'Incluir Nova Linha';
      this.editando = false;
      this.limparFormulario();
      this.modalVisivel = true;
    },
    abrirModalEditar(item) {
      this.modalTitulo = 'Editar Linha';
      this.editando = true;
      this.novaLinha = { ...item };
      this.indexEditando = this.linhas.indexOf(item);
      this.modalVisivel = true;
    },
    fecharModal() {
      this.modalVisivel = false;
      this.limparFormulario();
    },
    abrirModalExcluir(item) {
      this.linhaParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.linhaParaExcluir = null;
    },
    limparFormulario() {
      this.novaLinha = { description: '' };
      this.indexEditando = null;
    },
    /////////////////////////////////////////////////

    async carregarLinhas() {
      try {
        this.linhas = await linhaService.getAllLines();
      } catch (error) {
        console.error('Erro ao carregar linhas:', error);
      }
    },
 
    async salvar() {
      try {
        if (this.editando) {
          await linhaService.updateLine(this.novaLinha.lineId, this.novaLinha);
        } else {
          await linhaService.addLine(this.novaLinha);
        }
        this.fecharModal();
        this.carregarLinhas();
      } catch (error) {
        console.error('Erro ao salvar linha:', error);
      }
    },

    async confirmarExcluir() {
      try {
        await linhaService.deleteLine(this.linhaParaExcluir.lineId);
        this.fecharModalExcluir();
        this.carregarLinhas();
      } catch (error) {
        console.error('Erro ao excluir linha:', error);
      }
    },

  },
  mounted() {
    this.carregarLinhas();
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}

.linha-container {
  margin-top: 70px;
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

</style>
