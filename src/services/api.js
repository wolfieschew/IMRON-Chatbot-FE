import axios from "axios";

// const API_URL = "https://[IP_ADDRESS]/api"; // production environtment
const API_URL = "http://[IP_ADDRESS]/api";

export const sendMessage = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/query`, {
      question: text,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
