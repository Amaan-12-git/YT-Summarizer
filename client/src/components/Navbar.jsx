import React, { use } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const onChange = () => {
    setNav(!nav);
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth check response:", data);
        setLoggedIn(data.loggedIn);
      })
      .catch((err) => console.error("Auth check failed:", err));
  }, []);
  const handleLogout = () => {
    fetch("http://localhost:3000/logout/", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setLoggedIn(false);
      navigate("/");
    });
  };
  return (
    <nav className="bg-black p-4">
      <div className="container md:mx-auto sm:mx-[3vw] mx-[1.5vw] flex justify-between items-center">
        <h2 className="text-gray-200 text-2xl font-bold z-50">Project</h2>
        <div className="hidden md:block space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 cursor-pointer px-6 py-2 text-gray-300 font-semibold opacity-75 rounded-md border border-white-900 bg-gradient-to-r from-bg-[oklch(0.45_0.02_266.4)] to-bg-[#424040] backdrop-blur-sm shadow-inner hover:text-white hover:backdrop-opacity-100 transition duration-300"
            >
              Log out
            </button>
          ) : (
            <Link to="/signup">
              {" "}
              <button className="ml-4 cursor-pointer px-6 py-2 text-gray-300 font-semibold opacity-75 rounded-md border border-white-900 bg-gradient-to-r from-bg-[oklch(0.45_0.02_266.4)] to-bg-[#424040] backdrop-blur-sm shadow-inner hover:text-white hover:backdrop-opacity-100 transition duration-300">
                Sign Up
              </button>
            </Link>
          )}
        </div>
        <div
          className="z-50 cursor-pointer text-gray-300 md:hidden hover:text-white"
          onClick={onChange}
        >
          {nav ? (
            <AiOutlineClose size={20} onClick={onChange} />
          ) : (
            <AiOutlineMenu size={20} onClick={onChange} />
          )}
        </div>
        <div
          className={
            nav
              ? "fixed z-40 top-0 left-0 bg-black w-[100%] h-auto flex flex-col  space-y-6 pt-20 md:hidden px-[6vw] pb-[2vh] justify-center ease-in-out duration-300"
              : "fixed top-[-100%]"
          }
        >
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="w-[110px] cursor-pointer px-6 py-2 text-gray-300 font-semibold opacity-75 rounded-md border border-white-900 bg-gradient-to-r from-bg-[oklch(0.45_0.02_266.4)] to-bg-[#424040] backdrop-blur-sm shadow-inner hover:text-white hover:backdrop-opacity-100 transition duration-300"
            >
              Log out
            </button>
          ) : (
            <Link to="/signup">
              <button className="w-[110px] cursor-pointer px-6 py-2 text-gray-300 font-semibold opacity-75 rounded-md border border-white-900 bg-gradient-to-r from-bg-[oklch(0.45_0.02_266.4)] to-bg-[#424040] backdrop-blur-sm shadow-inner hover:text-white hover:backdrop-opacity-100 transition duration-300">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
