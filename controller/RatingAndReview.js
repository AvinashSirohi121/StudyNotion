const RatingAndReview  = require("../models/RatingAndReview");
const Course  = require("../models/Course");


exports.createRatings =async(req,res)=>{
    try {
        const {rating,review,courseId} = req.body;
        const userId = req.user.id;

        // check if user has buy the course
        const userDetails  = await User.findById({_id:userId});
        if(!userDetails.courseId.includes(courseId)){
            return res.status(400).json({
                success:false,
                message:"User is not enrolled in the course"
            })
        }

        // check if user has not already enrolled in the course

        let courseDetails = await Course.findOne({_id:courseId ,studentEnrolled:{$elemMatch:{$eq:userId}}});

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Student not enrolled in course"
            })
        }

        // check if user not already not reviewd the course

        const alreadyReviewed= await RatingAndReview.findOne({user:userId,course:courseId});
        
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"Course Already Rated and reviewed by user"
            })
        }


        // create rating and review

        const ratingAndReview = await RatingAndReview.create({rating,review,course:courseId,user:userId});
        // attach the rating to course
        let updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                ratingAndReview:ratingAndReview._id,
            }},
            {new:true});

        // return res

        return res.status(200).json({
            success:true,
            message:"Successfully rated and reviewed the course",
            data:ratingAndReview
        })

         
    } catch (error) {
        console.log("Error while creating rating =>",error)
        console.log("Error while creating rating =>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error while creating Rating",
            error:error.message
        })
    }
}

exports.getAverageRatings =async(req,res)=>{
    try {
        const {courseId} = req.body;

        const result = await RatingAndReview.aggregate(
            { $match:{ course:new mongoose.Types.ObjectId(courseId),}},
            { $group:{ _id:null,averageRating:{$avg:"$rating"}}});

            if(result.length>0){
                return res.status(200).json({
                    success:true,
                    message:"Rating of the give course",
                    averageRating:result[0].averageRating
                })
            }
            // if not ratingReview exist;

            return res.status(200).json({
                success:true,
                message:"Average Ratingis 0 , not rating is given till now"
            })
        
    } catch (error) {
        console.log("Error while getting average rating =>",error)
        console.log("Error while getting average rating=>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error while getting average Rating",
            error:error.message
        })
    }
}

exports.getAllRatings =async(req,res)=>{
    try {
        
        const allReviews =await RatingAndReview.find({}).sort({rating:"desc"}).populate({path:"user",select:"firstName,lastName,email,image"}).populate({path:"course",select:"CourseName"}).exec(); 
   
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })
    } catch (error) {
        console.log("Error while getAll rating =>",error)
        console.log("Error while getAll rating =>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error while getAll Rating",
            error:error.message
        })
    }
}

