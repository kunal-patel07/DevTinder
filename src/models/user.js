const mongoose = require("mongoose");
const validate= require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowerCase: true,
      required: true,
      trim: true,
      unique: true,
      validate(value) { 
        if(!validate.isEmail(value)){
          throw new Error ("email is not valid : " +value  )
        }
      }
    },

    photoUrl: {
      type: String,
      default:
        "https://tse1.mm.bing.net/th/id/OIP.gzGeWLUw6FzqPYlBALlGeQHaHa?pid=Api&P=0&h=180",
      validate(value) {
        if(!validate.isURL(value)){
      throw new Error ("url is invalid : "+ value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
      validate (value) { 
        if(!validate.isStrongPassword(value)){
          throw new Error("add more strong password : " + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    skills: {
      type: [String],
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender is not valid");
        }
      },
    },
  },

  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
