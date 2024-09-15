<template>
  <div class="login">
    <h1>Registrar</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="username">Usuário:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Username"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>

      <div class="form-group">
        <label for="auth">Autenticação:</label>
        <input
          type="text"
          id="auth"
          v-model="auth"
          placeholder="Auth"
          required
        />
      </div>

      <div class="form-group">
        <label for="role">Função:</label>
        <select id="role" v-model="role" required>
          <option disabled value="">Selecione a Função</option>
          <option>Admin</option>
          <option>User</option>
          <option>Manager</option>
        </select>
      </div>

      <button @click="logar()" class="register-button">Registrar</button>
    </form>
  </div>
</template>



<script>
import Login from "@/model/Login.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      auth: "",
      role: "",
      login: new Login(),
    };
  },
  methods: {
    loginUser() {
      // Lógica de autenticação
    },
    logar() {
      localStorage.setItem("usuario", JSON.stringify(this.login));
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
}

.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  color: white;
}

label {
  display: block;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 5px;
  background-color: #333;
  color: #fff;
}

button {
  background: #00b300;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #009900;
}

/* Estilo ao passar o mouse sobre o botão */
button:hover {
  opacity: 0.9;
}

/* Estilo de alinhamento */
.register-button {
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  font-weight: bold;
  background-color: #00b300;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.register-button:hover {
  background-color: #009900;
}
</style>
