import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { IoCart } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";



const profileLinks = [
  { title: "Dashboard", path: "/dashboard/my-profile", icon:'VscDashboard' },
  { title: "Cart", path: "/dashboard/cart" ,icon:"IoCart"},
  { title: "Forgot Password", path: "/dashboard/forgot-password",icon:'RiLockPasswordFill' },
  { title: "Logout", path: "/dashboard/logout",icon:"VscSignOut" }
];

const iconComponents = {
  VscDashboard: VscDashboard,
  IoCart: IoCart,
  RiLockPasswordFill: RiLockPasswordFill,
  VscSignOut: VscSignOut,
};


const SideMenu = ({ isOpen, setIsOpen }) => {

  const menuRef = useRef();

  // Close the menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setIsOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-[20%] z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Side Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-1/5 h-full bg-richblack-800 z-50  text-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="p-5">
          <h2 className="text-2xl font-semibold mb-5">Menu</h2>
          <ul>
          {profileLinks.map((link, index) => {
                  const Icon = iconComponents[link.icon];
                  return (
                    <li key={index} className="hover:text-pink-1000 flex items-center gap-x-2">
                      {Icon && <Icon className="text-lg mr-2" />}
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)} // Close menu on link click
                        className="block p-3 rounded-md text-gray-800 hover:bg-gray-200"
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                })}

          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
