import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VAppBar, VCard } from 'vuetify/components';


const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');
