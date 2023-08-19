function formatarMoeda(value, symbol) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: symbol,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

module.exports = {
  formatarMoeda,
};
