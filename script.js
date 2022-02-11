 const cartList = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
const salvarItens = () => {
  localStorage.setItem('salvarItems', cartList.innerHTML); 
};

function cartItemClickListener(event) {
  event.target.remove();
  salvarItens();
}
const recuperarItens = () => {
  cartList.innerHTML = localStorage.getItem('salvarItems'); 
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li'); 
  li.className = 'cart__item'; 
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;  
  li.addEventListener('click', cartItemClickListener); 
  return li;
}

 function addLoading(element) {
  const itemsContainer = document.querySelector('ol');
  const loadingElement = document.createElement(element);
  loadingElement.innerHTML = 'carregando...';
  loadingElement.className = 'loading';
  itemsContainer.appendChild(loadingElement);
}

 function removeLoading() {
  const loadingElement = document.querySelector('.loading');
  loadingElement.remove(); 
} 

const addItem = () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((element) => element.addEventListener('click', async () => {
    addLoading('span');
    const itemId = getSkuFromProductItem(element.parentElement);
    const obj = await fetchItem(itemId);
    removeLoading();
    cartList.appendChild(createCartItemElement(obj));
    salvarItens();
  }));
};

  const listaProdutos = async () => {
  const data = await fetchProducts('computador');
  const itens = document.querySelector('.items'); 
  data.results.forEach((obj) => { 
    itens.appendChild(createProductItemElement(obj));
  });
  addItem();
}; 
const esvaziarCarrinho = document.querySelector('.empty-cart');
esvaziarCarrinho.addEventListener('click', () => {
  cartList.innerHTML = '';
  localStorage.clear();
});

window.onload = () => {
  listaProdutos();
  recuperarItens();
 };