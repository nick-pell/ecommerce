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