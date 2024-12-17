import React from 'react'

import {sidebarLinks} from "../../data/dashboard-links"
import {logout} from "../../services/operations/authMethods";
import { useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { VscSettingsGear } from 'react-icons/vsc';
import { BsCart4 } from "react-icons/bs";

const LeftPanal = () => {

    const {user , loading :profileLoading} = useSelector((state)=>state.profile)
    const {loading :authLoading} = useSelector((state)=>state.auth)
  //  console.log("user in LeftPanal =",user,profileLoading,authLoading);
  
    if (profileLoading || authLoading) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

    return (
    <div className=''>
        <div className='flex lg:flex md:flex lg:min-w-[14rem] md:max-w-[10rem] sm:hidden  flex-col border-r-[1px] border-r-richblack-700 h-full bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType !== link?.type) return null;
                    return (
                     
                       <SidebarLink key={link.id} link={link} iconName={link.icon} />
 
                    )
                })}
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
            <div className='flex flex-col'>
           
              <SidebarLink  
                link={{name:"Settings",path:"/dashboard/settings"}} 
                iconName="VscSettingsGear" />
              <SidebarLink  
                link={{name:"Logout",path:"/dashboard/logout"}} 
                iconName="VscSignOut" />
 
            </div>
        </div>
       
    </div>
  )
}

export default LeftPanal