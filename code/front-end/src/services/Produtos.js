import axios from 'axios';
import { API_BASE_URL } from './config'; // Importando a URL base

const API_URL_PRODUCT = `${API_BASE_URL}/products/all`;

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  console.log(token);

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
  async getProducts() {
    try {
      const response = await axios.get(API_URL_PRODUCT, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      throw error;
    }
  },

  async addProduct(productData) {
    try {
      const response = await axios.post(API_URL_PRODUCT, productData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  },
};
