const axios = require('axios');

const API_KEY = 'INSIRA SUA API AQUI'; //SUA API AQUI 
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1'; 

async function cryptoRanking() {
  try {
    const response = await axios.get(`${BASE_URL}/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });
    return response.data.data.slice(0, 20);
  } catch (error) {
    console.error('Erro ao buscar as criptomoedas:', error);
    return [];
  }
}

async function converterMoeda(symbol, amount, convert) {
  try {
    const response = await axios.get(`${BASE_URL}/tools/price-conversion`, {
      params: {
        symbol,
        amount,
        convert,
      },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Erro ao converter a moeda:', error);
    return null;
  }
}

module.exports = {
  cryptoRanking,
  converterMoeda,
};
