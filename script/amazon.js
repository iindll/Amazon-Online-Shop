import { cartList,AddToCart } from "../script/cart.js";
import { Prouducts } from "../script/Products.js";



const productsGrid = document.querySelector('.products-grid');
if(productsGrid){
let  ProuductHTML = ''
Prouducts.forEach((Prouduct) => {
    // document.querySelector('.products-grid').innerHTML = ProuductHTML;

    ProuductHTML = ProuductHTML +  ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${Prouduct.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${Prouduct.name};
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${Prouduct.rating.star * 10}.png">
            <div class="product-rating-count link-primary">
              ${Prouduct.rating.count}
            </div>
          </div>

          <div class="product-price">
          ${'$'+(Prouduct.Price/100).toFixed(2) }
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-name="${Prouduct.name}" data-product-count ="${Prouduct.rating.count}" data-product-id="${Prouduct.id}">
            Add to Cart
          </button>
          
        </div>`;
});

productsGrid.innerHTML = ProuductHTML;
}

let counter = 0
export function AddQuantity() {
    let total = 0;
    cartList.forEach((item) => {
        total += item.quantity;
    });
    return total;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productIDOrigin = button.dataset.productId;

        AddToCart(productIDOrigin);
        counter = AddQuantity();

        console.log('Added to cart:', cartList);
        document.querySelector('.cart-quantity').innerHTML = counter;
        AddedFunction(button);
    });
});

    
function AddedFunction(button){
    const addedToCart = document.querySelector('.added-to-cart');
    addedToCart.style.opacity = 1;
  
    setTimeout(() => {
      addedToCart.style.opacity = 0;
    }, 2000/2);
  }
  



