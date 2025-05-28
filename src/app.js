const express= require("express")

const app = express()

const port = 3000;


app.get("/",(req,res)=>{
    res.send("this will display on behalf of request handler")
})

app.get("/test:user",(req,res)=>{
   console.log(req.params ) 
    res.send("this is for testing")
})

app.listen(port,()=>{
    console.log("port is listening on ",port)
})