import React from 'react'
import { FaUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link, } from 'react-router-dom'
import { IoCart } from "react-icons/io5";

const ProfileDropDown = ({user,totalItem}) => {

    //  console.log("TotalItems =>",totalItem)
    //  console.log("User =>",user) 

  const profileLinks =[
    {
      title:"Dashboard",
      path:"/user/dashboard"
    },
    {
      title:"Forgot Password",
      path:"/user/forgot-password"
    },
    {
      title:"Logout",
      path:"/user/logout"
    },


  ]


  return (
    <div className="">
      <div className="flex gap-5 cursor-pointer  ">
       
        <div className="flex justify-between bg-richblack-800 rounded-full p-1   gap-2 md:hidden sm:hidden lg:flex  w-[20rem]">
          <input className="rounded-full w-[17rem] bg-richblack-900 text-richblack-300 pl-2" placeholder="Search..."/>
          <div className="bg-richblack-900 rounded-full p-1">
            <IoSearch className="text-white text-[20px] hover:scale-[80%] transition-all duration-200 ease-in-out"/>
          </div>
        </div>

        <Link to="/dashboard/cart" className="relative lg:mt-2" >
                        <IoCart className="text-white text-[20px] " />
                        {totalItem > 0 && (
                            <span  className="text-white text-[10px] flex justify-center items-center w-[15px] h-[15px] p-[2px] absolute top-[-8px] right-[-5px] bg-pink-300 rounded-full">{totalItem}</span>
                        )}
        </Link>

        <div className="relative group lg:mt-2 md:mt-[2px]">
        
            <FaUser className="text-white lg:text-[20px]"/>
         

          <div className="invisible absolute right-[-20%] top-[60%] lg:translate-x-[15%] md:translate-x-[10%] translate-y-[30%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 group-hover:visible group-hover:opacity-100 lg:w-[15rem] md:w-[10rem] sm:w-[8rem] text-[14px]">
              <div className="absolute left-[75%] top-[-10%] rotate-45 rounded-sm h-6 w-6 bg-richblack-5"></div>
                  {profileLinks.map((links,index)=>(
                    <div key={index} className="px-3 py-2 border-b-[1px] border-richblack-900">
                      <Link to={links?.path}>{links?.title}</Link>
                    </div>
                  ))}
                </div>
          </div>
        </div>
      
    </div>
  )
}

export default ProfileDropDown