const express = require("express");
const app = express();
const { authAdmin, authUser } = require("./middlewares/auth");
 const {connectDb}  = require("./config/database")
const port = 3000;

//middleware
app.use("/admin", authAdmin);
app.get("/admin", (req, res) => {
  res.send("Welcome to Admin Page");
});

app.get("/user", (req, res) => {
  try {
    res.send("welcome user");
  } catch (error) {
    res.status(500).send("error occured ");
  }
});
app.get("/user/data", authUser, (req, res) => {
  res.send("user data got successfully");
});

app.get("/admin/allData", (req, res) => {
  res.send("all data get successfully");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("all data deleted successfully");
});
app.use("/", (err, req, res, next) => {
  res.status(500).send("something went wrong");
});



connectDb().then(()=>{
console.log("connected successfully")

app.listen(port, () => {
  console.log("server is running on", port);
});
}).catch((e)=>{
     console.log("error connection")
})