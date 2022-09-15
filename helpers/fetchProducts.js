const fetchProducts = async (computador) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
// O retorno dessa função acima continua sendo uma promessa, por isso é preciso usar o .then para resolver a promessa e retornar o array.

fetchProducts()
  .then((devolvido) => console.log(devolvido));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
