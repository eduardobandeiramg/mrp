import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  console.log(token);

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsInN1YiI6IjhiOTU0NWUyLTE2MTctNGIxMi05NDJjLWQ4ZGUxYmRlZTM1MCIsImlhdCI6MTcyNzgyNjQ2MCwiZXhwIjoxNzI3ODMwMDYwfQ.BxM1waBzhjYsvKO6rXt3EQ8bXd9MTXcUJhnkUPt-f50"
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
  async getLines() {
    try {
      const response = await axios.get(`${API_BASE_URL}/line`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter linhas:', error);
      throw error;
    }
  },

  async addLine(lineData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/line`, lineData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar linha:', error);
      throw error;
    }
  },
};
