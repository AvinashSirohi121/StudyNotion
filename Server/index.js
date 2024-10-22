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
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
//app.use(cookieParser);
app.unsubscribe(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))



app.use("/api/v2",router);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});