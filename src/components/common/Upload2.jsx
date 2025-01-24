import React, { useState, useRef, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IoCloudUpload } from "react-icons/io5";
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";

const Upload2 = ({ title, setMediaPath, type, editCourse, mediaPath }) => {
  const [media, setMedia] = useState(""); // This will hold the media File or URL
  const [isMediaSelected, setIsMediaSelected] = useState(false); // Track if user selected new media
  const [isEdit, setIsEdit] = useState(false); // Track if editing existing media

  const mediaRef = useRef(null);

  const mediaUploader = () => {
    mediaRef.current.click();
  };

  const mediaUploadHandle = (e) => {
    const file = e.target.files && e.target.files[0];
    //console.log("File =>", file, " FileType =>", file?.type);

    if (file && ((type === "image" && file.type.startsWith("image/")) || (type === "video" && file.type.startsWith("video/")))) {
      setMedia(file);
      setMediaPath(file); // Store the file in mediaPath
      setIsMediaSelected(true);
      setIsEdit(false); // Set isEdit to false when selecting new media
    } else {
      toast.error(`Selected file is not a valid ${type}.`, { duration: 3000 });
    }
  };

  const removeMedia = (e) => {
    e.stopPropagation();
    console.log("Removing media");
    setMedia("");
    setMediaPath(""); // Reset the media path as well
  };

  useEffect(() => {
    if (mediaPath && !isMediaSelected) {
     // console.log("Inside Upload - MediaPath =>", mediaPath, " TypeOf =>", typeof mediaPath);

      if (mediaPath && typeof mediaPath === "string") {
        // If mediaPath is a URL (when editing), set it directly
        setMedia(mediaPath);
        setIsEdit(true); // Mark as editing since we are using an existing media URL
      } else {
        // If it's a File object, don't set media path here; just use it directly
        setMedia(mediaPath);
        setIsEdit(false);
      }
    }
  }, [mediaPath, isMediaSelected]);

  return (
    <div className='flex flex-col mt-4'>
      <label className='flex tracking-wider text-sm'>{title} <AiFillStar className='text-[5px] ml-2 text-pink-1000' /></label>
      <div
        onClick={() => mediaUploader()}
        className={`relative cursor-pointer ${type=="image" ? "h-[15rem]" :"h-[18rem] pb-2" } text-richblack-400 flex flex-col justify-center items-center bg-richblack-800 mt-2 rounded-xl border-dotted border-richblack-400 border-[2px]`}
      >
        {media ? (
          <>
            {type === "image" ? (
              <img
                className='h-[100%] w-[100%] object-contain'
                src={!isEdit ? URL.createObjectURL(media) : media} // Only use createObjectURL for new media
                alt="UploadedMedia"
              />
            ) : (
              <video
                className='h-[100%] w-[100%] object-contain'
                controls
                src={!isEdit ? URL.createObjectURL(media) : media} // Only use createObjectURL for new media
              />
            )}
            <MdCancel
              onClick={(e) => removeMedia(e)}
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
              {type === "video" && (
                <>
                  <p>• Recommended format: MP4</p>
                  <p>• Maximum size: 100MB</p>
                </>
              )}
            </div>
          </>
        )}
        <input
          type="file"
          ref={mediaRef}
          onChange={(e) => mediaUploadHandle(e)}
          className='hidden'
          accept={type === "image" ? "image/*" : "video/*"}
        />
      </div>
    </div>
  );
};

export default Upload2;
