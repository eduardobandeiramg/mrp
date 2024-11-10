<template>
  <v-container>
    <v-card flat class="planejamento-producao-container">

      <v-card-title>
        <h1>Planejamento de Produção</h1>
        <v-spacer></v-spacer>

        <v-btn class="mb-12" color="primary" @click="abrirModalIncluir">Adicionar Planejamento</v-btn>

      </v-card-title>

      <v-card-text>
        <v-sheet>
          <v-calendar ref="calendar" v-model="today" :events="events" color="primary" type="month" @click:day="handleDayClick"></v-calendar>
        </v-sheet>
      </v-card-text>
    </v-card>



    <v-dialog v-model="modalVisivel" max-width="70%">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="6">
                <v-date-picker v-model="novaProducao.datePrev" :rules="[rules.required]" @input="menuDate = false">
                </v-date-picker>
              </v-col>

              <!-- Coluna para os 3 campos (quantidade, produto, linha) -->
              <v-col cols="6">
                <!-- Campo de quantidade -->
                <v-text-field v-model="novaProducao.qtd" label="Quantidade" type="number"
                  :rules="[rules.required, rules.isNumber]" required variant="solo">
                </v-text-field>

                <!-- Campo para selecionar produto -->
                <v-select v-model="novaProducao.productId" :items="produtos" item-title="description" item-value="id"
                  label="Selecionar Produto" :rules="[rules.required]" required variant="solo" />

                <!-- Campo para selecionar linha de produção -->
                <v-select v-model="novaProducao.lineId" :items="linhas" item-title="name" item-value="id"
                  label="Selecionar Linha de Produção" :rules="[rules.required]" required variant="solo" />
              </v-col>
            </v-row>
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
        <v-card-text>Deseja realmente excluir o planejamento?</v-card-text>
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
import { useDate } from 'vuetify'
import linhaService from "@/services/Linha.js";
import produtoService from "@/services/Produtos.js";
import planejamentoService from "@/services/Planejamento.js"

export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    today: null,
    modalVisivel: false, // Inicia o modal fechado
    modalExcluirVisivel: false,
    modalTitulo: 'Incluir Novo Planejamento',
    editando: false,
    produtoParaExcluir: null,
    indexEditando: null,
    novaProducao: {
      qtd: null,
      datePrev: null,
      productId: null,
      lineId: null,
    },
    produtos: [], // Lista de produtos
    linhas: [],   // Lista de linhas de produção
    menuDate: false, // Controla o estado do seletor de data
    events: [],
    // Regras de validação para o formulário
    rules: {
      required: value => !!value || 'Este campo é obrigatório.',
      isNumber: value => !isNaN(value) || 'Este campo deve ser um número.'
    },



    focus: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  mounted() {
    this.carregarlinhas();
    this.carregarProdutos();
    const adapter = useDate()
    this.fetchEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) })
  },
  methods: {
    handleDayClick({ date }) {
      // Exibe um alerta com a data clicada
      alert(`Você clicou na data: ${date}`);
    },

    getEventColor(event) {
      return event.color
    },

    async fetchEvents({ start, end }) {
      const events = []
      var planejamentos = [];
      const min = start;
      const max = end;
      try {
        planejamentos = await planejamentoService.getProductionPlansByDates(min, max);
      } catch (error) {
        console.error('Erro ao buscar planejamentos:', error);
      }

      planejamentos.forEach(element => {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = new Date(element.datePrev).getTime();
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = new Date(element.datePrev).getTime();
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          title: "Produção" + element.qtd,
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          allDay: !allDay,
        })

      });


      // const days = (max.getTime() - min.getTime()) / 86400000
      // const eventCount = this.rnd(days, days + 20)

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      //   const second = new Date(first.getTime() + secondTimestamp)

      //   events.push({
      //     title: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     allDay: !allDay,
      //   })
      // }

      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },




    async carregarlinhas() {
      try {
        this.linhas = await linhaService.getAllLines();
      } catch (error) {
        console.error("Erro ao carregar linha:", error);
      }
    },

    async carregarProdutos() {
      try {
        this.produtos = await produtoService.getProducts();
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    },

    /////////////////////////////////////////////////
    async salvar() {
      try {
        if (this.$refs.form.validate()) {
          await planejamentoService.addProductionPlan(this.novaProducao);
          this.fecharModal();
          this.fetchEvents();
        } else {
          console.error('Campos obrigatórios não preenchidos');
        }
      } catch (error) {
        console.error('Erro ao salvar peça:', error);
      }
    },

    abrirModalIncluir() {
      this.modalTitulo = 'Incluir Novo Planejamento'; // Atualizei o título do modal para refletir o planejamento de produção
      this.editando = false;
      this.limparFormulario(); // Limpa o formulário antes de abrir o modal
      this.modalVisivel = true; // Abre o modal ao alterar a propriedade modalVisivel para true
    },
    fecharModal() {
      this.modalVisivel = false; // Fecha o modal ao alterar a propriedade modalVisivel para false
      this.limparFormulario(); // Opcionalmente, limpa o formulário ao fechar
    },
    abrirModalEditar(item) {
      this.modalTitulo = 'Editar Peça';
      this.editando = true;
      this.novaHierarquia = { ...item };
      this.indexEditando = this.users.indexOf(item);
      this.modalVisivel = true;
    },

    abrirModalExcluir(item) {
      this.hierarquiaParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.hierarquiaParaExcluir = null;
      this.combinarListas()
    },
    limparFormulario() {
      this.novaHierarquia = {
        qtd: null,
        productId: null,
        materialId: null,
        parentBuildOfMaterialId: null,
      },
        this.indexEditando = null;
    },
    /////////////////////////////////////////////////
  },
}
</script>

<style scoped>
.planejamento-producao-container {
  margin-top: 70px;
  padding: 20px;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}
</style>

não funcionou 