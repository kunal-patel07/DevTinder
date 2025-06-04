const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  pass: {
    type: String,
  },
  age: {
    type: String,
  },
});
const User =  mongoose.model("User",userSchema);
module.exports = {User}
