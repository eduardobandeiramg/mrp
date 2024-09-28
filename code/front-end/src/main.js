import { createApp } from 'vue'; // Certifique-se de usar a versão correta do Vue
import App from './App.vue';
import router from './routes/router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Vuetify imports para a versão 3
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importando os estilos do Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Ícones do Vuetify

const vuetify = createVuetify(); // Criação da instância com createVuetify

createApp(App)
  .use(router)
  .use(BootstrapVue)
  .use(vuetify) // Usando a instância do Vuetify
  .mount('#app');
