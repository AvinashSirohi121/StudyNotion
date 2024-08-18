const express = require('express');
const app = express();
require("dotenv").config(); 
const PORT = process.env.PORT;

const router = require("./routes/Authentication");

// DB connection
const {db} = require("./config/database");
db();

app.listen(PORT,()=>{
    console.log(`Server running on PORT -> ${PORT}`)
})

// app.use("/",(req,res)=>{
//     res.send(`<h1>Backend running on PORT ${PORT}</h1>`)
// })
app.use(express.json());
app.use("/v2",router);