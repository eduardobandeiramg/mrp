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
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/cadastro',
        name: 'Cadastro',
        component: Cadastro
      },
      {
        path: "/recuperar-senha",
        name: "recuperarSenha",
        component: RecuperarSenha,
      },
      {
        path: "/verificar-codigo",
        name: "verificarCodigo",
        component: VerificarCodigo,
      },
     
    
    ]
  },
  

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
