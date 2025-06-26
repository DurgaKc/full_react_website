import React, { useEffect, useState, useRef } from "react";
import {Paper, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open

  const aboutRef = useRef(null); // Dropdown content ref
  const aboutBtnRef = useRef(null); // Button ref
  const contentsRef = useRef(null);
  const contentsBtnRef = useRef(null);
  

   const navLinks = [
    { href: "/program", label: "Programs" },
    { href: "/report", label: "Reports" },
    { href: "/news", label: "News and Events" },
    { href: "/downloads", label: "Downloads" },
    { href: "/curriculum", label: "Curriculum" },
    { href: "/gallery", label: "Gallery" },
    { href: "/navbaradmin", label: "Contact Us" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (openDropdown === "about" &&
          aboutRef.current &&
          !aboutRef.current.contains(event.target) &&
          !aboutBtnRef.current.contains(event.target)) ||
        (openDropdown === "contents" &&
          contentsRef.current &&
          !contentsRef.current.contains(event.target) &&
          !contentsBtnRef.current.contains(event.target))
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <Grid>
      {/* Top Navbar with logo, center text, and flag */}
      <Box className="nav flex flex-col md:flex-row items-center text-center w-full pt-3 pb-1 ">
        
        {/* Logo Left */}
        <div className="logo w-40 ml-18">
          <img src="/tulogo.png" className="h-30 w-36" alt="TU Logo" />
        </div>

        {/* Center Text */}
        <div className="campus-address mx-auto dark:text-sky-700 text-center">
          <p className="lg:text-xs">त्रिभुवन विश्वविद्यालयबाट सम्बन्धन प्राप्त</p>
          <p className="lg:text-xs">Affiliated to Tribhuwan University</p>
          <h2 className="font-bold text-lg">महेन्द्र बहुमुखी क्याम्पस</h2>
          <h2 className="font-bold text-lg">MAHENDRA MULTIPLE CAMPUS</h2>
          <p className="lg:text-xs">नेपालगञ्ज, बाँके</p>
          <p className="lg:text-xs">Nepalgunj, Banke</p>
        </div>

        {/* Flag Right (Hidden on mobile) */}
        <div className="flag h-29 mr-18 hidden md:block">
          <img src="/flag.gif" className="h-26 w-30" alt="Nepal Flag" />
        </div>
      </Box>

      {/* Nav Links with Hamburger Menu */}
      <Grid className="nav-links px-4 py-2 flex flex-col md:flex-row items-start md:items-center dark:bg-sky-700 text-white">
        
        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden mb-2">
          {isMenuOpen ? (
            <IoMdClose className="size-6" />
          ) : (
            <GiHamburgerMenu className="size-6" />
          )}
        </button>

        {/* Navigation Links */}
        <ul className={`flex-col md:flex md:flex-row ${isMenuOpen ? "flex" : "hidden"} md:gap-6`}>
          
          <li>
            <Link to="/"
              className="mr-2 hover:text-orange-500 ml-10 cursor-pointer"
            >Home</Link>
          </li>

          {/* About Dropdown */}
          <li className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === "about" ? null : "about")
              }
              ref={aboutBtnRef}
              className="inline-flex items-center hover:text-orange-500"
            >
              About Us <RiArrowDropDownLine className="text-2xl ml-1" />
            </button>

            {openDropdown === "about" && (
              <div
                ref={aboutRef}
                className="absolute z-10 mt-2 w-32 bg-white shadow-lg rounded dark:bg-sky-700 text-black dark:text-white"
              >
                <Link to="/introduction" className="block px-4 py-2 hover:text-orange-500">
                  Introduction
                </Link>
                <Link to="/team" className="block px-4 py-2 hover:text-orange-500">
                  Our Team
                </Link>
                <Link to="/faq" className="block px-4 py-2 hover:text-orange-500">
                  FAQ
                </Link>
              </div>
            )}
          </li>
          {/* contents dropdown */}
          <li className="relative ">
            <button
            type="button"
            className="inline-flex items-center hover:text-orange-500"
            onClick={()=>
              setOpenDropdown(openDropdown === 'contents' ? null : "contents")
            } ref={contentsBtnRef}
            >
               Contents <RiArrowDropDownLine className="text-2xl mr-8 " />
            </button>
            {openDropdown === 'contents' && (
              <div
                className="absolute z-10 mt-2 w-32 dark:bg-sky-700 font-normal text-white"
                to={contentsRef}
              >
                <Link
                  to="/publication"
                  className="block pl-4 pb-0.5 text-base hover:text-orange-500"
                >
                  Publication
                </Link>

                <Link
                  to="/notice"
                  className="block px-4 py-0.5 text-base hover:text-orange-500"
                >
                  Notices
                </Link>
              </div>
            )}
          </li>
          {navLinks.map((link, index)=>(
              <li key={index}>
                <Link to={link.href} className=" mr-3 hover:text-orange-500">
                {link.label}
                </Link>
              </li>
          ))}
          <li className="flex items-center hover:text-black cursor-pointer">
            <IoPerson className="mt-1 mr-1" />
            <Link to="/login" className="mr-8">
              Login
            </Link>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default Navbar;
