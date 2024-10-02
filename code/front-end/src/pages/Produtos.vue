<template>
  <v-container class="produtos-container">
    <v-card>
      <v-treeview

        :items="items"
        activatable
        item-key="id"
        open-on-click
      />
    </v-card>
  </v-container>
</template>

<script>
import produtos from '@/services/Produtos';

export default {
  data() {
    return {
      items: produtos,
    };
  },
};
</script>
<style scoped>
.produtos-container{
  margin-top: 70px;
}
</style>
