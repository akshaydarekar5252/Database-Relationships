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

const userSchema = new Schema({
    username : String,
    addresses : [
        {
            
            _id:false, // to avoid creating a new _id for each address
            location : String,
            city : String,
        },
    ],
});

const User = mongoose.model('User', userSchema);

const addUsers = async () => {
    let user1 = new User ({
        username: 'akshay darekar',
        addresses: [
            { 
                location: 'pune',
                 city: 'pune' 
            },
        ]
    });

    user1.addresses.push({ location: 'mumbai', city: 'mumbai' });
    let result = await user1.save();
    console.log(result);
};

addUsers();