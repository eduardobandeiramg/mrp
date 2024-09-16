import { createApp } from '@vue/compat'
import App from './App.vue'
import router from './routes/router'
import BootstrapVue from 'bootstrap-vue'

createApp(App)
  .use(router)
  .use(BootstrapVue)
  .mount('#app')
