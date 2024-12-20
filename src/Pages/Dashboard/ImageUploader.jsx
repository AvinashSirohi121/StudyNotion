import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../components/Dashboard/Iconbtn';
import User from "../../assets/Images/user.png"
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../services/operations/profileMethods';

const ImageUploader = () => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const [userImage,setUserImage]= useState("");
    const [previewSource, setPreviewSource] = useState(null)
    const [imageLoading,setImageLoading] = useState(false);

    useEffect(()=>{
      if(userImage){
        previewFile(userImage)
      }
    },[userImage])

    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserImage(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }

    const uploadImage =()=>{
      if(userImage){
        setImageLoading(true);
        const formData = new FormData();
        formData.append('displayPicture',userImage);
       // console.log("FormData =>",formData);
        dispatch(updateDisplayPicture(formData,token))
        setUserImage("")
        setImageLoading(false);
      }
       
    }
  return (
    <div className='flex  mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 justify-between items-center border-[1px] border-richblack-600'>
          <div className='flex gap-4 w-[80%]  items-center px-4'>
            {userImage ? 
            <img src={URL.createObjectURL(userImage)} alt="User Images" 
            className='h-[5rem] w-[5rem] rounded-full '/>
            : 
            <img src={user?.image ?user?.image : User} alt="User Images" 
          className='h-[5rem] w-[5rem] rounded-full'/>}
          

          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Change Profile Photo</p>
            <p className='text-richblack-400 flex gap-3'>
            <label
                htmlFor="file-upload"
                className=' cursor-pointer flex text-white bg-richblack-700 border-[1px] border-richblack-500 gap-3 justify-center items-center p-2 rounded-lg w-[6rem] h-[2.5rem] font-bold leading-3'
              >
                Select
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                 accept="image/png, image/gif, image/jpeg"
              />
                <IconBtn 
                text={imageLoading ? "Uploading...":"Upload"}
                onclick={uploadImage}
                >
                  {!imageLoading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}</IconBtn> 
           </p>
           
          </div>
          </div>

          

         
        </div>
  )
}

export default ImageUploader