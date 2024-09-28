<template class="template">
  <v-app-bar class="nav-bar">
    <v-container class="container">
      <!-- Links da navbar -->
      <div class="nav-links">
        <v-btn text v-for="(link, index) in navLinks" :key="index" :to="link.to" class="mr-4 white--text">
      <router-link :to="link.to" class="nav-item">{{ link.text }}</router-link>
    </v-btn>
      </div>

      <!-- Botão de login à direita -->
      <router-link to="/login" class="login-button">
        Login
      </router-link>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      navLinks: [
        { text: "Home", to: "/" },
        { text: "Gerir Peças", to: "/pecas" },
        { text: "Gerir Produtos", to: "/produtos" },
        { text: "Gerir Planejamentos", to: "/planejamentos" }
      ]
    };
  }
};
</script>

<style scoped>
.nav-bar {
  height: 60px;
}

.container{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between; /* Já está assim, o que é correto */
  align-items: center;
  padding: 0 50px; /* Você pode ajustar esse valor */
}


.nav-item {
  color: white ;
  margin: 20px;
  font-weight: bold;
  text-decoration: none;
  text-transform: none;
}

.nav-item:hover {
  color: #ffffff ;
  opacity: 0.8;
}

.login-button {
  background-color: #fff;
  color: #757575;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.login-button:hover {
  background-color: #f0f0f0;
  color: #555;
}
</style>