<template>
  <v-app-bar color="grey darken-1" dark flat app>
    <div class="nav-links">
      <v-btn v-for="(link, index) in navLinks" :key="index" :to="link.to" text class="mr-4 white--text">
        {{ link.text }}
      </v-btn>
    </div>

    <!-- Botão de login à direita -->
    <v-spacer></v-spacer>
    <v-btn :to="'/login'" class="login-button" outlined color="white">
      Login
    </v-btn>
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
.v-app-bar {
  width: 100%;
}

.nav-links {
  display: flex;
}

.login-button {
  margin-right: 20px;
}
</style>
