import { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toast } from "react-toastify";
import ThemeToggle from "../ThemeToggle";

const NavbarAdmin = () => {  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Refs for dropdowns
  const academicRef = useRef(null);
  const academicBtnRef = useRef(null);
  const contentsRef = useRef(null);
  const contentsBtnRef = useRef(null);
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null);

  const navLinks = [
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Team" },
    { href: "/feedbacks", label: "Feedbacks" },
    { href: "/downloads", label: "Downloads" },
    { href: "/faq", label: "FAQs" },
    { href: "/externallinks", label: "External Links" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (openDropdown === "academic" &&
          academicRef.current &&
          !academicRef.current.contains(event.target) &&
          !academicBtnRef.current.contains(event.target)) ||
        (openDropdown === "contents" &&
          contentsRef.current &&
          !contentsRef.current.contains(event.target) &&
          !contentsBtnRef.current.contains(event.target)) ||
        (openDropdown === "profile" &&
          profileRef.current &&
          !profileRef.current.contains(event.target) &&
          !profileBtnRef.current.contains(event.target))
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

   const navigate = useNavigate();
  const handleLogout =  () =>{
    localStorage.clear();
    toast.success('Successfully logged out', { autoClose: 300 });
    setTimeout(()=>{
      navigate('/login');
    }, 500);
  }
  return (
    <Grid>
      {/* Top Navbar */}
      <Box className="nav flex flex-col md:flex-row items-center text-center w-full pt-3 pb-1">
        <div className="logo w-40 ml-18">
          <img src="/tulogo.png" className="h-30 w-36" alt="TU Logo" />
        </div>

        <div className="campus-address mx-auto dark:text-sky-700 text-center">
          <p className="lg:text-xs">त्रिभुवन विश्वविद्यालयबाट सम्बन्धन प्राप्त</p>
          <p className="lg:text-xs">Affiliated to Tribhuwan University</p>
          <h2 className="font-bold text-lg">महेन्द्र बहुमुखी क्याम्पस</h2>
          <h2 className="font-bold text-lg">MAHENDRA MULTIPLE CAMPUS</h2>
          <p className="lg:text-xs">नेपालगञ्ज, बाँके</p>
          <p className="lg:text-xs">Nepalgunj, Banke</p>
        </div>

        <div className="flag h-24 mr-18 hidden md:block">
          <img src="/flag.gif" className="h-26 w-30" alt="Nepal Flag" />
        </div>
      </Box>

      {/* Navigation Links */}
      <Grid className="nav-links px-4 py-2 flex flex-col md:flex-row items-start md:items-center dark:bg-sky-700 text-white">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden mb-2">
          {isMenuOpen ? <IoMdClose className="size-6" /> : <GiHamburgerMenu className="size-6" />}
        </button>

        <ul className={`flex-col md:flex md:flex-row ${isMenuOpen ? "flex" : "hidden"} md:gap-6`}>
          <li>
            <Link to="/home" className="mr-2 hover:text-orange-500 ml-10 cursor-pointer">Home</Link>
          </li>

          {/* Academics Dropdown */}
          <li className="relative">
            <button
              type="button"
              ref={academicBtnRef}
              className="inline-flex items-center hover:text-orange-500"
              onClick={() =>
                setOpenDropdown(openDropdown === "academic" ? null : "academic")
              }
            >
              Academics <RiArrowDropDownLine className="text-2xl ml-1" />
            </button>

            {openDropdown === "academic" && (
              <div ref={academicRef} className="absolute z-10 mt-2 w-32 bg-white shadow-lg rounded dark:bg-sky-700 text-black dark:text-white">
                <Link to="/faculty" className="block px-4 py-2 hover:text-orange-500">Faculties</Link>
                <Link to="/program" className="block px-4 py-2 hover:text-orange-500">Programs</Link>
              </div>
            )}
          </li>

          {/* Contents Dropdown */}
          <li className="relative">
            <button
              type="button"
              ref={contentsBtnRef}
              className="inline-flex items-center hover:text-orange-500"
              onClick={() =>
                setOpenDropdown(openDropdown === "contents" ? null : "contents")
              }
            >
              Contents <RiArrowDropDownLine className="text-2xl mr-8" />
            </button>

            {openDropdown === "contents" && (
              <div ref={contentsRef} className="absolute z-10 mt-2 w-50 dark:bg-sky-700 font-normal text-white">
                <Link to="/contentmgmt" className="block px-4 py-2 hover:text-orange-500">Content Management</Link>
                <Link to="/contentcategory" className="block px-4 py-2 hover:text-orange-500">Content Categories</Link>
                <Link to="/institutional" className="block px-4 py-2 hover:text-orange-500">Institutional Info</Link>
              </div>
            )}
          </li>

          {/* Other Navigation Links */}
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.href} className="mr-3 hover:text-orange-500">{link.label}</Link>
            </li>
          ))}

          {/* Profile Dropdown */}
          <li className="relative">
            <button
              type="button"
              ref={profileBtnRef}
              className="inline-flex items-center hover:text-orange-500"
              onClick={() =>
                setOpenDropdown(openDropdown === "profile" ? null : "profile")
              }
            >
              Profile <RiArrowDropDownLine className="text-2xl mr-8" />
            </button>

            {openDropdown === "profile" && (
              <div ref={profileRef} className="absolute z-10 mt-2 w-40 dark:bg-sky-700 font-normal text-white">
                <div className="block px-4 py-2 text-base">
                  Signed in as <p>campus@1233.com</p>
                </div>
                <Link to="/password" className="block px-4 py-2 hover:text-orange-500">Password Change</Link>
                <button
                onClick={handleLogout}
                 className="block px-4 py-2 hover:text-orange-500">Logout</button>
              </div>
            )}
          </li>
          <li>
            <ThemeToggle/>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default NavbarAdmin;
