const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

exports.createSubSection = async(req,res,next)=>{
    try{
        // get data
        const {sectionId ,title,timeDuration,description} = req.body;
        const {vidoeFile} = req.files;
        //validation
        if(!sectionId || !title || !timeDuration || !description || !vidoeFile){
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
          timeDuration: timeDuration,
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
        ).populate("SubSection");
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

  let allSubSectionDetails = await Section.findById({_id:sectionId}).populate("SubSection");
  console.log("All sunsectionDetails =>",allSubSectionDetails);

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

exports.editSubSection = async(req,res,next)=>{
  try {
    const {subSectionId , title, timeDuration, description, videoUrl} = req.body;
    if(!subSectionId || !title || !timeDuration || !description || !videoUrl){
      return res.status(400).json({
        success:false,
        message:"Please provide all details"
      })
    }

    let updatedSubSectionDetails = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: videoUrl,
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
    const {subSectionId} = req.body;
    if(!subSectionId){
      return res.status(400).json({
        success:false,
        message:"Please provide subSectionDetails"
      })
    }

    await SubSection.findByIdAndDelete(subSectionId);
    return res.status(200).json({
      success:true,
      message:"SubSection deleted successfully"
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
 