import React, { useState, useRef, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IoCloudUpload } from "react-icons/io5";
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";

const Upload = ({ title, setImagepath, type, editCourse, imagePath }) => {
  const [courseImage, setCourseImage] = useState(""); // This will hold the image File or URL
  const [isImageSelected, setIsImageSelected] = useState(false); // Track if user selected a new image
  const [isEdit, setIsEdit] = useState(false); // Track if editing course image

  const imageRef = useRef(null);

  const imageUploader = () => {
    imageRef.current.click();
  }

  const imageUploadHandle = (e) => {
    const file = e.target.files && e.target.files[0];
    console.log("File =>", file, " FileType =>", file?.type);

    if (file && file.type.startsWith("image/")) {
      setCourseImage(file);
      setImagepath(file); // Store the file in imagePath
      setIsImageSelected(true);
      setIsEdit(false); // Set isEdit to false when selecting a new image
    } else {
      toast.error("Selected file is not an image.", { duration: 3000 });
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    console.log("Removing image");
    setCourseImage("");
    setImagepath(""); // Reset the image path as well
  };

  useEffect(() => {
    if (imagePath && !isImageSelected) {
      console.log("Inside Upload - ImagePath =>", imagePath, " TypeOd =>",typeof imagePath);

      if (imagePath && typeof imagePath === "string") {
        // If imagePath is a URL (when editing the course), set it directly
        setCourseImage(imagePath);
        setIsEdit(true); // Mark as editing since we are using an existing image URL
      } else {
        // If it's a File object, don't set image path here; just use it directly
        setCourseImage(imagePath);
        setIsEdit(false);
      }
    }
  }, [imagePath, isImageSelected]);

  return (
    <div className='flex flex-col mt-4'>
      <label className='flex tracking-wider text-sm'>{title} <AiFillStar className='text-[5px] ml-2 text-pink-1000' /></label>
      <div
        onClick={() => imageUploader()}
        className='relative cursor-pointer h-[15rem] text-richblack-400 flex flex-col justify-center items-center bg-richblack-800 mt-2 rounded-xl border-dotted border-richblack-400 border-[2px]'
      >
        {courseImage ? (
          <>
            <img
              className='h-[100%] w-[100%] object-contain'
              src={!isEdit ? URL.createObjectURL(courseImage): courseImage} // Only use createObjectURL for new images
              alt="CourseImage"
            />
            <MdCancel
              onClick={(e) => removeImage(e)}
              className='absolute top-0 right-0 hover:text-pink-1000 text-richblack-50 text-3xl'
            />
          </>
        ) : (
          <>
            <IoCloudUpload className='text-[5rem] text-yellow-25 bg-yellow-700 rounded-full p-3' />
            <p>{type === "image" ? "Drag and drop an image, or" : "Drag and drop a video, or"}</p>
            <div className='flex gap-2'>click to <p className='text-yellow-50'>Browse</p> a file</div>
            <div className='flex mt-5 text-xs gap-7'>
              {type === "image" && (
                <>
                  <p>• Aspect ratio 16:9</p>
                  <p>• Recommended size 1024x576</p>
                </>
              )}
            </div>
          </>
        )}
        <input
          type="file"
          ref={imageRef}
          onChange={(e) => imageUploadHandle(e)}
          className='hidden'
          accept={type === "image" ? "image/*" : undefined}
        />
      </div>
    </div>
  );
}

export default Upload;
