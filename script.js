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
const listaProdutos = async () => {
  const itens = document.querySelector('.items'); 
  const data = await fetchProducts('computador');
  data.results.forEach((result, index) => { 
    itens.appendChild(createProductItemElement(result));
    document.querySelectorAll('.item__add')[index] 
    .addEventListener('click', fetchItem);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItem = () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((element) => element.addEventListener('click', async () => {
    const itemId = getSkuFromProductItem(element.parentElement);
    const obj = await fetchItem(itemId);
    cartList.appendChild(createCartItemElement(obj));
  }));
};

window.onload = () => {
  listaProdutos();
  addItem();
 };