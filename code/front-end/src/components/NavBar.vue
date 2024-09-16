<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/produtos" class="nav-item">Gerir Produtos</router-link>
      <router-link to="/pessoas" class="nav-item">Gerir Pessoas</router-link>
      <router-link to="/planejamentos" class="nav-item">Gerir Planejamentos</router-link>
    </div>
    <div class="nav-login">
      <router-link to="/login" class="login-button">Login</router-link>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  background-color: #757575;
  display: flex;
  justify-content: space-between; /* Já está assim, o que é correto */
  align-items: center;
  padding: 0 50px; /* Você pode ajustar esse valor */
}


.nav-links {
  display: flex;
}

.nav-item {
  color: white;
  margin-right: 20px;
  font-weight: bold;
  text-decoration: none;
}

.nav-item:hover {
  color: #fff;
  opacity: 0.8;
}

.nav-login {
  display: flex;
  align-items: center;
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
