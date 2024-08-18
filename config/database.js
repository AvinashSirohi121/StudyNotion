const mongoose = require('mongoose');
require('dotenv').config();

exports.db = () => {
  console.log("DATABASE URL =>", process.env.DATABASE_URL);
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
      console.log("Error while DB connection =>", err.message);
      console.log("Error =>", err);
      process.exit(1);
    });
};



