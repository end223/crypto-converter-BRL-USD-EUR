const { cryptoRanking, converterMoeda } = require('./api');
const { formatarMoeda } = require('./format');
const { escolherOpcao } = require('./input');


async function chooseAnotherCrypto(cryptoList) {
  console.log('\nSelecione uma criptomoeda:');
  cryptoList.forEach((crypto, index) => {
    console.log(`${index + 1}. ${crypto.name} (${crypto.symbol})`);
  });

  let selectedCryptoIndex = -1;
  while (selectedCryptoIndex < 0 || selectedCryptoIndex >= cryptoList.length) {
    const answer = await escolherOpcao('Digite o número da criptomoeda desejada: ');
    selectedCryptoIndex = parseInt(answer) - 1;
    if (isNaN(selectedCryptoIndex) || selectedCryptoIndex < 0 || selectedCryptoIndex >= cryptoList.length) {
      console.log('Opção inválida. Digite novamente.');
    }
  }

  const selectedCrypto = cryptoList[selectedCryptoIndex];
  const symbol = selectedCrypto.symbol;

  let parsedAmount = -1;
  while (parsedAmount <= 0) {
    const amount = await escolherOpcao('Digite a quantidade a ser convertida: ');
    parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      console.log('Digite uma quantidade válida.');
    }
  }

  const conversionsBRL = await converterMoeda(symbol, parsedAmount, 'BRL');
  const conversionsUSD = await converterMoeda(symbol, parsedAmount, 'USD');
  const conversionsEUR = await converterMoeda(symbol, parsedAmount, 'EUR');

  if (conversionsBRL && conversionsUSD && conversionsEUR) {
    console.log(`Conversões para ${parsedAmount} ${symbol}:`);
    console.log('BRL:', formatarMoeda(conversionsBRL.quote.BRL.price, 'BRL'));
    console.log('USD:', formatarMoeda(conversionsUSD.quote.USD.price, 'USD'));
    console.log('EUR:', formatarMoeda(conversionsEUR.quote.EUR.price, 'EUR'));
  }

} 


async function main() {
  try {
    const cryptoList = await cryptoRanking();
    if (cryptoList.length === 0) {
      console.log('Não foi possível obter as criptomoedas.');
      return;
    }

    console.log('Selecione uma criptomoeda:');
    cryptoList.forEach((crypto, index) => {
      console.log(`${index + 1}. ${crypto.name} (${crypto.symbol})`);
    });

    let selectedCryptoIndex = -1;
    while (selectedCryptoIndex < 0 || selectedCryptoIndex >= cryptoList.length) {
      const answer = await escolherOpcao('Digite o número da criptomoeda desejada: ');
      selectedCryptoIndex = parseInt(answer) - 1;
      if (isNaN(selectedCryptoIndex) || selectedCryptoIndex < 0 || selectedCryptoIndex >= cryptoList.length) {
        console.log('Opção inválida. Digite novamente.');
      }
    }

    const selectedCrypto = cryptoList[selectedCryptoIndex];
    const symbol = selectedCrypto.symbol;

    let parsedAmount = -1;
    while (parsedAmount <= 0) {
      const amount = await escolherOpcao('Digite a quantidade a ser convertida: ');
      parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.log('Digite uma quantidade válida.');
      }
    }

    const conversionsBRL = await converterMoeda(symbol, parsedAmount, 'BRL');
    const conversionsUSD = await converterMoeda(symbol, parsedAmount, 'USD');
    const conversionsEUR = await converterMoeda(symbol, parsedAmount, 'EUR');

    if (conversionsBRL && conversionsUSD && conversionsEUR) {
      console.log(`Conversões para ${parsedAmount} ${symbol}:`);
      console.log('BRL:', formatarMoeda(conversionsBRL.quote.BRL.price, 'BRL'));
      console.log('USD:', formatarMoeda(conversionsUSD.quote.USD.price, 'USD'));
      console.log('EUR:', formatarMoeda(conversionsEUR.quote.EUR.price, 'EUR'));

      let conversionChoice = '';
      while (conversionChoice !== '3') {
        console.log('\nO que você deseja fazer?');
        console.log('1. Converter outro valor.');
        console.log('2. Converter outra moeda.');
        console.log('3. Sair.');

        conversionChoice = await escolherOpcao('Digite a opção desejada: ');
        switch (conversionChoice) {
          case '1':
            let newParsedAmount = -1;
            while (newParsedAmount <= 0) {
              const amount = await escolherOpcao('Nova quantidade a ser convertida: ');
              newParsedAmount = parseFloat(amount);
              if (isNaN(newParsedAmount) || newParsedAmount <= 0) {
                console.log('Digite uma quantidade válida');
              }
            }

            const newConversionsBRL = await converterMoeda(symbol, newParsedAmount, 'BRL');
            const newConversionsUSD = await converterMoeda(symbol, newParsedAmount, 'USD');
            const newConversionsEUR = await converterMoeda(symbol, newParsedAmount, 'EUR');

            if (newConversionsBRL && newConversionsUSD && newConversionsEUR) {
              console.log(`Conversões para ${newParsedAmount} ${symbol}:`);
              console.log('BRL:', formatarMoeda(newConversionsBRL.quote.BRL.price, 'BRL'));
              console.log('USD:', formatarMoeda(newConversionsUSD.quote.USD.price, 'USD'));
              console.log('EUR:', formatarMoeda(newConversionsEUR.quote.EUR.price, 'EUR'));
            }
            break;
          case '2':
            await chooseAnotherCrypto(cryptoList);
            break;
          case '3':
            console.log('Encerrando...');
            process.exit(0); 
        }
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

main();