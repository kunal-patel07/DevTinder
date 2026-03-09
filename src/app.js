const express = require("express");
const app = express();
const port = 3000;

app.delete("/user",(req,res)=>{
    res.send("user data deleted")
}) 

 // accept every http reqest 
// app.use("/user",(req,res)=>{
//     res.send("user data will same for everyone")
// })

app.patch("/user",(req,res)=>{
    res.send("user data updated")
}) 

app.post("/user",(req,res)=>{
    res.send({firstName : "Krunal" , lastName : "Patel"})
}) 
app.get("/user",(req,res)=>{
    res.send("user got get request")
}) 

app.use("/test",(req,res)=>{
    res.send("this is basic server")
    console.log("every time you hit")
})


app.listen(port,()=>{
    console.log(` server is running on ${port} `)
})
