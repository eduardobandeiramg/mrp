import axios from 'axios';
import { API_BASE_URL } from './config'; // Importando a URL base

const API_URL_MATERIAL = `${API_BASE_URL}/materials`;

// Função para pegar o token de autenticação
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  console.log(token);

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
  // Função para obter todos os materiais
  async getMaterials() {
    try {
      const response = await axios.get(API_URL_MATERIAL, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter material:', error);
      throw error;
    }
  },

  // Função para adicionar novo material
  async addMaterial(materialData) {
    try {
      const response = await axios.post(API_URL_MATERIAL, materialData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar material:', error);
      throw error;
    }
  },

  // Função para atualizar material pelo ID
  async updateMaterial(id, materialData) {
    try {
      const response = await axios.put(`${API_URL_MATERIAL}/${id}`, materialData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar material:', error);
      throw error;
    }
  },

  // Função para buscar material pelo ID
  async getMaterialById(id) {
    try {
      const response = await axios.get(`${API_URL_MATERIAL}/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter material pelo ID:', error);
      throw error;
    }
  },

  // Função para deletar material pelo ID
  async deleteMaterial(id) {
    try {
      const response = await axios.delete(`${API_URL_MATERIAL}/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar material:', error);
      throw error;
    }
  },

  // Função para atualizar o estoque de materiais (patch)
  async updateMaterialStock(id, qtd) {
    try {
      const response = await axios.patch(`${API_URL_MATERIAL}/stock/update`, { id, qtd }, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar estoque do material:', error);
      throw error;
    }
  },

  // Função para adicionar material ao estoque
  async addMaterialStock(id, qtd) {
    try {
      const response = await axios.patch(`${API_URL_MATERIAL}/stock/add`, { id, qtd }, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar material ao estoque:', error);
      throw error;
    }
  },
};
