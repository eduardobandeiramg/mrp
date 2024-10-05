<template>
  <v-container>
    <v-card class="produtos-container">
      <v-card-title>
        <h1>Gestão Produtos</h1>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-treeview v-model:activated="active" v-model:opened="open" :items="items" :load-children="fetchUsers"
        color="warning" item-title="name" item-value="id" activatable open-on-click transition>
        <template v-slot:prepend="{ item }">
          <v-btn icon @click="abrirModalEditarProduto(item)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-icon v-if="!item.children">
            mdi-account
          </v-icon>
        </template>
      </v-treeview>
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
        </v-card-text>0
        145+0 0
+

,q  <v-card-actions>
          <v-btn color="blue darken-1" text @click="fecharModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="salvarPeca">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>


const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  data: () => ({
    active: [],
    avatar: null,
    open: [],
    users: [],
  }),

  computed: {
    items() {
      return [
        {
          name: 'Users',
          children: this.users,
        },
      ]
    },
    selected() {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.users.find(user => user.id === id)
    },
  },

  watch: {
    selected: 'randomAvatar',
  },

  methods: {
    abrirModalEditarProduto(item) {
      this.modalTitulo = 'Editar Peça';
      this.editando = true;
      this.novaPeca = { ...item }; // Carrega os dados da peça para edição
      this.indexEditando = this.item.indexOf(item);
      this.modalVisivel = true;

    },
    async fetchUsers(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500)

      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => (item.children.push(...json)))
        .catch(err => console.warn(err))
    },
    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
    },
  },
}
</script>
<style scoped>
.produtos-container {
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
