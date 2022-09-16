// referencia no https://www.horadecodar.com.br/2020/07/21/como-salvar-um-objeto-na-localstorage/
const saveCartItems = (cartItem) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItem));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
