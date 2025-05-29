const express = require("express");
const app = express();
const {authAdmin} =require("./middlewares/auth")
const port = 3000;
//middleware 
app.use("/admin",authAdmin)



app.get("/admin/getData",(req,res)=>{
  res.send("get all data successfully")
})

app.get("/admin/deleteUser",(req,res)=>{
  res.send("deleted user successfully")
})

app.listen(port, () => {
  console.log("port is listening on ", port);
});
