<template>
  <div class="app">
    <!-- Navbar sempre fixa no topo -->
    <div class="navbar-container">
      <NavBar />
    </div>
    <!-- Conteúdo centralizado -->
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  data() {
    return {
      loggedIn: false,
      user: undefined,
    };
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
/* Definir a altura da aplicação para 100% da tela */
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start; /* Navbar no topo */
}

/* Container da navbar, ficará no topo da página */
.navbar-container {
  flex-shrink: 0; /* A navbar não deve encolher */
  background-color: #757575;
}

/* Estilos na main view */
.content-container {
  flex-grow: 1; /* O conteúdo ocupará o restante do espaço */
  display: flex;
  justify-content: center;
  align-items: center; /* Centraliza vertical e horizontalmente */
  width: 100%; /* Garante que o conteúdo ocupe toda a largura da tela */
}


</style>
