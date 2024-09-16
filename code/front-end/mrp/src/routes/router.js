import { createRouter, createWebHistory } from "vue-router"; // Certifique-se de importar createRouter

import Home from "@/view/Home.vue";



const routes = [
  
  {
    path: "/",
    name:"home",
    component: Home, // Use o layout principal em todas as rotas
    children: [
      
     
    
    ]
  },
  

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
