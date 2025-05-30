const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  emailId: {
    type: String,
  },
  pass: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user" ,userSchema)
module.exports = {User}
