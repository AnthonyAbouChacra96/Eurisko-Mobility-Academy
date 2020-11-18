export const ADD_TO_CART='ADD_TO_CART';



export const addToCart=product=>{
	console.log('entere func add to cart')
return{type:ADD_TO_CART,product:product};
}