import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../components/Dashboard/Iconbtn';
import User from "../../assets/Images/user.png"

const ImageUploader = () => {
    const {user} = useSelector((state)=>state.profile);
    console.log("User in imageuploader =>",user?.user)
    const [userImage,setUserImage]= useState("");
    const [imageLoading,setImageLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserImage(file)
        }
    }

    const uploadImage =()=>{
        setImageLoading(true);
        
        setImageLoading(false);
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
                ></IconBtn> 
           </p>
           
          </div>
          </div>

          

         
        </div>
  )
}

export default ImageUploader