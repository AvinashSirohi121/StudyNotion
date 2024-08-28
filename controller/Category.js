const Category = require("../models/Category");

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }
    // create entry in DB

    let categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log("Category Details =>", categoryDetails);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: categoryDetails,
    });
  } catch (error) {
    console.log("Error in create Category =>", error);
    console.log("Error in create Category =>", error.message);
    return res.status(500).json({
      success: false,
      message: "Error while creating category",
      error: error.message,
    });
  }
};

exports.showAllCategory = async (req, res, next) => {
  try {

    let allCategory = await Category.find({},{name:true,description:true});
    
        return res.status(200).json({
          success: true,
          message: "All Category Data returned successfully",
          data: allCategory,
        });
    
  } catch (error) {
    console.log("Error in showAllCategory =>", error);
    console.log("Error in showAllCategory =>", error.message);
    return res.status(500).json({
      success: false,
      message: "Error while showAllCategory",
      error: error.message,
    });
  }
};


exports.categoryPageDetails = async(req,res)=>{
  try {

     const {categoryId} = req.body;
     // get courses for selected categoryId
     const selectedCategoryCourses = await Category.findById(categoryId).populate("courses").exec();
     console.log("Selected Category Courses =>",selectedCategoryCourses);

     if(!selectedCategoryCourses){
      return res.status(404).json({
        success:false,
        message:"Unable to find courses for the selected category"
      })
     }


     // get courses for some other categories
     const differentCategoryCourses = await Category.find({_id:{ne:categoryId}}).populate("courses").exec();
     console.log("DifferentCategoryCourses =>",differentCategoryCourses)

     // how to find top selling courses

     return res.status(200).json({
      success:true,
      message:"Category Course Data",
      data:{
        selectedCategoryCourses,
        differentCategoryCourses
      }
     })

    
  } catch (error) {
    console.log("Error in Category Page Details =>",error)
    console.log("Error in Category Page Details =>",error.message);

    return res.status(500).json({
      success:false,
      message:"Error in category page Details",
      error:error.message
    })
  }
}
