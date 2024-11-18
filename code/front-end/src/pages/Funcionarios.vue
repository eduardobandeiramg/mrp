<template>
  <v-container>
    <v-card flat class="gestao-funcionarios-container">
      <v-card-title>
        <h1>Gestão de Funcionários</h1>
        <v-spacer></v-spacer>
        <v-btn class="mb-12" color="primary" @click="abrirModalIncluir"> Adicionar Funcionário </v-btn>
      </v-card-title>

      <!-- Tabela de Funcionários -->
      <v-card-text>
        <v-text-field v-model="search" label="Pesquisar" prepend-inner-icon="mdi-magnify"></v-text-field>
        <v-data-table :headers="headers" :items="funcionarios" :search="search" class="elevation-1 tabela-escura">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-content-end">
              <v-spacer></v-spacer>
              <v-btn color="blue" @click="abrirModalEditar(item)">
                <v-icon>mdi-pencil</v-icon> Editar
              </v-btn>
              <v-btn color="red" @click="abrirModalExcluir(item)">
                <v-icon>mdi-delete</v-icon> Excluir
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Modal para incluir ou editar funcionário -->
    <v-dialog v-model="modalVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="novoFuncionario.name" label="Nome do Funcionário" required></v-text-field>
            <v-text-field v-model="novoFuncionario.position" label="Cargo" required></v-text-field>
            <v-text-field v-model="novoFuncionario.department" label="Departamento" required></v-text-field>
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
        <v-card-text>Deseja realmente excluir o funcionário <strong>{{ funcionarioParaExcluir?.name }}</strong>?</v-card-text>
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
import funcionarioService from '@/services/Funcionarios';

export default {
  data() {
    return {
      search: '',
      funcionarios: [],
      novoFuncionario: { name: '', position: '', department: '' },
      modalVisivel: false,
      modalExcluirVisivel: false,
      modalTitulo: 'Incluir Novo Funcionário',
      editando: false,
      funcionarioParaExcluir: null,
      indexEditando: null,
      headers: [
        { align: 'center', text: 'Nome do Funcionário', value: 'name' },
        { align: 'center', text: 'Cargo', value: 'position' },
        { align: 'center', text: 'Departamento', value: 'department' },
        { align: 'center', text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    abrirModalIncluir() {
      this.modalTitulo = 'Incluir Novo Funcionário';
      this.editando = false;
      this.limparFormulario();
      this.modalVisivel = true;
    },
    abrirModalEditar(item) {
      this.modalTitulo = 'Editar Funcionário';
      this.editando = true;
      this.novoFuncionario = { ...item };
      this.indexEditando = this.funcionarios.indexOf(item);
      this.modalVisivel = true;
    },
    fecharModal() {
      this.modalVisivel = false;
      this.limparFormulario();
    },
    abrirModalExcluir(item) {
      this.funcionarioParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.funcionarioParaExcluir = null;
    },
    limparFormulario() {
      this.novoFuncionario = { name: '', position: '', department: '' };
      this.indexEditando = null;
    },
    async carregarFuncionarios() {
      try {
        this.funcionarios = await funcionarioService.getFuncionarios();
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
      }
    },
    async salvar() {
      try {
        if (this.editando) {
          await funcionarioService.updateFuncionario(this.novoFuncionario.id, this.novoFuncionario);
        } else {
          await funcionarioService.addFuncionario(this.novoFuncionario);
        }
        this.fecharModal();
        this.carregarFuncionarios();
      } catch (error) {
        console.error('Erro ao salvar funcionário:', error);
      }
    },
    async confirmarExcluir() {
      try {
        await funcionarioService.deleteFuncionario(this.funcionarioParaExcluir.id);
        this.fecharModalExcluir();
        this.carregarFuncionarios();
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
      }
    },
  },
  mounted() {
    this.carregarFuncionarios();
  },
};
</script>

<style scoped>
.gestao-funcionarios-container {
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
