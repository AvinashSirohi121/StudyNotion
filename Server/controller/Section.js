const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course")


exports.createSection = async(req,res,next)=>{
    try{
        //fetch data
        const {sectionName,courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
              succes: false,
              message: "Please provide all details",
            });
        }
        // create section
        let newSection = await Section.create({sectionName});
        // push section id into course
       // TODO use populate to replace section/subsection both in the updatedCourseDetails
        const updatedCourseDetails = await Course.findByIdAndUpdate(
          { _id: courseId },
          { $push: { courseContent :newSection._id} },
          {new:true}
        ).populate({path:"courseContent",populate:{
            path:"subSection"
        }}).exec();

        // const updatedCourseDetails = await Course.findByIdAndUpdate(
        //         courseId,
        //         { $push: { courseContent: newSection._id } },
        //         { new: true }
        //         )
        //         .populate({
        //         path: 'courseContent',  // This is the path of the field to populate
        //         populate: {
        //             path: 'subsections',   // This is the field in the section to populate
        //             model: 'Subsection'    // Ensure you specify the model here
        //         }
        //         })
        //         .populate('courseContent')  // This is for the `section` in `courseContent`
        //         .exec();  // Execute the query





        //return response
        return res.status(200).json({
          success: true,
          message: "Section created successfully",
          data: updatedCourseDetails,
        });

    }catch(error){
        console.log("Error in creating Section =>",error)
        console.log("Error in creating Section =>",error.message);

        return res.status(500).json({
            succes:false,
            message:"Error in creating Section",
            error:error.message
        })
    }
}

exports.updateSection = async(req,res,next)=>{
    try{
        // getData
        const {sectionName,sectionId}= req.body;
        console.log("SectionId =>",sectionId," sectionName =>",sectionName);
        if(!sectionName || !sectionId){
            return res.status(500).json({
                succes:false,
                message:"Please provide All details",
            })
        }
        //update Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName: sectionName },
            { new: true }
          ).populate("subSection")  // This matches the field in the schema
          .exec();
          
          
       
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:updatedSection
        })


    }catch(error){
        console.log("Error in update Section =>",error)
        console.log("Error in update Section =>",error.message);

        return res.status(500).json({
            succes:false,
            message:"Error in update Section",
            error:error.message
        })
    }
}

exports.deleteSection = async(req,res,next)=>{
    try{
        const {sectionId,courseId} = req.body;
        // const {sectionId,courseId}= req.body;
        // console.log("Req body =>",req.body)

        // console.log("SectionID =>",sectionId," CourseID =>",courseId)
        
        if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please share all details"
            })
        }


        await Section.findByIdAndDelete(sectionId);
        let updatedCourseData = await Course.findById(courseId).populate({path:"courseContent",populate:{
            path:"subSection"
        }}).exec();

        return res.status(200).json({
            succes:true,
            message:"Section Deleted successfully",
            data:updatedCourseData
        })

    }catch(error){
        console.log("Error while deleting Section =>",error)
        console.log("Error while deleting Section =>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error while deleting Section",
            error:error.message
        })

    }
}

