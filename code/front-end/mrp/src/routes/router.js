import { createRouter, createWebHistory } from "vue-router"; // Certifique-se de importar createRouter

import Home from "@/view/Home.vue";
import Login from "@/view/Login.vue";



const routes = [
  
  {
    path: "/",
    name:"home",
    component: Home, // Use o layout principal em todas as rotas
    children: [

     
      {
        path: "/login",
        component: Login,
      },
     
    
    ]
  },
  

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
