const counterBlock = document.querySelector('.product-in-detail__quantity');
const counterProducts = document.querySelector('.product-in-detail__quantity-counter span');

counterBlock.addEventListener('click', () => {
	if (event.target.closest('.product-in-detail__quantity-counter-minus')) {
		let counterInner = parseInt(counterProducts.innerHTML);
		if (counterInner > 1) {
			counterInner -= 1;
			counterProducts.innerHTML = `${counterInner}`
		}
	}
	if (event.target.closest('.product-in-detail__quantity-counter-plus')) {
		let counterInner = parseInt(counterProducts.innerHTML);
			counterInner += 1;
			counterProducts.innerHTML = `${counterInner}`
	}
})

//------------------------------------------

const cartFullPrice = document.querySelector('.face__cart-price span');
const cartItemsCounter = document.querySelector('.cart__items span');
const buttonAddToCart = document.querySelector('.product-in-detail__add-to-cart-button');
const productPrice = document.querySelector('.product-in-detail__price span')

buttonAddToCart.addEventListener('click', () => {
	let cartItemsNum = parseInt(cartItemsCounter.innerHTML);
	cartItemsCounter.innerHTML = `${cartItemsNum + 1}`
}, { 'once': true });

buttonAddToCart.addEventListener('click', () => {
	let cartPriceNum = parseInt(cartFullPrice.innerHTML);
	// let cartItemsNum = parseInt(cartItemsCounter.innerHTML);
	let counterProductsInner = parseInt(counterProducts.innerHTML);
	let productPriceInner = parseInt(productPrice.innerHTML)
	let price = cartPriceNum + productPriceInner * counterProductsInner;
	cartFullPrice.innerHTML = `${price}`;
});


//--------------------------------
const cartClear = document.querySelector('.face__cart-clear');

cartClear.addEventListener('click', () => {
	cartFullPrice.innerHTML = 0;
	cartItemsCounter.innerHTML = 0;
})

//--------------------------------------------------
const wislistCounter = document.querySelector('.face__wishlist span');
const addToWishlist = document.querySelector('.product-in-detail__add-to-wishlist');

addToWishlist.addEventListener('click', () => {
	let counter = parseInt(wislistCounter.innerHTML);
	console.log(counter)
	counter += 1;
	wislistCounter.innerHTML = `${counter}`
}, { 'once': true });






