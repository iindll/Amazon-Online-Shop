import { Prouducts } from "../script/Products.js";
import { AddQuantity } from "./amazon.js";

export let cartList = JSON.parse(localStorage.getItem('cartlist'));

if (!cartList) {
    cartList = [
        {
            productName: 'Sterling Silver Sky Flower Stud Earrings',
            productID: 'e4f64a65-1377-42bc-89a5-e572d19252e2',
            quantity: 2,
            DeliveryOptionID:'1'
        },
        {
            productName: 'Intermediate Size Basketball',
            productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            DeliveryOptionID:'2'

        }
    ];
}

export function SaveToStorage() {
    localStorage.setItem('cartlist', JSON.stringify(cartList)); // Fix: use 'cartlist'
}

export function AddToCart(productidOrigin) {
    let match;

    cartList.forEach((item) => {
        if (productidOrigin === item.productID) {
            match = item;
        }
    });

    if (match) {
        match.quantity++;
    } else {
        cartList.push({
            productName: FindProductName(productidOrigin), // Fix: Pass productidOrigin
            quantity: 1,
            productID: productidOrigin,
            DeliveryOptionID:'1'
        });
    }

    SaveToStorage();
}

function FindProductName(productidOrigin) {
    let Name = '';

    Prouducts.forEach((product) => {
        if (product.id === productidOrigin) {
            Name = product.name;
        }
    });

    return Name;
}

export function removeFromCart(itemID) {
    cartList = cartList.filter((product) => product.productID !== itemID); // Cleaner way
    const checkoutHeaderMiddleSection = document.querySelector('.checkout-header-middle-section');
    if (checkoutHeaderMiddleSection) {
      checkoutHeaderMiddleSection.innerHTML = `checkout(${AddQuantity()})`;
    }
    SaveToStorage();
}


function UpdaeQuantity(ID){
    cartList.forEach((item)=>{
        if(item.productID===ID){
            item.quantity--;
        }
    })
}
