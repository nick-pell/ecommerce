let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem("data")) || [];

// update cart counters
let calculation = () => {
    let cartAmount = document.getElementById("cartAmount");
    let cartTotal = document.getElementById("cartTotal");
    cartAmount.innerHTML = basket.map((x)=> x.amount).reduce((prev,next) => prev + next, 0)
    cartTotal.innerHTML = `$`+basket.map((x)=> x.price).reduce((prev,next) => prev + next, 0)
    console.log(basket);

}

calculation();

let generateCartItems = () => {

// 2 cases - empty basket & full basket

    if(basket.length !== 0){

    }else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="/index.html">
            <button class="homeBtn">Back to home</button> 
        `
    }

}

generateCartItems();