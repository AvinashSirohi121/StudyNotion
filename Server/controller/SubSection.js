const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

require('dotenv').config();

exports.createSubSection = async(req,res,next)=>{
    try{
        // get data
        const {sectionId ,title,description} = req.body;
        const vidoeFile = req?.files?.videoFile;
        //validation
        console.log("SectionId =>",sectionId," Title =>",title," Description =>",description);
        console.log("VideoFile =>",req.files)
        console.log("VideoFile =>",req.files.videoFile)
        console.log("VideoFile =>",vidoeFile)
        if(!sectionId || !title  || !description || !vidoeFile){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // upload video to Cloudinary
        let videoDetails = await uploadImageToCloudinary(
          vidoeFile,
          process.env.FOLDER_NAME,

        );
        console.log("Video Details =>",videoDetails);
        // create subsection
        const subSectionDetails = await SubSection.create({
          title: title,
          timeDuration: `${videoDetails.timeDuration}`,
          description: description,
          videoUrl:videoDetails.secure_url
        });
        console.log("subSectionDetails",subSectionDetails);
        // update Section
       // TODO populate both section and SubSection data
        let updatedSection = await Section.findByIdAndUpdate(
          { _id: sectionId },
          { $push: { subSection: subSectionDetails._id} },
          {new:true}
        ).populate({path:"SubSection",strictPopulate: false}).exec();
        //return response

        console.log("UpdatedSection ->",updatedSection);
        return res.status(200).json({
          success: true,
          message: "SubSection created Successfully",
          data: updatedSection,
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
    const {subSectionId , title, timeDuration, description, videoUrl} = req.body;
    if(!subSectionId || !title || !timeDuration || !description){
      return res.status(400).json({
        success:false,
        message:"Please provide all details"
      })
    }

    if(!videoUrl){
      videoUrl = req.files.video;
    }
    console.log("VideoURL =>",videoUrl);

    let uploadVideo = await uploadImageToCloudinary(videoUrl,process.env.FOLDER_NAME)
    console.log("Uploaded Video => ",uploadVideo);
    let updatedSubSectionDetails = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title,
        timeDuration: `${uploadVideo.timeDuration}`,
        description: description,
        videoUrl: uploadVideo.secure_url,
      },
      {new:true}
    );

    console.log("updatedSubSectionDetails =>", updatedSubSectionDetails);

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSubSectionDetails,
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
    const {subSectionId,sectionId} = req.body;
    if(!subSectionId || sectionId){
      return res.status(400).json({
        success:false,
        message:"Please provide subSectionDetails"
      })
    }

    const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}},{new:true});
    await SubSection.findByIdAndDelete({_id:subSectionId});

    return res.status(200).json({
      success:true,
      message:"SubSection deleted successfully",
      data:updatedSection
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
 