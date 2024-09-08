const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors")
const cookieParser = require("cookie-parser");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload")
const router = require("./routes/Routes");

// DB connection
const {db} = require("./config/database");
db();

// cloudinary connection
cloudinaryConnect();

require("dotenv").config()
const PORT =process.env.PORT || 4000;

app.use(express.json())
//app.use(cookieParser);
app.unsubscribe(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))



app.use("/v2",router);

app.listen(PORT,()=>{
    console.log(`Server running on PORT -> ${PORT}`)
})

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});