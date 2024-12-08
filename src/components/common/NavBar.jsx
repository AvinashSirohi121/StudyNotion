import React, {useState, useEffect} from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from  "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector, } from 'react-redux'
import { IoCart } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import {apiConnector} from "../../services/apiconnector"
import {categories} from "../../services/api"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const NavBar = () => {

     const {token} = useSelector((state)=>state.auth);
     const {user} = useSelector((state)=>state.profile);
     const {totalItems} = useSelector((state)=>state.cart);
    //  console.log("Token =>",token)
    //  console.log("TotalItems =>",totalItems)
    //  console.log("User =>",user)
     useEffect(()=>{

     },[user,token])

    //  const sublink = [
    //     {
    //         title:"Python",
    //         path:"/catalog/python"
    //     },
    //     {
    //         title:"Web Development",
    //         path:"/catalog/web-developement"
    //     },
    //  ]
     const [sublinks,setSublinks] = useState([]);

    const fetchSubLinks = async()=>{
        try {
            const result = await apiConnector("GET",categories.CATEGORIES_API);
           // console.log("Printing sublinks result =>",result);
            //console.log("Printing sublinks result =>",result.data);
            setSublinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list");
        }
    }
    useEffect(()=>{
        fetchSubLinks()
    },[])


    const location = useLocation();
    const matchRoute =(route)=>{
        return matchPath({path:route},location.pathname)
    }
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700">
        <div className="w-11/12 flex max-w-maxContent items-center justify-between">
        
        {/* {Logo Image} */}
        <Link to="/">
            <img src={Logo} width={160} height={80}  alt="Logo" loading="lazy"/>
        </Link>

        {/* NavbarLinks */}
        <nav>
            <ul className="flex gap-x-6 text-richblack-25">
               { NavbarLinks.map((links,index)=>(
                    <li key={index}>
                        {links?.title === "Catalog" ? 
                        <div className="cursor-pointer group relative">
                           <span className="flex items-center"> 
                                <p>{links?.title}</p>
                                <MdOutlineKeyboardArrowDown className="text-[20px] mt-[3px]"/> 
                            </span>
                            <div className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[15rem] md:w-[10rem] sm:w-[8rem] text-[14px]">
                                  <div className="absolute left-[55%] top-[-10%] rotate-45 rounded-sm h-6 w-6 bg-richblack-5"></div>
                                    {sublinks?.map((links,index)=>(
                                        <div className="px-3 py-2 border-b-[1px] border-richblack-900" key={index}><Link to={links?.path}>{links?.name}</Link></div>
                                    ))}
                            </div>
                        </div>:
                        
                        <Link to={links?.path}>
                            <p className={`${matchRoute(links?.path) ? "text-yellow-25":"text-richblack-300"}`}>{links?.title}</p></Link>
                        }
                    </li>
                ))}
            </ul>
        </nav>

        {/* Login / SignUp / Dashboard */}

        <div className="flex gap-x-6 items-center"> 
                {/* {user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className="relative">
                        <IoCart />
                        {totalItems > 0 && (
                            <span>{totalItems}</span>
                        )}
                    </Link>
                )} */}
                {
                    token ==null && (
                        <Link to="/login">
                             <button className="border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md" >Login</button>
                        </Link>
                    )
                }
                {
                    token ==null && (
                        <Link to="/signup">
                            <button className="border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md" >Signup</button>
                        </Link>
                    )
                }
                {
                    token  !==null && ( 
                        <ProfileDropDown user={user} totalItem={totalItems}/>
                    )
                }
        </div>


        </div>
    </div>
  )
}

export default NavBar