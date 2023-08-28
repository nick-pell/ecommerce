// ! MENS SHOP SECTION !

let menShop = document.getElementById('menShop');
let menShopItemsData = [{
    id:"item1",
    name: "Supreme Crewneck",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit?" ,
    img: "/images/supreme.webp"
},{
    id:"item2",
    name: "Essentials Hoodie",
    price: 200,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit?" ,
    img: "/images/essentials.png"
},{
    id:"item3",
    name: "Anti Social Tee",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit?" ,
    img: "/images/antisocial.png"
},{
    id:"item4",
    name: "Essentials Tee",
    price: 200,
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit?" ,
    img: "/images/fogshirt.webp"
}];

let basket = JSON.parse(localStorage.getItem("data")) || [];          // retrieve basket data from local storage, but if no data, initializes empty array 

let generateMenShop = () => {
    return (menShop.innerHTML = menShopItemsData.map((item)=>{

        // search function to update the item counter on each card so it matches with the data when the browser is refreshed. (without this, it will initialize to zero first, then update to the correct value when incremented / decremented)
        let search = basket.find((x)=> x.id === item.id) || []       // if we dont find anything, return empty array

        return `
        <div id=product-id-${item.id} class="item">
        <img src="${item.img}" alt=""> 
        <div class="details">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="price-quantity">
                <h2>$ ${item.price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${item.id},${item.price})" class="bi bi-dash-lg"></i>
                    <div id=${item.id} class="quantity">
                    ${search.amount === undefined? 0: search.amount}
                    </div>
                    <i onclick="increment(${item.id},${item.price})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
        `;


    }).join(""));

};

generateMenShop();

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
    localStorage.setItem("data",JSON.stringify(basket));                                                       // save data to local storage so data doesnt clear on refresh
    update(selectedItem.id);
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
    localStorage.setItem("data",JSON.stringify(basket));                                                       // save data to local storage so data doesnt clear on refresh
    update(selectedItem.id);

}

let update = (id) => {
    // finding item in basket
    let search = basket.find((x) => x.id === id )
    // updates the amount to show how many items added
    document.getElementById(id).innerHTML = search.amount;
    calculation();

}

let calculation = () => {
    let cartAmount = document.getElementById("cartAmount");
    let cartTotal = document.getElementById("cartTotal");
    cartAmount.innerHTML = basket.map((x)=> x.amount).reduce((prev,next) => prev + next, 0)
    cartTotal.innerHTML = `$`+basket.map((x)=> x.price).reduce((prev,next) => prev + next, 0)
    console.log(basket);

}

calculation();      // invoked here so values get updated automatically when refreshed


// ! ------------------------------------------------------------------------------------------------------------------------------------------------- !