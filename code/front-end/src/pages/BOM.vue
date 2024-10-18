<template>
  <v-container>
    <v-card flat class="hierarquia-container">
      <v-card-title>
        <h1>Gestão Hierarquia</h1>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>

        <v-treeview v-model:activated="active" v-model:opened="open" :items="items" :load-children="fetchUsers"
          color="warning" item-title="name" item-value="id" activatable transition>
          <template v-slot:prepend="{ item }">
            <v-btn icon @click="abrirModalEditar(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon @click="abrirModalExcluir(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-icon v-if="!item.children"> mdi-gear </v-icon>
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
            <v-text-field v-model="novaHierarquia.description" label="Nome da hierarquia" required></v-text-field>
            <v-text-field v-model="novaHierarquia.code" label="Código da hierarquia" required></v-text-field>
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
        <v-card-text>Deseja realmente excluir a hierarquia <strong>{{ hierarquiaParaExcluir?.nome
            }}</strong>?</v-card-text>
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

export default {
  data: () => ({

    modalVisivel: false,
    modalExcluirVisivel: false,
    modalTitulo: 'Incluir Nova Peça',
    editando: false,
    hierarquiaParaExcluir: null,
    indexEditando: null,

    active: [],
    avatar: null,
    open: [],
    hierarquias: [],

  }),

  computed: {
    items() {
      return [
        {
          name: 'Users',
          children: this.hierarquias,
        },
      ]
    },
    selected() {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.hierarquias.find(user => user.id === id)
    },
  },


  methods: {

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
      this.indexEditando = this.hierarquias.indexOf(item);
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
      this.novaHierarquia = { description: '', code: '' };
      this.indexEditando = null;
    },
    /////////////////////////////////////////////////



    async fetchUsers(item) {

      await pause(1500)

      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => (item.children.push(...json)))
        .catch(err => console.warn(err))
    },

  },
}
</script>
<style scoped>
.hierarquia-container {
  margin-top: 70px;
  height: 80vh;
  width: 90vw;
  padding: 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}
</style>
