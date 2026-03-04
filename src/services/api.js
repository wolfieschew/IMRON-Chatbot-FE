import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api';

export const sendMessage = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/query`, { 
      question: text,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// export const sendMessage = async (text, language = 'indonesia') => {
//   try {
//     const response = await axios.post(`${API_URL}/query`, { 
//       question: text,
//       language: language 
//     });
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// Backup

// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:5000/api';

// export const sendMessage = async (text) => {
//   try {
//     const response = await axios.post(`${API_URL}/chat`, { query: text });
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };