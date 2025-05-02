import { cartList,removeFromCart,SaveToStorage} from "../script/cart.js";
import { Prouducts } from "../script/Products.js";
import { formatCurrency } from "./utilles/money.js";
import { AddQuantity } from "../script/amazon.js";
import { DeliveryOptions } from "../script/deliveryOptions.js";

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
//defult export

const today = dayjs();
const deliveryDate=today.add(7,'days')
let cartProductHtml = '';
const Date =deliveryDate.format('d/M/YYYY');


cartList.forEach((CartItem) => {
  const productName = CartItem.productName;  // Assuming you have a 'productName' in CartItem

  let matchProduct;

  Prouducts.forEach((Product) => {
    if (Product.name === productName) {
      matchProduct = Product;
    }
  });

  const deliveryOptionsID = CartItem.deliveryOptionsID

  let deliveryOption;
  DeliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionsID){
      deliveryOption = option;
      console(option.DeliveryOptionID)


    }
  })

const today = dayjs() //to get the current day
const deliveryDate= today.add(7,'days')
const DateString =deliveryDate.format(
  '  dddd , MMMM D'
)
  if (matchProduct) {
    cartProductHtml += `
      <div class="cart-item-container js-cart-item-continer-${matchProduct.id}">
        <div class="delivery-date">
          Delivery date:${DateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchProduct.name}
            </div>
            <div class="product-price">
              ${formatCurrency(matchProduct.Price) }      
             </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-${matchProduct.id}">${CartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-Update-link " data-product-id='${matchProduct.id}'>
                Update 

              </span>
              <span class="delete-quantity-link link-primary js-delte-link" data-product-id="${matchProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
           ${deliveryOptionsHtml(matchProduct,CartItem)}
          </div>
        </div>
      </div>`;
  }
});


function deliveryOptionsHtml(matchProduct,CartItem){
  let HTML=''
  DeliveryOptions.forEach((Option)=>{

  const today = dayjs() //to get the current day
  const deliveryDate= today.add(Option.DeliveryDays,'days')
  const DateString =deliveryDate.format('dddd,MMMM D')

const PriceSring =Option.Price === 0 ? 'FREE' :`$${formatCurrency(Option.Price)} -` 
const isChecked = String(Option.id) === String(CartItem.DeliveryOptionID);
HTML+=  `
                <div class="delivery-option">
                <input type="radio" class="delivery-option-input" 
                data-option-id="${Option.id}"
                name="delivery-option-${matchProduct.id}"
                ${isChecked ? 'checked' : ''}>
                <div>
                  <div class="delivery-option-date">
                    ${DateString}
                  </div>
                  <div class="delivery-option-price">
                    ${PriceSring} Shipping
                  </div>
                </div>
              </div>`

})
return HTML;
}
document.querySelector('.checkout-grid').innerHTML=cartProductHtml
let match;

document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    console.log(productId)

    const item = cartList.find(product => product.productID === productId);

    if (!item) return; 

    item.quantity--; 

    if (item.quantity <= 0) {
      removeFromCart(productId);
    
      const container = document.querySelector(`.js-cart-item-continer-${productId}`);
      if (container) {
        container.remove();
      }
    } else {
      updateQuantityInPage(productId, item.quantity); 
    }

    SaveToStorage(); 
  });
});

  
const checkoutHeaderMiddleSection = document.querySelector('.checkout-header-middle-section');
if (checkoutHeaderMiddleSection) {
  checkoutHeaderMiddleSection.innerHTML = `checkout(${AddQuantity()})`;
}

function updateQuantityInPage(productId, newQuantity) {
  const quantityElement = document.querySelector(`.js-quantity-${productId}`);
  if (quantityElement) {
    quantityElement.innerHTML = newQuantity;
  }
}


document.querySelectorAll('.update-quantity-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-Update-link') || 
        event.target.classList.contains('update-quantity-link')) {
      const productID = link.dataset.productId;
      const currentQuantity = document.querySelector(`.js-quantity-${productID}`).textContent;
      link.innerHTML = `
        <input class="Update-quantity" value="${currentQuantity}">
        <button class="save-quantity">Save</button>
      `;
      const input = link.querySelector('.Update-quantity');
      input.focus();
      const saveButton = link.querySelector('.save-quantity');
      saveButton.addEventListener('click', () => {
        const newQuantity = parseInt(input.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
          const item = cartList.find(item => item.productID === productID);
          if (item) {
            item.quantity = newQuantity;
            const checkoutHeaderMiddleSection = document.querySelector('.checkout-header-middle-section');
            if (checkoutHeaderMiddleSection) {
              checkoutHeaderMiddleSection.innerHTML = `checkout(${AddQuantity()})`;

                }
updateQuantityInPage(productID, newQuantity);
SaveToStorage();
          }
        }
                link.innerHTML = 'Update';
      });
      event.stopPropagation();
    }
  });
});


