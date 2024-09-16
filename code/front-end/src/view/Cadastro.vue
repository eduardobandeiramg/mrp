<template>
  <div class="cadastro-container">
    <h1>Registrar</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>

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
export default {
  data() {
    return {
      email: "",      // Novo campo de email
      username: "",
      password: "",
      role: "",
    };
  },
  methods: {
    loginUser() {
      // Lógica de autenticação
    },
    logar() {
      // Ação de login
    },
  },
};
</script>
<style scoped>
.cadastro-container {
  width: 100%; /* Ocupa toda a largura do container */
  max-width: 600px; /* Limita a largura máxima do formulário */
  padding: 40px;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  margin-bottom: 30px;
  color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  color: #fff; /* Ajuste da cor das letras para branco */
}

input,
select {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #222;
  color: #fff; /* Cor do texto branca */
  font-size: 16px;
}

input::placeholder {
  color: #aaa;
}

button {
  background: #00b300;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  margin-top: 20px;
}

button:hover {
  background-color: #009900;
}
</style>
