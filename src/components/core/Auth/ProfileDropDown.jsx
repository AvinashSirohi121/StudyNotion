import React , {useState} from 'react'
import { FaUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link, } from 'react-router-dom'
import { IoCart } from "react-icons/io5";
import { useSelector } from 'react-redux';
import SideMenu from '../../common/SideMenu';

const ProfileDropDown = ({user,totalItem}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for SideMenu

  // Toggle menu function
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  return (
    <div className="">
      <div className="flex gap-5 cursor-pointer  ">
       
        <div className="flex justify-between bg-richblack-800 rounded-full p-1   gap-2 md:hidden sm:hidden lg:flex  w-[20rem]">
          <input className="rounded-full w-[17rem] bg-richblack-900 text-richblack-300 pl-2" placeholder="Search..."/>
          <div className="bg-richblack-900 rounded-full p-1">
            <IoSearch className="text-white text-[20px] hover:scale-[80%] transition-all duration-200 ease-in-out"/>
          </div>
        </div>

       
                  {user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className="relative">
                         <IoCart className="text-white text-[20px] lg:mt-2 md:mt-1 " />
                        {totalItem > 0 && (
                            <span  className="text-white text-[10px] flex justify-center items-center w-[15px] h-[15px] p-[2px] absolute lg:top-[0px] md:top-[-3px] right-[-5px] bg-pink-300 rounded-full">{totalItem}</span>
                        )}
                    </Link>
                )}
                      {/* <IoCart className="text-white text-[20px] " />
                        {totalItem > 0 && (
                            <span  className="text-white text-[10px] flex justify-center items-center w-[15px] h-[15px] p-[2px] absolute top-[-8px] right-[-5px] bg-pink-300 rounded-full">{totalItem}</span>
                        )} */}
     

        <div className="relative group lg:mt-1 md:mt-[2px]" onClick={toggleMenu}>
            {user && user?.image ? 
            <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[30px] rounded-full object-cover"
        /> :  <FaUser className="text-white lg:text-[20px]"/>}
           
         
           <SideMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          {/* <div className="invisible absolute right-[-20%] top-[60%] lg:translate-x-[15%] md:translate-x-[10%] translate-y-[30%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 group-hover:visible group-hover:opacity-100 lg:w-[15rem] md:w-[10rem] sm:w-[8rem] text-[14px]">
              <div className="absolute left-[75%] top-[-10%] rotate-45 rounded-sm h-6 w-6 bg-richblack-5"></div>
                  {profileLinks.map((links,index)=>(
                    <div key={index} className="px-3 py-2 border-b-[1px] border-richblack-900">
                      <Link to={links?.path}>{links?.title}</Link>
                    </div>
                  ))}
                </div> */}
          </div>
        </div>
      
    </div>
  )
}

export default ProfileDropDown