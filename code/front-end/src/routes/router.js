import { createRouter, createWebHistory } from "vue-router"; // Certifique-se de importar createRouter

import Home from "@/view/Home.vue";
import Login from "@/view/Login.vue";
import Cadastro from "@/view/Cadastro.vue";
import RecuperarSenha from "@/view/RecuperarSenha.vue";
import VerificarCodigo from "@/view/VerificarCodigo.vue";



const routes = [
  
  {
    path: "/",
    name:"home",
    component: Home, // Use o layout principal em todas as rotas
    children: [
     
      {
        path: "/cadastro",
        component: Cadastro,
      },
     
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/recuperar-senha",
        name: "recuperarSenha",
        component: RecuperarSenha,
      },

     
    
    ]
  },
  

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
