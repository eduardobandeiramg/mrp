import axios from 'axios';
import { API_BASE_URL } from './config'; // Importando a URL base

const API_URL_LINE = `${API_BASE_URL}/line`;

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  console.log(token);

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
  async getLines() {
    try {
      const response = await axios.get(API_URL_LINE, {
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
      const response = await axios.post(API_URL_LINE, lineData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar linha:', error);
      throw error;
    }
  },
};
