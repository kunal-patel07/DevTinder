const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./config/database");
const User = require("./models/user");
const { validateSignUp, validateSignIn } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

//add new user to database
app.post("/signup", async (req, res) => {
  try {
    // validate user
    validateSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;

    // encrypt password
    const encryptPasword = await bcrypt.hash(password, 10);
    console.log(encryptPasword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptPasword,
    });

    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});

//sign in an exsiting user

app.post("/signin", async (req, res) => {
  try {
    validateSignIn(req);

    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
  const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
    
      //genrate token

      const token = jwt.sign({_id : user._id},"fdms"  , { expiresIn :'0d'})

     res.cookie("token" , token , { expires : new Date(Date.now() + 900000)});
       res.send("signin successfully")
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
      const user = req.user;
     console.log(user)
     res.send(user);
  } catch (err) {

    res.status(404).send("Error : " + err.message);
  }
});

app.post ("/sendConnectionRequest" , userAuth,(req,res) => {
    

  try {
    const user  = req.user;
   
    if(!user) { 
      throw new Error ("user not found");
    }
 
   res.send(user.firstName + " is Sent you connection request");     
  }catch (err) { 
    res.status(400).send("Error : ");
  }
})
    



connectDb()
  .then(() => {
    console.log("database connected successfully");

    app.listen(port, () => {
      console.log(`server is running on ${port} `);
    });
  })
  .catch((err) => {
    console.log("error in connection", err.message);
  });
