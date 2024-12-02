<template>
  <v-container>
    <v-card flat class="caixa-entrada-container">
      <v-card-title>
        <h1>Caixa de Entrada</h1>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-data-table :items="mensagens" :headers="headers" :search="search" class="elevation-1 tabela-escura">
          <template v-slot:[`item.acao`]="{ item }">
            <div class="d-flex justify-content-end">
              <v-btn color="blue" @click="abrirModalVisualizar(item)">
                <v-icon>mdi-eye</v-icon>Ver Detalhes
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Modal para visualizar mensagem -->
    <v-dialog v-model="modalVisualizarVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Visualizar Mensagem</v-card-title>
        <v-card-text>
          <p><strong>De:</strong> {{ mensagemSelecionada?.responsavel }}</p>
          <p><strong>Status:</strong> {{ mensagemSelecionada?.status }}</p>
          <p>{{ mensagemSelecionada?.conteudo }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModalVisualizar">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de resposta -->
    <v-dialog v-model="modalResponderVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Responder Mensagem</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="resposta.status" label="Status" required></v-text-field>
            <v-textarea v-model="resposta.conteudo" label="Conteúdo da resposta" rows="5" required></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModalResponder">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="enviarResposta">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de confirmação de exclusão -->
    <v-dialog v-model="modalExcluirVisivel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>Deseja realmente excluir a mensagem de
          <strong>{{ mensagemSelecionada?.responsavel }}</strong>?</v-card-text>
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
export default {
  data() {
    return {
      search: "",
      mensagens: [],

      modalVisualizarVisivel: false,
      modalResponderVisivel: false,
      modalExcluirVisivel: false,

      mensagemSelecionada: null,
      resposta: { status: "", conteudo: "" },

      headers: [
        { align: "center", title: "Produção", key: "producao" },
        { align: "center", title: "Status", key: "Status" },
        { align: "center", title: "Data de início", key: "dataIni" },
        { align: "center", title: "Data da útima atualização", key: "data" },
        { align: "center", title: "Ações", key: "acao", sortable: false },
      ],
    };
  },
  methods: {
    abrirModalVisualizar(item) {
      this.mensagemSelecionada = item;
      this.modalVisualizarVisivel = true;
    },
    fecharModalVisualizar() {
      this.modalVisualizarVisivel = false;
    },
    abrirModalResponder(item) {
      this.mensagemSelecionada = item;
      this.resposta.status = `Re: ${item.status}`;
      this.modalResponderVisivel = true;
    },
    fecharModalResponder() {
      this.modalResponderVisivel = false;
    },
    enviarResposta() {
      // Lógica para enviar a resposta
      this.fecharModalResponder();
    },
    abrirModalExcluir(item) {
      this.mensagemSelecionada = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
    },
    confirmarExcluir() {
      // Lógica para excluir a mensagem
      this.fecharModalExcluir();
    },
  },
  mounted() {
    // Carregar mensagens ao montar o componente
    this.mensagens = [
      {
        responsavel: "João",
        Status: "Orçamento",
        data: "2024-10-20",
        conteudo: "Olá, segue o orçamento.",
      },
      {
        responsavel: "Maria",
        Status: "Reunião",
        data: "2024-10-21",
        conteudo: "A reunião será às 14h.",
      },
      // Mais mensagens...
    ];
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}

.caixa-entrada-container {
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
</style>
