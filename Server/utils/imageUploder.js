const cloudinary = require('cloudinary').v2;



exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
  console.log("Inside uploadImageToCloudinary")
  
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    console.log("File =>",file)
    console.log("File TempPath =>",file.tempFilePath)
    console.log("Folder =>",folder)
    console.log("File options =>",options)

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}