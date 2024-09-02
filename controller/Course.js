const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploder");

require('dotenv').config();

exports.createCourse = async (req, res, next) => {
  try {
    //get all data
    const { courseName, courseDescription, whatYouWillLearn, price, tag, category,status,instructions } = req.body;
    const userId = req.user.id;
    
    // Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;
    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag||
			!category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }
    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Provide thumbnail",
      });
    }
    if(!status || status == undefined){
      status="Draft";
    }

    // instructor level validation
  
    const instructorDetails = await User.findById(userId,{accountType:"Instructor"});
    console.log("Instructor Details =>", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // tag validation
    const categoryDetails = await Category.findById(category);
    if(!categoryDetails){
       return res.status(404).json({
         success: false,
         message: "Category Detials not found",
       });
    }
    //  Image uploaded to cloudinary

    const thumbNailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
    console.log("thumbNailImage  =>", thumbNailImage);
    // create course entry in DB
    let newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      tag: tag,
      category:categoryDetails._id,
      thumbNail: thumbNailImage.secure_url,
      status:status,
      instructions:instructions,
    });

    // add course entry in user schema of instructor
    await User.findByIdAndUpdate(
      {_id:instructorDetails._id},
      { $push:{courses:newCourse._id}},
      {new:true}
    );

    // add course entry in tag

    await Category.findByIdAndUpdate(
      {_id:category},
      {$push:{courses:newCourse._id}},
      {new:true})

    // return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data:newCourse,
    });
  } catch (error) {
    console.log("Error in creating Course =>", error);
    console.log("Error in creating Course =>", error.message);
    return res.statud(500).json({
      success: false,
      message: "Error while creating course",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find({},
      { courseName: true, 
        courseDescription: true, 
        courseContent: true,
        price:true,
        thumbNail:true,
        instructor:true,
       }
    ).populate("instructor").exec();
    console.log("All Courses Data =>", allCourses);

    return res.status(200).json({
      success: true,
      message: "All courses data fetched successfully",
      data:allCourses,
    });
  } catch (error) {
    console.log("Error in showing All courses =>", error);
    console.log("Error in showing All courses =>", error.message);
    return res.statud(500).json({
      success: false,
      message: "Error while getting All courses",
      error: error.message,
    });
  }
};

exports.getCourseDetails = async(req,res)=>{
  try {
    const {courseId} = req.body;
    if(!courseId){
      return res.status(400).json({
        success:false,
        message:"Please provide courseId"
      })
    }
    
    const courseDetails = await Course.findById({_id:courseId}).populate({path:"instructor",populate:{path:"additionalDetails"}}).populate("category").populate({path:"courseContent",populate:{path:"subSection"}}).exec();
    console.log("CourseDetails =>",courseDetails);

    if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the course with ${courseId}`
      })
    }

    return res.status(200).json({
      success:true,
      message:"Course Details fetched successfully",
      data:courseDetails
    })
  } catch (error) {
    console.log("Error while getting Course Details =>",error)
    console.log("Error while getting Course Details =>",error.message);

    return res.statu(500).json({
      success:false,
      message:"Error in getting course Details",
      error:error.message
    })
  }
}
