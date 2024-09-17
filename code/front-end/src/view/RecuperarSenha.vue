<template>
  <div class="recover-password-container">
    <h1>Recuperar Senha</h1>
    <form @submit.prevent="enviarEmail">
      <div class="form-group">
        <label for="email">Digite seu e-mail:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>
      <button type="submit" class="submit-button">Enviar Código</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "", // Campo para o email
    };
  },
  methods: {
    enviarEmail() {
      // Aqui você faria a chamada para enviar o email de recuperação
      // Simulação de envio de e-mail
      console.log(`Enviando email para ${this.email}`);
      
      // Após o envio, redireciona o usuário para a página de verificação de código
      this.$router.push({ name: "verificarCodigo" });
    },
  },
};
</script>

<style scoped>
.recover-password-container {
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
}

label {
  display: block;
  font-weight: bold;
  color: #fff;
}

input {
  width: 100%;
  padding: 12px;
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

button {
  background: #00b300;
  color: white;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
}

button:hover {
  background-color: #009900;
}
</style>
