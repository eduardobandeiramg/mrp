<template>
  <v-app>
    <v-main>
      <v-container class="d-flex justify-center">
        <v-card class="pa-5" max-width="400" elevation="3">
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <!-- Input para o usuário -->
            <v-text-field
              label="Usuário"
              v-model="username"
              prepend-icon="mdi-account"
              outlined
              required
            ></v-text-field>

            <!-- Input para a senha -->
            <v-text-field
              label="Senha"
              v-model="password"
              prepend-icon="mdi-lock"
              type="password"
              outlined
              required
            ></v-text-field>

            <!-- Botão de login -->
            <v-btn color="green" block @click="loginUser">
              Entrar
            </v-btn>

            <!-- Mensagem de sucesso ou erro -->
            <v-alert
              v-if="message"
              :type="success ? 'success' : 'error'"
              class="mt-3"
              outlined
            >
              {{ message }}
            </v-alert>

            <!-- Links para cadastro e recuperação de senha -->
            <div class="d-flex justify-space-between mt-3">
              <router-link to="/cadastro" class="blue--text">Não possuo cadastro</router-link>
              <router-link to="/recuperar-senha" class="blue--text">Esqueci minha senha</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { login } from '@/services/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      success: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await login(this.username, this.password);
        if (response.status === 201) {
          this.message = 'Login bem-sucedido!';
          this.success = true;
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        } else {
          this.message = 'Erro desconhecido no login.';
          this.success = false;
        }
      } catch (error) {
        this.message = 'Erro ao fazer login.';
        this.success = false;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: #333;
  color: white;
}
.v-btn {
  color: white;
}
.v-alert {
  font-weight: bold;
}
</style>
