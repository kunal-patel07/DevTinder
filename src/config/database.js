require("dotenv").config();
const mongoose = require("mongoose");

const dbConn = async () => {
  await mongoose.connect(process.env.DB_API_KEY);
};

module.exports = { dbConn };
