import axios from 'axios';

// Função para buscar uma citação aleatória
export const fetchQuote = async () => {
  try {
    const response = await axios.get('https://type.fit/api/quotes');
    const randomQuote = response.data[Math.floor(Math.random() * response.data.length)];
    return randomQuote;
  } catch (error) {
    console.error('Erro ao buscar a citação:', error);
    throw new Error('Não foi possível carregar a citação.');
  }
};


const API_URL = 'https://api.quotable.io/quotes'; // Exemplo de URL para obter as citações

export const fetchTopQuotes = async () => {
  try {
    const response = await axios.get(`${API_URL}?limit=5`);
    return response.data.results; // Ajuste conforme a estrutura da resposta da API
  } catch (error) {
    console.error('Erro ao buscar as citações:', error);
    throw error;
  }
};
