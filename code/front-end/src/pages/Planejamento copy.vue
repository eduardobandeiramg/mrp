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
      const { start, end } = newPeriod; // Extrai os valores de start e end de newPeriod
      const startFormatted = start.toISOString().split('T')[0];
      const endFormatted = end.toISOString().split('T')[0];
      this.fetchEvents(startFormatted, endFormatted);
    },

    async fetchEvents(start, end) {

      console.log("Data de início:", start);
      console.log("Data de fim:", end);

      var planejamentos = [];

      try {
        planejamentos = await planejamentoService.getProductionPlansByDates(start, end);
      } catch (error) {
        console.error('Erro ao buscar planejamentos:', error);
      }
      planejamentos.forEach(element => {

        this.events.push({
          title: element.product.description,
          time: { start: element.datePrev, end: element.datePrev },
          isEditable: true,
          id: element.id,
          description: "Quantidade: " + element.qtd,
        })

      });

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
    async confirmarExcluir() {
      console.log(this.producaoParaExcluir)
      try {
        await linhaService.deleteProductionPlan(this.producaoParaExcluir);
        this.fecharModalExcluir();
        this.fetchEvents();
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
      this.fetchEvents()

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
      this.fetchEvents()
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

  },
  mounted() {
    this.carregarlinhas();
    this.carregarProdutos();


    const today = new Date();
    const primeiroDia = new Date(today.getFullYear(), today.getMonth(), 1);
    const ultimoDia = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const primeiroDiaFormatado = primeiroDia.toISOString().split('T')[0];
    const ultimoDiaFormatado = ultimoDia.toISOString().split('T')[0];
    this.onMonthChange({primeiroDiaFormatado, ultimoDiaFormatado})
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