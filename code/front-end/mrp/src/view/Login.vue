<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="username">Usuário:</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <div class="password-input">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required />
          <button type="button" @click="togglePasswordVisibility" class="toggle-password-button">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>

      <button @click="logar()" class="login-button">Entrar</button>

      <!-- Novo botão para redirecionar ao cadastro -->
      <router-link to="/cadastro" class="register-link">
        Não possuo cadastro
      </router-link>
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
      showPassword: false,
      login: new Login(),
    };
  },
  methods: {
    loginUser() {
      // Implemente a lógica de autenticação aqui
      // Por exemplo, faça uma solicitação ao seu servidor para verificar as credenciais
      // Se as credenciais estiverem corretas, redirecione o usuário para a página principal
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validaLogin() {
      console.log(this.login);
      this.semErro = true;
      this.errors = [];
      if (!this.login.username) {
        this.errors.push("UserName vazio");
        this.semErro = false;
      }
      if (!this.login.password) {
        this.errors.push("Password vazio");
        this.semErro = false;
      }
      if (this.semErro) {
        alert();
        this.logar();

      }
    },

    logar() {
      localStorage.setItem("usuario", JSON.stringify(this.login));
      this.$router.push({
        name: "home",
      });
      // enviarLogin(this.login)
      //   .then((res) => {

      //     localStorage.setItem("usuario", JSON.stringify(res.data.data.id));
      //     this.$router.push({
      //       name: "home"
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error.status);
      //   })
      //   .finally(() => (this.login = new Login()));
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

.password-input {
  display: flex;
  align-items: center;
  position: relative;
}

input {
  flex: 1;
  padding: 8px;
  padding-right: 40px; /* Espaço para o ícone */
  border: 1px solid #ccc;
  border-radius: 3px;
}

.toggle-password-button {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 16px;
}

.toggle-password-button:hover {
  color: white;
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

/* Estilos para o link de "Não possuo cadastro" */
.register-link {
  display: block;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
