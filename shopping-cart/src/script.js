import fetchItem from './helpers/fetchItem';
import fetchProducts from './helpers/fetchProducts';
import getSavedCartItems from './helpers/getSavedCartItems';
import saveCartItems from './helpers/saveCartItems';

// const carregamento = async () => {
//     const carregando = document.querySelector('.loading-aqui');
//     const criarElemento = document.createElement('section');
//     criarElemento.className = 'loading';
//     criarElemento.innerHTML = 'carregando...';
//     carregando.appendChild(criarElemento);
//   setTimeout(() => {
//     carregando.removeChild(document.querySelector('.loading-aqui').firstChild);
//   }, 1000);
// };
  
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
};

const calcularTotal = async () => {
  let totalPrice = 0;
  const pegarCartItems = document.querySelectorAll('.cart__item');
  const seleContainer = document.querySelector('.total-price');
  pegarCartItems.forEach((element) => {
    const subtotal = element.innerHTML.split('$')[1];
    const total = parseFloat(subtotal);
    totalPrice += total;
  });
  seleContainer.innerHTML = totalPrice;
};

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

const cartItemClickListener = async (event) => {
  // coloque seu código aqui
  if (event.target.className === 'cart__item') {
    setTimeout(() => calcularTotal(), 300);
    return event.target.remove();
  }
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const arr = [];
const valCartItems = '.cart__items';

const pegarItensCarrinhoLocalS = async () => {
  const pegarCartItems = JSON.parse(getSavedCartItems('cartItems'));
  if (pegarCartItems) {
    await pegarCartItems.forEach((element) => {
      const entradaCarrinho = {
        sku: element.sku,
        name: element.name,
        salePrice: element.salePrice,
      };
      const selCartItems = document.querySelector(valCartItems);
      selCartItems.appendChild(createCartItemElement(entradaCarrinho));
    });
  }
};

const adicionarCartItemElement = async (event) => {
  if (event.target.className === 'item__add') {
    const valorId = getSkuFromProductItem(event.target.parentElement);
    const resultadoItem = await fetchItem(valorId);
    const entradaCarrinho = {
      sku: resultadoItem.id,
      name: resultadoItem.title,
      salePrice: resultadoItem.price,
    };
    arr.push(entradaCarrinho);
    const selCartItems = document.querySelector(valCartItems);
    selCartItems.appendChild(createCartItemElement(entradaCarrinho));
    setTimeout(() => calcularTotal(), 300);
    saveCartItems(JSON.stringify(arr));
  }
};

const adicionarItemNaPagina = async () => {
  const retorno = await fetchProducts('computador');
  retorno.results.forEach((element) => {
    const elementoItems = document.querySelector('.items');
    const idTitleTh = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const item = createProductItemElement(idTitleTh);
    elementoItems.appendChild(item);
  });
};

const limparCarrinho = async () => {
  const selCartItems = document.querySelector(valCartItems);
  const seleContainer = document.querySelector('.total-price');
  seleContainer.innerHTML = '';
  selCartItems.innerHTML = '';
  localStorage.clear();
};

const iniciar = async () => {
  // carregamento();
  await adicionarItemNaPagina();
  await pegarItensCarrinhoLocalS();
  setTimeout(() => calcularTotal(), 300);
  document.addEventListener('click', adicionarCartItemElement);
  document.querySelector('.empty-cart').addEventListener('click', limparCarrinho);
};

export default iniciar;
