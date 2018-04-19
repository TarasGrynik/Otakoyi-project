let ul = document.createElement('ul');
let cart = document.createElement('div');
let quantityGoods = document.createElement('span');

quantityGoods.innerText = '0 шт';

document.querySelector('#mainMenu').appendChild(ul);
ul.classList.add('list');
cart.classList.add('cart');
quantityGoods.classList.add('quantity');

function createMainMenu(name) {

  let li = document.createElement('li');
  let newLi = ul.appendChild(li);

  newLi.innerText = name.toUpperCase();

}

createMainMenu('продукція');
createMainMenu('готові рішення');
createMainMenu('підтримка');
createMainMenu('система');
createMainMenu('контакти');

document.querySelector('.list').appendChild(cart);
document.querySelector('.cart').appendChild(quantityGoods);

