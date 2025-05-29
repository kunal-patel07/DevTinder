const mongoose = require("mongoose")


const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://krunal:hY1W2PpaghR2lxYV@namstenode.i9hyhjt.mongodb.net/devTinder")
}
module.exports ={connectDb}