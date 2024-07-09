const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true,
        trim:true
    }
});

module.exports = mongoose.model("RatingAndReview", ratingSchema);
