<template>
  <v-container>
    <v-card flat class="planejamento-producao-container">

      <v-card-title>
        <h1>Planejamento de Produção</h1>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text>
        <v-sheet>
          <Qalendar class="calendar-container" :events="events" :config="config" @updated-period="onMonthChange"
            @edit-event="abrirModalEditar" @delete-event="abrirModalExcluir" @day-was-clicked="abrirModalAdicionar">

          </Qalendar>
        </v-sheet>
      </v-card-text>
    </v-card>



    <!-- Modal de adicionar/editar produção -->
    <v-dialog v-model="modalVisivel" max-width="70%">
      <v-card>
        <v-card-title class="headline">{{ modalTitulo }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field label="Data Selecionada" v-model="novaProducao.datePrev" readonly
                  variant="solo"></v-text-field>
                <v-text-field v-model="novaProducao.qtd" label="Quantidade" type="number"
                  :rules="[rules.required, rules.isNumber]" required variant="solo" />
                <v-select v-model="novaProducao.productId" :items="produtos" item-title="description" item-value="id"
                  label="Selecionar Produto" :rules="[rules.required]" required variant="solo" />

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
import { Qalendar } from "qalendar";
import planejamentoService from "@/services/Planejamento.js"
import linhaService from "@/services/Linha.js";
import produtoService from "@/services/Produtos.js";

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      events: [],
      config: {
        defaultMode: "month", // Define a visualização padrão para o modo "mês"
      },
      modalVisivel: false, // Inicia o modal fechado
      modalExcluirVisivel: false,
      modalTitulo: 'Incluir Novo Planejamento',
      editando: false,
      producaoParaExcluir: null,
      indexEditando: null,
      novaProducao: {
        qtd: null,
        datePrev: null,
        productId: null,
      },
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        isNumber: value => !isNaN(value) || 'Este campo deve ser um número.'
      },
      produtos: [], // Lista de produtos
      linhas: [],   // Lista de linhas de produção
      production: null,


    }
  },
  methods: {
    onMonthChange(newPeriod) {
      const { start, end } = newPeriod;
      const startFormatted = start.toISOString().split('T')[0];
      const endFormatted = end.toISOString().split('T')[0];
      this.fetchEvents(startFormatted, endFormatted);
    },

    async fetchEvents(start, end) {

      var planejamentos = [];
      var eventos = [];
      try {
        planejamentos = await planejamentoService.getProductionPlansByDates(start, end);
      } catch (error) {
        console.error('Erro ao buscar planejamentos:', error);
      }
      planejamentos.forEach(element => {

        eventos.push({
          title: element.product.description,
          time: { start: element.datePrev, end: element.datePrev },
          isEditable: true,
          id: element.id,
          description: "Quantidade: " + element.qtd,
        })

      });
      this.events = eventos;
    },

    /////////////////////////////////////////////////
    async salvar() {
      try {
        if (this.$refs.form.validate()) {
          await planejamentoService.addProductionPlan(this.novaProducao);
          this.fecharModal();
        } else {
          console.error('Campos obrigatórios não preenchidos');
        }
      } catch (error) {
        console.error('Erro ao salvar peça:', error);
      }
    },
    async confirmarExcluir() {
      console.log(this.producaoParaExcluir)
      try {
        await planejamentoService.deleteProductionPlan(this.producaoParaExcluir);
        this.fecharModalExcluir();
      } catch (error) {
        console.error('Erro ao excluir linha:', error);
      }
    },
    /////////////////////////////////////////////////
    abrirModalAdicionar(data) {
      console.log(data)
      this.modalTitulo = "Incluir Novo Planejamento";
      this.editando = false;
      this.novaProducao = {
        qtd: null,
        datePrev: data,
        productId: null,
      };
      this.modalVisivel = true;
    },

    fecharModal() {
      this.modalVisivel = false; // Fecha o modal ao alterar a propriedade modalVisivel para false
      this.limparFormulario(); // Opcionalmente, limpa o formulário ao fechar
      this.fetchEventsCurrentMonth()

    },
    async abrirModalEditar(item) {

      try {
        this.production = await planejamentoService.getProductionPlanById(item);
      } catch (error) {
        console.error('Erro ao buscar planejamentos:', error);
      }
      console.log(this.production)
      this.modalTitulo = 'Editar Peça';
      this.editando = true;
      this.novaProducao = this.production;
      this.modalVisivel = true;
      this.novaProducao = {
        qtd: this.production.qtd,
        datePrev: this.production.datePrev,
        productId: this.production.product.id,
      };
    },

    abrirModalExcluir(item) {
      this.producaoParaExcluir = item;
      this.modalExcluirVisivel = true;
    },
    fecharModalExcluir() {
      this.modalExcluirVisivel = false;
      this.producaoParaExcluir = null;
      this.fetchEventsCurrentMonth()
    },
    limparFormulario() {
      this.novaProducao = {
        qtd: null,
        productId: null,
        materialId: null,
        parentBuildOfMaterialId: null,
      },
        this.indexEditando = null;
    },
    /////////////////////////////////////////////////
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
    formatarDataCompleta(data) {
      const diasSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
      ];

      const dataObj = new Date(data);
      const diaSemana = diasSemana[dataObj.getDay()];
      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
      const ano = dataObj.getFullYear();

      return `${diaSemana}, ${dia}/${mes}/${ano}`;
    },
    abrirModalAdicionar(date) {
      this.modalTitulo = "Incluir Novo Planejamento";
      this.novaProducao.datePrev = date; // Define a data selecionada
      this.modalVisivel = true;
    },
    fetchEventsCurrentMonth() {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const startFormatted = start.toISOString().split('T')[0];
      const endFormatted = end.toISOString().split('T')[0];
      this.fetchEvents(startFormatted, endFormatted);
    }

  },
  mounted() {
    this.carregarlinhas();
    this.carregarProdutos();
    this.fetchEventsCurrentMonth()


  },


}
</script>

<style>
@import "qalendar/dist/style.css";

.planejamento-producao-container {
  margin-top: 70px;
  padding: 20px;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}

.calendar-container {
  height: 70vh;
  overflow: auto;
}
</style>