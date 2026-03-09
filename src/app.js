    const express = require("express");
    const app = express();
    const port = 3000;


    app.use("/user",(req,res,next)=>{
        console.log("1st route handler");
        res.send(`handling 1st route`);
        next();
    },(req,res,next)=>{
        console.log("2nd route handler");
        res.send(`handling 2nd route`);
        next()
    },
    (req,res,next)=>{
        res.send("this is 3rd route")
        console.log("this is 3rd route")
        next();
    }
); 





    app.listen(port,()=>{
        console.log(` server is running on ${port} `)
    })
