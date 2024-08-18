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
        ).populate("section");

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
        const {newSectionName,sectionId}= req.body;
        if(!newSectionName || !sectionId){
            return res.status(500).json({
                succes:false,
                message:"Please provide All details",
            })
        }
        //update Section
        let updatedSection = await Section.findByIdAndUpdate(
          { _id: sectionId },
          { sectionName: newSectionName },
          {new:true}
        );
       
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
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

exports.deleteSection = async(req,res)=>{
    try{
        const {sectionId} = req.body;
        
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please share sectionId"
            })
        }

        await Section.findByIdAndDelete(sectionId);

    }catch(error){
        console.log("Error while deleting Section =>",error)
        console.log("Error while deleting Section =>",error.message)

        return res.status(400).json({
            success:false,
            message:"Error while deleting Section"
        })

    }
}