<template>
  <v-container>
    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color" top>
      <v-icon left>{{ snackbar.icon }}</v-icon>
      {{ snackbar.message }}
    </v-snackbar>
    
    <v-row>
      <v-col class="title" cols="12">
        <h1 class="headline text-center">Planejamento da Produção</h1>
      </v-col>
    </v-row>

    <v-divider color="info" :thickness="3" class="my-5 border-opacity-50"></v-divider>

      </v-card-title>

      <v-card-text>
        <v-sheet>
          <v-calendar ref="calendar" v-model="today" :events="events" color="primary" type="month" @click:day="handleDayClick"></v-calendar>
        </v-sheet>
      </v-card-text>
    </v-card>



    <v-dialog v-model="modalVisivel" max-width="70%">
      <v-card>
        <v-card-title class="text-h5">Planejamento para {{ modal.selectedDate }}</v-card-title>
        <v-card-text>
          <v-form ref="planningForm" v-model="form.valid">
            <v-autocomplete
              v-model="form.data.productId"
              :items="form.products"
              item-value="id"
              :item-title="product => product.code + ' - ' + product.description"
              label="Produto"
              placeholder="Selecione um produto"
              :loading="form.loadingProducts"
              :rules="[v => !!v || 'Produto é obrigatório']"
            ></v-autocomplete>

            <v-text-field
              v-model="form.data.quantity"
              label="Quantidade"
              type="number"
              placeholder="Insira a quantidade"
              :rules="[v => v > 0 || 'A quantidade deve ser superior a 0']"
            ></v-text-field>

            <v-autocomplete
              v-model="form.data.productionLineId"
              :items="form.productionLines"
              item-value="lineId"
              item-title="name"
              label="Linha de Produção"
              placeholder="Selecione uma linha de produção"
              :loading="form.loadingLines"
              :rules="[v => !!v || 'Linha de produção é obrigatória']"
            ></v-autocomplete>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addPlanning" :disabled="!form.valid">Salvar</v-btn>
          <v-btn color="blue darken-1" text @click="closeModal">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="eventModal.show" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Detalhes do Planejamento</v-card-title>
        <v-card-text>
          <p><strong>Data:</strong> {{ eventModal.data.date }}</p>
          <p><strong>Produto:</strong> {{ eventModal.data.product }}</p>
          <p><strong>Linha:</strong> {{ eventModal.data.line }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="closeEventModal">Voltar</v-btn>
          <v-btn color="red" text @click="openDeleteConfirmation">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog.show" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmação de Exclusão</v-card-title>
        <v-card-text>
          Deseja excluir o planejamento do produto {{ eventModal.data.product }}
          para o dia {{ eventModal.data.date }} na linha {{ eventModal.data.line }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="confirmDelete">Excluir</v-btn>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog">Não</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import planejamentoService from '@/services/Planejamento';
  import produtoService from '@/services/Produtos';
  import linhaService from '@/services/Linha';
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'

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
    handleDayClick() {
      const selectedDate = dateInfo.date;
      alert(`Você clicou na data: ${selectedDate}`);
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
          this.snackbar = {
            show: true,
            message: 'Não é possível adicionar planejamento para datas passadas.',
            icon: 'mdi-alert',
            color: 'warning',
          };
        }
      },
      closeModal() {
        this.modal.show = false;
        this.resetForm();
      },
      async loadProducts() {
        this.form.loadingProducts = true;
        try {
          const products = await produtoService.getProducts();
          this.form.products = products.map(product => ({
            ...product,
            displayText: `${product.code} - ${product.description}`,
          }));
        } catch (error) {
          console.error('Erro ao carregar produtos:', error);
          this.snackbar = {
            show: true,
            message: 'Erro ao carregar produtos.',
            icon: 'mdi-alert',
            color: 'red',
          };
        } finally {
          this.form.loadingProducts = false;
        }
      },
      async loadProductionLines() {
        this.form.loadingLines = true;
        try {
          const lines = await linhaService.getAllLines();
          this.form.productionLines = lines;
        } catch (error) {
          console.error('Erro ao carregar linhas de produção:', error);
          this.snackbar = {
            show: true,
            message: 'Erro ao carregar linhas de produção.',
            icon: 'mdi-alert',
            color: 'red',
          };
        } finally {
          this.form.loadingLines = false;
        }
      },
      resetForm() {
        this.form.data = {
          productId: null,
          quantity: null,
          productionLineId: null,
        };
      },
      async addPlanning() {
        if (!this.form.valid) return;

        const formattedDate = this.modal.selectedDate.split('/').reverse().join('-');
        const payload = {
          qtd: this.form.data.quantity,
          datePrev: formattedDate,
          productId: this.form.data.productId,
          lineId: this.form.data.productionLineId,
        };

        try {
          await planejamentoService.addProductionPlan(payload);
          this.snackbar = {
            show: true,
            message: 'Planejamento adicionado com sucesso!',
            icon: 'mdi-check-circle',
            color: 'success',
          };
          this.closeModal();

          const [year, month, day] = formattedDate.split('-').map(Number);
          const planningDate = new Date(year, month - 1, day);

          const activeView = this.$refs.calendar.activeView || 'month';
          console.log(activeView, planningDate)
          this.loadEventsForPeriod(activeView, planningDate);
        } catch (error) {
          console.error('Erro ao adicionar planejamento:', error);
          this.snackbar = {
            show: true,
            message: 'Erro ao adicionar planejamento.',
            icon: 'mdi-alert',
            color: 'red',
          };
        }
      },
      openEventModal(event) {
        this.eventModal.data = {
          id: event.id,
          date: event.start.toLocaleDateString('pt-BR'),
          product: event.title,
          line: event.content.match(/Linha:<\/strong> (.+)/)[1]
        };
        this.eventModal.show = true;
      },
      closeEventModal() {
        this.eventModal.show = false;
      },
      openDeleteConfirmation() {
        this.deleteDialog.show = true;
        this.eventModal.show = false;
      },
      closeDeleteDialog() {
        this.deleteDialog.show = false;
      },
      async confirmDelete() {
        try {
          await planejamentoService.deleteProductionPlan(this.eventModal.data.id);
          this.snackbar = {
            show: true,
            message: 'Planejamento excluído com sucesso!',
            icon: 'mdi-check-circle',
            color: 'success',
          };
          this.closeDeleteDialog();
          this.closeEventModal();

          const activeView = this.$refs.calendar.activeView || 'month';
          const planningDate = new Date(this.eventModal.data.date.split('/').reverse().join('-'));
          this.loadEventsForPeriod(activeView, planningDate);
        } catch (error) {
          console.error('Erro ao excluir planejamento:', error);
          this.snackbar = {
            show: true,
            message: 'Erro ao excluir planejamento.',
            icon: 'mdi-alert',
            color: 'red',
          };
        }
      }
    },
  }
</script>

<style>
  .title {
    padding-top: 5rem;
  }
  h1 {
    color: white;
  }
  .vuecal__event {
    cursor: pointer;
    margin: 0.5rem 0;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
  }
  .vuecal__event:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #e0e0e0;
  }
  .vuecal__cell-events-count {
    background-color: green;
    color: #ffffff;
    border-radius: 50%;
    font-weight: bold;
  }
  .vuecal__event-title{
    font-weight: bolder;
    font-size: large;
    background: lightgray;
    color: black;
  }
</style>
