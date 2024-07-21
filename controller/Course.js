const Course = require("../models/Course");
const Tag = require("../models/Tags")
const uploadImageToCloudinary = require("../utils/imageUploder");

require('dotenv').config();

exports.createCourses = async (req, res, next) => {
  try {
    //get all data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;
    // get file
    const { thumbnail } = req.files;
    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
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
    // instructor level validation
    const userId = req.user._id;

    let instructorDetails = await User.findById(userId);
    console.log("Instructor Details =>", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    // tag validation
    let tagDetails = await Tag.findById(tag);
    if(!tagDetials){
       return res.status(400).json({
         success: false,
         message: "tag Detials not found",
       });
    }
    //  Image uploaded to cloudinary

    let thumbNailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
    console.log("thumbNailImage  =>", thumbNailImage);
    // create course entry in DB
    let newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      tag: tagDetails._id,
      thumbNail: thumbNailImage.secure_url,
    });

    // add course entry in user schema of instructor
    await User.findByIdAndUpdate(
      {_id:instructorDetails._id},
      { $push:{courses:newCourse._id}},
      {new:TextTrackCueList}
    );

    // add course entry in tag

    await Tag.findByIdAndUpdate(
      {_id:tag},
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

exports.showAllCourses = async (req, res, next) => {
  try {
    let allCourses = await Course.find(
      {},
      { courseName: true, courseDescription: true, courseContent: true }
    );
    console.log("All Courses Data =>", allCourses);

    return res.status(200).json({
      success: false,
      message: "All courses data fetched successfully",
      allCourses,
    });
  } catch (error) {
    console.log("Error in showing All courses =>", error);
    console.log("Error in showing All courses =>", error.message);
    return res.statud(500).json({
      success: false,
      message: "Error while showing All courses",
      error: error.message,
    });
  }
};
