const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use(express.json());
app.use(cookieParser());



app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/", userRouter);



    



connectDb()
  .then(() => {
    console.log("database connected successfully");

    app.listen(port, () => {
      console.log(`server is running on ${port} `);
    });
  })
  .catch((err) => {
    console.log("error in connection", err.message);
  });
