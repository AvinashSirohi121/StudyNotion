import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from  "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoCart } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'

const NavBar = () => {

     const {token} = useSelector((state)=>state.auth);
     const {user} = useSelector((state)=>state.profile);
     const {totalItems} = useSelector((state)=>state.cart);




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
                        "":
                        
                        <Link to={links?.path}>
                            <p className={`${matchRoute(links?.path) ? "text-yellow-25":"text-richblack-300"}`}>{links?.title}</p></Link>
                        }
                    </li>
                ))}
            </ul>
        </nav>

        {/* Login / SignUp / Dashboard */}

        <div className="flex gap-x-6 items-center">
                {user && user?.accoutType !== "Instructor" && (
                    <Link to="/dashboard/cart" className="relative">
                        <IoCart />
                        {totalItems > 0 && (
                            <span>{totalItems}</span>
                        )}
                    </Link>
                )}
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
                        <ProfileDropDown/>
                    )
                }
        </div>


        </div>
    </div>
  )
}

export default NavBar