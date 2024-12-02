<template>
  <v-container>
    <h1 class="text-center">Caixa de Entrada</h1>

    <!-- Bloco 1: To Production -->
    <!-- <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title>Produtos para Produzir</v-card-title>
          <v-card-text>
            <v-data-table :items="toProduction" :headers="headers" class="elevation-1 tabela-escura"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
    <v-row>
      <!-- Bloco 2: On Production -->
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title>Produtos em Produção</v-card-title>
          <v-card-text>
            <v-data-table :items="onProduction" :headers="headers" class="elevation-1 tabela-escura"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Bloco 3: Finished Production -->
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title>Produtos Finalizados</v-card-title>
          <v-card-text>
            <v-data-table :items="finishedProduction" :headers="headers"
              class="elevation-1 tabela-escura"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Bloco 4: Status Production -->
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title>Status dos Produtos</v-card-title>
          <v-card-text>
            <v-data-table :items="statusProduction" :headers="headers" class="elevation-1 tabela-escura"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productionService from "@/services/Producao";

export default {
  data() {
    return {
      toProduction: [],
      onProduction: [],
      finishedProduction: [],
      statusProduction: [],
      headers: [
        { align: "center", title: "Produção", key: "production" },
        { align: "center", title: "Status", key: "status" },
        { align: "center", title: "Data de Início", key: "startDate" },
        { align: "center", title: "Última Atualização", key: "lastUpdate" },
      ],
    };
  },
  methods: {
    async carregarToProduction() {
      try {
        this.toProduction = await productionService.getToProduction();
      } catch (error) {
        console.error("Erro ao carregar 'To Production':", error);
      }
    },
    async carregarOnProduction() {
      try {
        this.onProduction = await productionService.getOnProduction();
      } catch (error) {
        console.error("Erro ao carregar 'On Production':", error);
      }
    },
    async carregarFinishedProduction() {
      try {
        this.finishedProduction = await productionService.getFinishedProduction();
      } catch (error) {
        console.error("Erro ao carregar 'Finished Production':", error);
      }
    },
    async carregarStatusProduction() {
      try {
        this.statusProduction = await productionService.getStatusProduction();
      } catch (error) {
        console.error("Erro ao carregar 'Status Production':", error);
      }
    },
  },
  mounted() {
    this.carregarToProduction();
    this.carregarOnProduction();
    this.carregarFinishedProduction();
    this.carregarStatusProduction();
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-bottom: 20px;
}

.mb-4 {
  margin-bottom: 16px;
}

.tabela-escura .v-data-table__wrapper {
  background-color: #444;
  color: #fff;
}

.tabela-escura th {
  background-color: #555;
}
</style>