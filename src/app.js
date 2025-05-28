const express= require("express")

const app = express()

const port = 3000;



app.post("/user",(req,res)=>{
   res.send("user added successfully")
})

app.get("/user",(req,res)=>{
    res.send("user detail")
})

app.delete("/user",(req,res)=>{
      res.send("user deleted successful")
})

app.get("/test",(req,res)=>{
    res.send("this is for testing")
})

app.get("/",(req,res)=>{
  res.send("this is route page")
})

app.listen(port,()=>{
    console.log("port is listening on ",port)
})