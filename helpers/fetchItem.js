const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// fetchItem('MLB1341706310')
//   .then((devolvido) => console.log(devolvido));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
