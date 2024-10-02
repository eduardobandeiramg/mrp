import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes as autoRoutes } from 'vue-router/auto-routes'

// Definindo rotas manualmente
const manualRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'), // Certifique-se de que o caminho está correto
  },
  {
    path: '/recuperar-senha',
    name: 'RecuperarSenha',
    component: () => import('@/pages/RecuperarSenha.vue'), // Certifique-se de que o caminho está correto
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('@/pages/Cadastro.vue'), // Certifique-se de que o caminho está correto
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: () => import('@/pages/Produtos.vue'), // Certifique-se de que o caminho está correto
  },
  {
    path: '/pecas',
    name: 'Pecas',
    component: () => import('@/pages/Pecas.vue'), // Certifique-se de que o caminho está correto
  },
  {
    path: '/linha',
    name: 'Linha',
    component: () => import('@/pages/Linha.vue'), // Certifique-se de que o caminho está correto
  },
  // Você pode adicionar mais rotas manualmente aqui
]

// Mesclando rotas automáticas com as manuais
const routes = [...autoRoutes, ...manualRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
