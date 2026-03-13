const validate = require("validator");

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


module.exports = {validateSignUp};

