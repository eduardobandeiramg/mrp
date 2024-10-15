<template>
  <v-container>
    <v-card class="gestao-pecas-container">
      <v-card-title>
        <h1>Gestão de Peças</h1>
        <v-spacer></v-spacer>
        <v-btn class="mb-12" color="primary" @click="abrirModalIncluirPeca">
          Adicionar Peça
        </v-btn>
      </v-card-title>

      <!-- Tabela de Peças -->
      <v-card-text>
        <v-data-table :headers="headers" :items="pecas" class="elevation-1 tabela-escura">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-content-end">
              <v-spacer></v-spacer>
              <v-btn color="blue" @click="abrirModalEditarPeca(item)">
                <v-icon>mdi-pencil</v-icon> Editar
              </v-btn>
              <v-btn color="red" @click="abrirModalExcluirPeca(item)">
                <v-icon>mdi-delete</v-icon> Excluir
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Modal para incluir ou editar peça -->
    <v-dialog v-model="modalVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="novaPeca.description" label="Nome da Peça" required></v-text-field>
            <v-text-field v-model="novaPeca.code" label="Código da Peça" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="salvarPeca">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de confirmação de exclusão -->
    <v-dialog v-model="modalExcluirVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>Deseja realmente excluir a peça <strong>{{ pecaParaExcluir?.nome }}</strong>?</v-card-text>
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
import pecaService from '@/services/Pecas';

export default {
  data() {
    return {
      pecas: [],
      novaPeca: { description: '', code: '' },
      modalVisivel: false,
      modalExcluirVisivel: false,
      modalTitulo: 'Incluir Nova Peça',
      editando: false,
      pecaParaExcluir: null,
      indexEditando: null,
      headers: [
        { text: 'Nome da Peça', value: 'description' },
        { text: 'Código da Peça', value: 'code' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    async carregarPecas() {
      try {
        this.pecas = await pecaService.getMaterials();
      } catch (error) {
        console.error('Erro ao carregar peças:', error);
      }
    },
    abrirModalIncluirPeca() {
      this.modalTitulo = 'Incluir Nova Peça';
      this.editando = false;
      this.limparFormulario();
      this.modalVisivel = true;
    },
    abrirModalEditarPeca(item) {
      this.modalTitulo = 'Editar Peça';
      this.editando = true;
      this.novaPeca = { ...item };
      this.indexEditando = this.pecas.indexOf(item);
      this.modalVisivel = true;
    },
    fecharModal() {
      this.modalVisivel = false;
      this.limparFormulario();
    },
    async salvarPeca() {
      try {
        if (this.editando) {
          await pecaService.updateMaterial(this.novaPeca.id, this.novaPeca);
        } else {
          await pecaService.addMaterial(this.novaPeca);
        }
        this.fecharModal();
        this.carregarPecas();
      } catch (error) {
        console.error('Erro ao salvar peça:', error);
      }
    },
    abrirModalExcluirPeca(item) {
      this.pecaParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.pecaParaExcluir = null;
    },
    async confirmarExcluirPeca() {
      try {
        await pecaService.deleteMaterial(this.pecaParaExcluir.id);
        this.fecharModalExcluir();
        this.carregarPecas();
      } catch (error) {
        console.error('Erro ao excluir peça:', error);
      }
    },
    limparFormulario() {
      this.novaPeca = { description: '', code: '' };
      this.indexEditando = null;
    },
  },
  mounted() {
    this.carregarPecas();
  },
};
</script>

<style scoped>
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
