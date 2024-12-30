import React from "react";
import { NavLink, useLocation } from "react-router-dom";


const Sidebar = () => {

  const location = useLocation()
    return (
      <div className=" bg-[#ffffff] border-x-2 h-screen  w-[35rem] justify-between flex flex-col  p-8 ">
        <div className="">
          <h1 className="text-[3.5rem] font-extrabold  ">TestDRM</h1>
  
          <div className="flex mt-16 flex-col gap-5">
            <NavLink
              to="/uploadVideo"
              style={{
                backgroundColor:
                  location.pathname === '/uploadVideo' ? '#399db6' : null,
              }}
              className="text-[1.5rem]  font-medium flex items-center bg-[#e0f1f5] hover:bg-[#b4ecf9] justify-between px-8 rounded-full  h-20 w-full"
            >
              <button> Upload </button>{" "}
              {/* <span className="text-[1.8rem]">+</span> */}
            </NavLink>
            <NavLink
             style={{
              backgroundColor:
                location.pathname === '/VideoList' ? '#399db6' : null,
            }}
              to="/VideoList"
              className="text-[1.5rem] font-medium flex items-center bg-[#e0f1f5] hover:bg-[#b4ecf9] active:bg-[#399db6] justify-between px-8 rounded-full h-20 w-full"
            >
              <button className=""> VideoList </button>
            </NavLink>
            {/* <NavLink className="text-[1.5rem] font-medium flex items-center justify-between  hover:bg-[#EBF4F6] px-8 rounded-full h-20 w-full">
              <button> Template </button>
            </NavLink> */}
            {/* <NavLink
              to="/allvideo"
              className="text-[1.5rem] font-medium flex items-center justify-between px-8  hover:bg-[#EBF4F6] rounded-full  h-20 w-full"
            >
              <button> All Videos </button>
            </NavLink> */}
          </div>
        </div>
        {/* <div className="flex item-center  justify-center p-4 rounded-full cursor-pointer hover:bg-slate-200  gap-2 text-[1.8rem] bg-slate-300 font-semibold ">
          Logout
          <span className="text-[3rem]  mt-2">
            <TbLogout />
          </span>
        </div> */}
      </div>
    );
  };
  
  export default Sidebar;