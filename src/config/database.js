const mongoose = require("mongoose")


const connectDb= async ()=>{
    await mongoose.connect("mongodb+srv://kp195678_db_user:pxhDNE5rIVzhlF7U@devtinder.cetp0fo.mongodb.net/?appName=devTinder");
}
module.exports = connectDb;
