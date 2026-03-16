const validate = require("validator");
//validation for signup

const validateSignUp = (req)=>{

  const {firstName, lastName , emailId , password} = req.body;

   if(!firstName || !lastName) { 
    throw new Error ("enter a valid first and last name");
   }else if (!validate.isEmail(emailId)) { 
    throw new Error ("enter valid email")
   }else if  (!validate.isStrongPassword(password)){
    throw new Error ("password is too weak");
   }

}

//validation for signin

const validateSignIn = (req) => { 
  const {emailId , password } = req.body;

  if(!validate.isEmail(emailId) ){
    throw new Error ("invalid email format")
  }else if (!validate.isStrongPassword(password)){
    throw new Error ("invalid password format");
  }

}
 
module.exports = {validateSignUp , validateSignIn};

