const express = require("express");
const app = express();
const port = 3000;
const {adminAuth , userAuth}  = require("./middlewares/auth.js");



app.use("/admin", adminAuth);

app.use("/user",userAuth,(req,res)=>{
    res.send("this is a basic user data")
})
app.use("/admin/allData",(req,res)=>{
    res.send("all data sent")
})



app.listen(port, () => {
  console.log(` server is running on ${port} `);
});
