<template>
  <v-container>
    <v-card class="linha-container">
      <v-card-title>
        <h1>Gestão de Linhas de Produção</h1>
        <v-spacer></v-spacer>
        <v-btn class="mb-12" color="primary" @click="abrirModalAdicionar">
          Adicionar Linha
        </v-btn>
      </v-card-title>
      <!-- Tabela de Linhas -->
      <v-card-text>
        <v-data-table :items="linhas" :headers="headers" item-key="id" class="elevation-1 tabela-escura">
          <template v-slot:[`item.acao`]="{ item }">
            <div class="d-flex justify-content-end">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <v-btn color="blue" @click="editarLinha(item)">
                <v-icon>mdi-pencil</v-icon>Editar
              </v-btn>
              <v-btn color="red" @click="excluirLinha(item.id)">
                <v-icon>mdi-delete</v-icon>Excluir
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <!-- Modal para adicionar/editar linha -->
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ editando ? 'Editar Linha' : 'Adicionar Linha' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="linha.nome" label="Nome da Linha"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="salvarLinha">{{ editando ? 'Salvar' : 'Adicionar' }}</v-btn>
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
      linhas: [],
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Ações', value: 'acao', sortable: false },
      ],
      linha: { nome: '' },
      showDialog: false,
      editando: false,
      linhaId: null,
    };
  },
  methods: {
    async carregarLinhas() {
      try {
        this.linhas = await linhaService.getLines();
      } catch (error) {
        console.error('Erro ao carregar linhas:', error);
      }
    },
    abrirModalAdicionar() {
      console.log(localStorage.getItem('authToken'))

      this.linha = { nome: '' };
      this.editando = false;
      this.showDialog = true;
    },
    async salvarLinha() {
      try {
        if (this.editando) {
          await linhaService.atualizarLinha(this.linhaId, this.linha);
        } else {
          await linhaService.adicionarLinha(this.linha);
        }
        this.fecharModal();
        this.carregarLinhas();
      } catch (error) {
        console.error('Erro ao salvar linha:', error);
      }
    },
    editarLinha(item) {
      this.linha = { ...item };
      this.linhaId = item.id;
      this.editando = true;
      this.showDialog = true;
    },
    async excluirLinha(id) {
      try {
        await linhaService.excluirLinha(id);
        this.carregarLinhas();
      } catch (error) {
        console.error('Erro ao excluir linha:', error);
      }
    },
    fecharModal() {
      this.showDialog = false;
      this.linha = { nome: '' };
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
