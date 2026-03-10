const express = require("express");
const app = express();
const port = 3000;

app.use("/user",(req,res)=>{
    throw new Error("something went wrong");    
})
app.use("/",(err,req,res,next)=>{
    if(err){
      res.status(404).send("new error occured conact support team")
      console.log("err handled by express err handled")
    }
})


app.listen(port, () => {
  console.log(` server is running on ${port} `);
});
