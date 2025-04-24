const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item : String,
    price : Number,
});

const customerSchema = new Schema ({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Order'
        },
    ],

});
const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// const addCustomer = async () => {
//     // let cus1 = new Customer({
//     //     name : 'Akshay Darekar',
//     // });

//     // let order1 = await Order.findOne({item : 'Laptop'});
//     // let order2 = await Order.findOne({item : 'Phone'});
//     // let order3 = await Order.findOne({item : 'Tablet'});

//     // cus1.orders.push(order1);
//     // cus1.orders.push(order2);
//     // cus1.orders.push(order3);
//     // let result = await cus1.save();
//     // console.log(result);
//     let res = await Customer.find({});
//         console.log(res);;
    
// };

// addCustomer();  


const findCustomer = async ()=>{
    let result = await Customer.find({}).populate('orders');

    console.log(result[0]);
}

findCustomer();


// const addOrders = async () => {
//    let result=  await Order.insertMany([
//         {item: 'Laptop', price: 1000},
//         {item: 'Phone', price: 500},
//         {item: 'Tablet', price: 300},
//     ]);
//     console.log(result);
// };

// addOrders();