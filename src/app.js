const express = require("express");

const app = express();

const port = 3000;
app.get(
  "/user",
  (req, res, next) => {
    console.log("first route");
    next();
  },
  (req, res) => {
    console.log("2nd route");
    res.send("this is inside route");
  }
);
// app.post("/user",(req,res)=>{
//    res.send("user data stored to database")
// })

// app.delete("/user",(req,res)=>{
//       res.send("user deleted successful")
// })

// app.get("/test",(req,res)=>{
//     res.send("this is for testing")
// })

// app.get("/",(req,res)=>{
//   res.send("this is route page")
// })

app.listen(port, () => {
  console.log("port is listening on ", port);
});
