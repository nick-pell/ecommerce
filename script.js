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

let generateMenShop = () => {
    return (menShop.innerHTML = menShopItemsData.map((item)=>{

        return `
        <div class="item">
        <img src="${item.img}" alt="">
        <div class="details">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="price-quantity">
                <h2>$ ${item.price}</h2>
                <div class="buttons">
                    <i class="bi bi-dash-lg"></i>
                    <div class="quantity">0</div>
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
        `;


    }).join(""));

};

generateMenShop();