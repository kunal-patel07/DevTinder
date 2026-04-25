const validate = require("validator");
//validation for signup

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("enter a valid first and last name");
  } else if (!validate.isEmail(emailId)) {
    throw new Error("enter valid email");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("password is too weak");
  }
};

//validation for signin

const validateSignIn = (req) => {
  const { emailId, password } = req.body;

  if (!validate.isEmail(emailId)) {
    throw new Error("invalid email format");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("invalid password format");
  }
};

// validate user profile

const validateProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "age",
    "about",
    "skills",
    "gender",
  ];

   const isProfileUpdated =  Object.keys(req.body).every((field) =>allowedEditFields.includes(field));

     

   return isProfileUpdated;

};




const validatePassword = (newPassword) => { 

  if(!validate.isStrongPassword(newPassword)){
    throw new error("new password is weak")
  }


}


module.exports = { validateSignUp, validateSignIn,validateProfile,validatePassword };
