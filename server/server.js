
require("dotenv").config();

const express = require("express");
const app = express();
let allShopItems = require('./public/src/data.js')

app.use(express.json());
app.use(express.static("public"));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


app.post('/create-checkout-session', async (req, res) => { 
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                let find = allShopItems.find((y)=> y.id === item.id );      // this finds the selectedItem in the allShopItemsData array from data.js so it can access the name. i tried to add a .name field to the shopping cart object but it didnt work idk. not the best solution but it works. (i can come back to this later)
                let name = find.name;
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name,
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.amount
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url:  `${process.env.SERVER_URL}/cancel.html`
        })
        

        res.json({ url: session.url})
    }catch(e){
        res.status(500).json({error: e.message})
    }
    
})

app.listen(3000)


