<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="username">Usuário:</label>
        <input type="text" id="username" v-model="username" placeholder="Username" required />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <div class="password-input">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Password" required />
          <button type="button" @click="togglePasswordVisibility" class="toggle-password-button">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>

      <button @click="logar()" class="login-button">Entrar</button>

      <!-- Novo layout para os links -->
      <div class="links-container">
        <router-link to="/cadastro" class="register-link">Não possuo cadastro</router-link>
        <router-link to="/recuperar-senha" class="forgot-password-link">Esqueci minha senha</router-link>
      </div>
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
      // Lógica de autenticação
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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
/* Container da tela de login */
.login-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  color: #fff;
}

.form-group {
  margin-bottom: 15px;
  color: white;
}

label {
  display: block;
  font-weight: bold;
  color: #fff;
}

input {
  width: 100%;
  padding: 12px;
  padding-right: 40px; /* Espaço reservado para o ícone */
  border: 1px solid #333;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #222;
  color: #fff;
  font-size: 16px;
}

input::placeholder {
  color: #aaa;
}

/* Estilizando o campo de senha */
.password-input {
  position: relative;
}

.toggle-password-button {
  position: absolute;
  left: 125px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
}



button {
  background: #00b300;
  color: white;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.login-button:hover {
  background-color: #009900;
}

/* Flexbox para os links */
.links-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

/* Link "Não possuo cadastro" alinhado à esquerda */
.register-link {
  color: #007bff;
  text-decoration: none;
  text-align: left;
}

/* Link "Esqueci minha senha" alinhado à direita */
.forgot-password-link {
  color: #007bff;
  text-decoration: none;
  text-align: right;
}

.register-link:hover, .forgot-password-link:hover {
  text-decoration: underline;
}
</style>
