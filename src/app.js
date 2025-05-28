const express= require("express")

const app = express()

const port = 3000;



app.use("/home/wait",(req,res)=>{
    res.send("this is route of route of home and wait")
})

app.use("/home",(req,res)=>{
    res.send("this is home page route")
})

app.use("/",(req,res)=>{
  res.send("this is route page")
})

app.listen(port,()=>{
    console.log("port is listening on ",port)
})