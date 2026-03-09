    const express = require("express");
    const app = express();
    const port = 3000;


    app.get("/user/:id",(req,res)=>{
        const id = req.params.id;
        console.log(id)
        res.send(`user got get request ${id}`)
    }) 





    app.listen(port,()=>{
        console.log(` server is running on ${port} `)
    })
