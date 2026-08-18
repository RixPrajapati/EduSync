import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navMenu } from "../constants/routes";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <header className="shadow-2xl mx-4 my-2 ">
        <div className=" mx-auto px-4 py-3 flex justify-between items-center gap-5">
          {/* logo section */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <i className="ri-graduation-cap-line text-2xl"></i>
              <h1 className="text-blue-800 pl-1 text-2xl font-bold">EduSync</h1>
            </div>
            {/* menu button */}
            <div>
              <button onClick={handleClick} className="text-3xl md:hidden">
                <i className={open ? "ri-close-line" : "ri-menu-line"}></i>
              </button>
            </div>
          </div>

          {/* nav section */}
          <div className="mr-4">
            <nav
              className={` ${open ? "flex" : "hidden"}  w-full flex-col mt-4 bg-gray-100 p-2 md:flex md:flex-row md:mt-0 md:bg-transparent md:gap-6`}
            >
              {navMenu.map((menu) => {
                return (
                  <Link to={menu.route} key={menu.label}>
                    {menu.label}
                  </Link>
                );
              })}

              <button onClick={handleLogout} className="text-red-400 p-2 shadow-2xl bg-gray-200 rounded-2xl whitespace-nowrap ">
                Sign out
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
