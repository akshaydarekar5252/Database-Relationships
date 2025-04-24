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
    email : String,
});

const postSchema = new Schema({
    content : String,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    likes: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

const addData = async () => {
    let user1 = new User({
        username : 'Akshay',
        email : 'aks212@gmail.com'
    });
    let post1 = new Post ({
        content : 'This is my first post',
        likes : 5,
    });

    post1.user = user1;

    await user1.save();
    await post1.save();
};

addData();
