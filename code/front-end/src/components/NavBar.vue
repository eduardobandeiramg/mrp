<template>
  <v-app-bar color="grey darken-1" dark flat app>

    <div class="nav-links">
      <v-btn v-for="(link, index) in navLinks" :key="index" :to="link.to" text class="mr-4 white--text">
        {{ link.text }}
      </v-btn>
    </div>

    <!-- Botão de login à direita -->
    <v-spacer></v-spacer>
    <v-btn text @click="handleAuthAction">
      {{ isLoggedIn ? 'Logout' : 'Login' }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      navLinks: [
        { text: "Home", to: "/" },
        { text: "Gerenciar Peças", to: "/pecas" },
        { text: "Gerenciar Produtos", to: "/produtos" },
        { text: "Gerenciar Linhas de Produção", to: "/linha" },
      ],
    };
  },
  methods: {
    handleAuthAction() {

      if (this.isLoggedIn) {
        // Logout logic: Remove the token from localStorage
        localStorage.removeItem('authToken');
        this.isLoggedIn = false;
      } else {
        
        // Login logic: Redirect to login page
        this.$router.push('/login');
      }
    },
  },
  created() {
    (localStorage.getItem('authToken'))
    // Check if the user is logged in by checking if the token exists in localStorage
    this.isLoggedIn = !!localStorage.getItem('authToken');
  },
  watch: {
    // Watch for changes to the token in localStorage to update the button accordingly
    '$route'(to, from) {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    },
  },
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
