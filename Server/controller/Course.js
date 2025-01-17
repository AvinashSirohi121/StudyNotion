const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploder");

require('dotenv').config();

exports.createCourse = async (req, res, next) => {
  try {
    //get all data
    console.log("Inside create course")
    let { courseName, courseDescription,courseImage, whatYouWillLearn, price, tag, category,status,instructor,instructions    } = req.body;
    const userId = req.user.id;
    
    // Get thumbnail image from request files
		const thumbnail = req?.files?.courseImage;
    console.log("CourseName =>",courseName)
    console.log("CourseDesc =>",courseDescription)
    console.log("WhatYouWillLearn =>",whatYouWillLearn)
    console.log("Price =>",price)
    console.log("tag =>",tag,typeof tag)
    console.log("Category =>",category)
    console.log("Status =>",status)
    console.log("Instructor =>",instructor)
    console.log("Instructions =>",instructions)
    console.log("Thumbnail =>",thumbnail)
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
      tag: typeof tag === "string" ? JSON.parse(tag) : tag,
      category:categoryDetails._id,
      thumbNail: thumbNailImage.secure_url,
      status:status,
      instructor:instructor,
      instructions:typeof instructions === "string" ? JSON.parse(instructions) : instructions, 
      dateOfCreation: new Date(),
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
    return res.status(500).json({
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

exports.getInstructorCourse = async(req,res,next)=>{

  try{

    let instructorId = req.user.id;
    //console.log("Instructor Id =>",instructorId)
    
    // let instructorData = await User.findById(instructorId);
    // console.log("instructorData =>",instructorData);

    let courseData = await Course.find({instructor:instructorId});
    //console.log("CourseData =>",courseData);
    
    if(!courseData){
      return res.status(400).json({
        success:false,
        message:"Error in getting Instructor courses",
        
      })
    }

    return res.status(200).json({
      success:true,
      message:"Instructor Courses",
      data:courseData
    })


  }catch(error){
    console.log("Error while getting Instructor Courses =>",error)
    console.log("Error while getting Instructor Courses =>",error.message)
    return res.status(500).json({
      success:false,
      message:"Error in getting Instructor course Details",
      error:error.message
    })
  }
}

exports.deleteCourse = async(req,res,next)=>{
      try{
        let {courseId} = req.body;
        
        console.log("Deleting courseId =>",req.body);
        console.log("Deleting courseId =>",courseId);

        let validCourse = await Course.findById(courseId);
        console.log("Valid Course =>",validCourse);

        if(!validCourse){
          return res.status(400).json({
            success:false,
            message:"This is not a vaild Course"
          })
        }
        console.log("If here then valid course")
        let deleteCourse = await Course.findByIdAndDelete(courseId);
        console.log("CourseID =>",deleteCourse);
         // Fetch the updated courses for the instructor
          let instructorId = req.user.id;
          let updatedCourses = await Course.find({ instructor: instructorId });

          return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: updatedCourses, // Send updated courses back to the frontend
          });

      }catch(error){
        console.log("Error in deleting Course COntroller =>",error)
        console.log("Error in deleting Course COntroller =>",error.message);

        return res.status(500).json({
          success:false,
          message:"Error in deleting Course",
          error:error.message
        })
      }
}

exports.editCourse = async(req,res,next)=>{
    try{
      console.log("ReqBody =>",req.body)
      let  {courseId } = req.body;
     // const userId = req.user.id;
      
       console.log("CourseID =>",courseId);

      // console.log("CourseName =>",courseName)
      // console.log("CourseDesc =>",courseDescription)
      // console.log("WhatYouWillLearn =>",whatYouWillLearn)
      // console.log("Price =>",price)
      // console.log("tag =>",tag,typeof tag)
      // console.log("Category =>",category)
      // console.log("Status =>",status)
      // console.log("Instructor =>",instructor)
      // console.log("Instructions =>",instructions)
      

      let thumbNail = req?.files?.courseImage;
      console.log("ThumbNail =>",thumbNail);
      
      // if( !courseName || !courseDescription || !courseImage ||
      //     !whatYouWillLearn || !price || !tag ||  tag==[] || !category || 
      //     !status || !instructor || !instructions || instructions==[]
      // ){
      //     return res.status(400).json({
      //       success:false,
      //       message:"Please provide all details"
      //     })
      // }

     


    }catch(error){
      console.log("Error in editing course =>",error)
      console.log("Error in editing course =>",error.message)

      return res.status(500).json({
        success:false,
        message:"Error while editing Course",
        error:error.message
      })
    }
}