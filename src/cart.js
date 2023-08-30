let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem("data")) || [];

// update cart counters
let calculation = () => {
    let cartAmount = document.getElementById("cartAmount");
    let cartTotal = document.getElementById("cartTotal");
    cartAmount.innerHTML = basket.map((x)=> x.amount).reduce((prev,next) => prev + next, 0)
    cartTotal.innerHTML = `$`+basket.map((x)=> x.price).reduce((prev,next) => prev + next, 0)


}

calculation();

let generateCartItems = () => {

// 2 cases - empty basket & full basket

    if(basket.length !== 0){
        shoppingCart.innerHTML = basket.map((item)=>{
            // search function matches ID in basket to ID in shopItemsData
            let search = menShopItemsData.find((x)=> x.id === item.id ) || []
            return `
            <div class="cart-item">
                <img width="150" src="${search.img}"/>
                <div class="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$${search.price}</p>
                        </h4>
                        <i onclick="clearItem(${search.id})" class="bi bi-x-lg"></i>
                    </div> 
                        <div class="buttons">
                        <i onclick="decrement(${item.id},${search.price})" class="bi bi-dash-lg"></i>
                        <div id=${item.id} class="quantity">${item.amount}</div>
                        <i onclick="increment(${item.id},${search.price})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>Item Total: $${item.price}</h3>
                </div>
            </div>
            `
        }).join("")

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

let increment = (id,price) => {
    let selectedItem = id;

    let search = basket.find((x)=> x.id === selectedItem.id);       // search function checks whether it exists in basket
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            amount: 1,
            price: price,
        });
    }else{
        search.amount += 1;
        search.price = search.amount * price;
    }
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));                                                       // save data to local storage so data doesnt clear on refresh
    generateCartItems();

}

let decrement = (id,price) => {
    let selectedItem = id;

    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) return;                            // if item isnt in basket you cant decrement it so it just returns

    if(search.amount === 0) return;
    else{
        search.amount -= 1;
        search.price = search.amount * price;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.amount !== 0); // removes item from  basket if amount is 0
    generateCartItems();        // called here so items that get decremented to 0 get removed from checkout p
    localStorage.setItem("data",JSON.stringify(basket));                                                       // save data to local storage so data doesnt clear on refresh


}

let update = (id) => {
    // finding item in basket
    let search = basket.find((x) => x.id === id )
    // updates the amount to show how many items added
    document.getElementById(id).innerHTML = search.amount;
    calculation();

}

let clearItem = (id) => {
    selectedItem = id;
    basket = basket.filter((x)=> {  // goes thru the basket until x.id = selecteditem.id, then doesnt add that item back into the basket
        return x.id !== selectedItem.id});

    localStorage.setItem("data",JSON.stringify(basket));
    generateCartItems();

}

let totalAmount = () => {
    if(basket.length !== 0){
        let total = basket.map((x)=> x.price).reduce((prev,next) => prev + next, 0);
        label.innerHTML = `
        <h2>Total: $${total}</h2>
        <button class="checkoutBtn">Checkout</button>
        <button class="clearCart">Clear Cart</button>
        `
        
    }else return;
}

totalAmount();