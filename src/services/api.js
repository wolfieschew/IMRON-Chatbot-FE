import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendMessage = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { query: text });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};