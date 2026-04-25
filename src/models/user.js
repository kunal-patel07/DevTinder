const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validate = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index : true,
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
        if (!validate.isEmail(value)) {
          throw new Error("email is not valid : " + value);
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://tse1.mm.bing.net/th/id/OIP.gzGeWLUw6FzqPYlBALlGeQHaHa?pid=Api&P=0&h=180",
      validate(value) {
        if (!validate.isURL(value)) {
          throw new Error("url is invalid : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validate.isStrongPassword(value)) {
          throw new Error("add more strong password : " + value);
        }
      },
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
    about : {
      type : String,
      default : "this is default about"
    }
  },

  { timestamps: true },
);

//it will make fast db
// userSchema.index({firstName : 1})
// userSchema.index({gender : 1})


userSchema.methods.getJWT =async function() {
  
  const user = this;
  
  const token =await jwt.sign({_id : user._id},"fdms"  , { expiresIn :'1d'})

  return token;

}


userSchema.methods.validatePassword  = function(password){ 
  const user = this;
  const hashPass = user.password;
  const isPasswordValid = bcrypt.compare(password , hashPass);

  return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
