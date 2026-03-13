const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },skills  : {
      type : [String]
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender is not valid");
        }
      },
    }
  },

{ timestamps: true }

);

const User = mongoose.model("User", userSchema);

module.exports = User;
