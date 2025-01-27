const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

require('dotenv').config();

exports.createSubSection = async(req,res,next)=>{
    try{
        // get data
        const {sectionId ,title,description,courseId} = req.body;
        const videoFile = req?.files?.videoFile;
        //validation
        console.log("SectionId =>",sectionId," Title =>",title," Description =>",description," CourseId =>",courseId);
        console.log("VideoFile =>",videoFile)
        // console.log("VideoFile =>",req.files.videoFile)
        // console.log("VideoFile =>",vidoeFile)
        if(!sectionId || !title  || !description || !videoFile){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // upload video to Cloudinary
        let videoDetails = await uploadImageToCloudinary(
          videoFile,
          process.env.FOLDER_NAME,

        );
       // console.log("Uploaded Video Details =>",videoDetails);
        let time = videoDetails.duration;
     

        // create subsection
        const subSectionDetails = await SubSection.create({
          title: title,
          timeDuration: `${time} sec`,
          description: description,
          videoUrl:videoDetails.secure_url
        });
       // console.log("subSectionDetails => ",subSectionDetails);
        // update Section
       // TODO populate both section and SubSection data
        let updatedSection = await Section.findByIdAndUpdate(
          { _id: sectionId },
          { $push: { subSection: subSectionDetails._id} },
          {new:true}
        ).populate("subSection");
        //return response

        let updatedCourse = await Course.findById(courseId).populate({
          path: "courseContent", // Populating the `courseContent` field
          populate: {
            path: "subSection", // Populating the `subSection` field inside `courseContent`
          },
        }).exec();

        console.log("UpdatedCourse =>",updatedCourse);
        return res.status(200).json({
          success: true,
          message: "SubSection created Successfully",
          data:updatedCourse
        });


    }catch(error){
        console.log("Error in create SubSection =>",error)
        console.log("Error in create SubSection =>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error while creating SubSection",
            error:error.message
        })
    }
}

exports.getAllSubSection = async(req,res,next)=>{
  try {
    const{sectionId} = req.body;
    if(!sectionId){
      return res.status(400).json({
        success:false,
        message:"Please provide the section details"
      })
    }

  let allSubSectionDetails = await Section.findById({_id:sectionId}).populate("SubSection").exec();
  console.log("All subsectionDetails =>",allSubSectionDetails);

  if(!allSubSectionDetails){
    return res.status(400).json({
      success:false,
      message:"No subsection found for this section"
    })
  }else{

    return res.status(200).json({
      success:true,
      message:`All Subsection details for Section Id -${sectionId}`,
      data:allSubSectionDetails
    })
  }


  } catch (error) {
    console.log("Error in getAll SubSection =>", error);
    console.log("Error in getAll SubSection =>", error.message);

    return res.status(500).json({
      success: false,
      message: "Error while creating SubSection",
      error: error.message,
    });
  }
}

exports.updateSubSection = async(req,res,next)=>{
  try {
    const {courseId, sectionId, subSectionId , title, duration, description, videoUrl} = req.body;
    console.log("CourseID =>",courseId)
    console.log("sectionId=>",sectionId)
    console.log("subSectionId =>",subSectionId)
    console.log("title =>",title)
    console.log("duration =>",duration)
    console.log("description =>",description)
    console.log("videoUrl =>",videoUrl)
    if(!subSectionId || !title || !duration || !description){
      return res.status(400).json({
        success:false,
        message:"Please provide all details"
      })
    }
    let uploadedVideo;

    if(!videoUrl){
      let video = req.files.video;
      console.log("VideoURL =>",video);
      uploadedVideo = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
      console.log("Uploaded Video => ",uploadedVideo);
    }
   

   
    let updatedSubSectionDetails = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title,
        timeDuration: duration ? duration : `${uploadedVideo.timeDuration} sec` ,
        description: description,
        videoUrl: videoUrl ? videoUrl : uploadedVideo.secure_url,
      },
      {new:true}
    ).exec();

    if (!updatedSubSectionDetails) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }
    console.log("updatedSubSectionDetails =>", updatedSubSectionDetails);


    // const updatedCourseDetail = await Course.findOneAndUpdate(
    //   { _id: courseId, "courseContent": sectionId }, // Match the sectionId within courseContent
    //   {
    //     $set: {
    //       "courseContent.$.subSection": // Update the subSection array
    //         // Replace the ObjectId with the updated SubSection
    //         updatedSubSectionDetails._id,
    //     },
    //   },
    //   { new: true } // Return the updated course document
    // ).populate({
    //     path: "courseContent",
    //     populate: { path: "subSection" }, // Populate the subSection field to get the details
    //   }).exec();

     


    // const updatedCourseDetail = await Course.findOneAndUpdate(
    //   { _id: courseId, "courseContent.subSection": sectionId },
    //   {$set: {
    //       "courseContent.$.subSection": updatedSubSectionDetails._id, // Modify the subSection array element
    //     }},
    //   {new: true }
    // ).populate({
    //     path: "courseContent",
    //     populate: { path: "subSection" },
    //   }).exec();

    // const updatedCourseDetail = await Course.findOneAndUpdate(
    //   { 
    //     _id: courseId,
    //     "courseContent.subSection": { $elemMatch: { $eq: subSectionId } },
    //   },
    //   {
    //     $set: {
    //       "courseContent.$.subSection.$[elem]": updatedSubSectionDetails._id,
    //     },
    //   },
    //   {
    //     new: true,
    //     arrayFilters: [{ "elem": subSectionId }],
    //   }
    // )
    //   .populate({
    //     path: "courseContent",
    //     populate: { path: "subSection" },
    //   })
    //   .exec();

    const a = await Course.findById(courseId)
    .populate({
      path: 'courseContent', // Populate the `courseContent` array
      populate: { 
        path: 'subSection', // For each section, populate the `subSection` array
        model: 'SubSection'
      }
    })
    .exec();
    console.log("A =>",a)
    const updatedCourseDetail = await Course.findOneAndUpdate(
      { _id: courseId, "courseContent._id": sectionId },
      { $set: { "courseContent.$.subSection": [updatedSubSectionDetails._id] } },
      { new: true }
    )
    .populate({
      path: "courseContent.subSection",
      model: "SubSection"
    })
    .exec();

    console.log("updatedCourseDetail =>", updatedCourseDetail);
    
    

      console.log("updatedCourseDetail  =>",updatedCourseDetail )
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data:a ,
    });

  } catch (error) {
    console.log("Error in edit SubSection =>", error);
    console.log("Error in edit SubSection =>", error.message);

    return res.status(500).json({
      success: false,
      message: "Error while edit SubSection",
      error: error.message,
    });
  }
}

exports.deleteSubSection = async(req,res,next)=>{
  try {
    const {subSectionId,sectionId,courseId} = req.body;
    console.log("SubSectionId =>",subSectionId,"SectionID =>",sectionId," CourseID =>",courseId)
    if(!subSectionId || !sectionId || !courseId){
      return res.status(400).json({
        success:false,
        message:"Please provide all details"
      })
    }

    const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}},{new:true});
    await SubSection.findByIdAndDelete({_id:subSectionId});

    let updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent", 
      populate: {
        path: "subSection",
      },
    }).exec();

    return res.status(200).json({
      success:true,
      message:"SubSection deleted successfully",
      data:updatedCourse
    })

  } catch (error) {
    console.log("Error in delete SubSection =>", error);
    console.log("Error in delete SubSection =>", error.message);

    return res.status(500).json({
      success: false,
      message: "Error while delete SubSection",
      error: error.message,
    });
  }
}
 