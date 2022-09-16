// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
// Requisito 5 - Remover o item do carrinho - É utilizada a função já criada.

const cartItemClickListener = (evento) => {
  const meuCarrinho = document.querySelector('.cart__items');
  meuCarrinho.removeChild(evento.target);
};

// 
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Requisito 6 
const addLocalStorage = () => {
  // usa a saveCartItems para salvar os itens no localStorage
  const array = [];
  const lista = document.querySelectorAll('.cart__item');
  lista.forEach((elem) => {
    array.push(elem.innerText);
  });
  saveCartItems(array);
};
// -------> Requisito 4 - Utilizar o fetchItem para adicionar um item ao carrinho de compras:

// (Parte - 2) - Na função acaoDoBotao é criado um evento para adicionar
// ao carrinho o item que foi clicado. As informações que vão para o carrinho são 
// criadas pela função createCartItemElement

const acaoDoBotao = async (evento) => {
  const infos = evento.target.parentNode.firstChild.innerText;
  const item = await fetchItem(infos);
  const meuCarrinho = document.querySelector('.cart__items');
  const a = createCartItemElement(item);
  // cria os filhos dentro do pai 'meuCarrinho'
   meuCarrinho.appendChild(a);
   addLocalStorage();
};
// (Parte - 1) - Captura os botões e usa o forEach para criar um evento em todos eles
// esse evento a partir do click é criado na função acaoDoBotao

const produtoNoCarrinho = async () => {
  const botoesAdd = document.querySelectorAll('.item__add');
 return botoesAdd.forEach((botao) => botao.addEventListener('click', acaoDoBotao));
};

// --------> Requisito 2 - Função para criar a lista de produtos usando fetchProducts:

const criarListaProdutos = async () => {
  const objeto = await fetchProducts('computador');
  const produtos = objeto.results;
  produtos.forEach((e) => {
    const produto = createProductItemElement(e);
    document.querySelector('.items').appendChild(produto);
  });
};

window.onload = async () => { 
  await criarListaProdutos();
  await produtoNoCarrinho();
};