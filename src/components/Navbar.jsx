import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./Welcome";
import Profile from "./pages/Profile";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const links = [
  { id: "main", title: "main" },
  { id: "log in", title: "log in" },
  { id: "userview", title: "profile" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setActive(""); // Reset the active state after logout
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Router>
      <nav className="w-full flex items-center py-5 fixed top-0 z-10 bg-slate-900">
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <p className="text-white text-[18px] ml-2 font-bold cursor-pointer flex">
              Share3D
            </p>
          </Link>

          {/* Navigation Menu */}
          <ul className="list-none flex flex-row sm:flex-row gap-4 sm:gap-10">
            {links.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              >
                {nav.title === "log in" && user.username === "" && (
                  <Link to="/login">{nav.title}</Link>
                )}

                {/* Profile Picture with Dropdown */}
                {nav.title === "log in" && user.username !== "" && (
                  <div
                    className="relative flex"
                    onMouseEnter={() => {setShowDropdown(false)}}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <Link to="/profile">
                      <img
                        className="w-[30px] h-[30px] rounded-full object-cover mr-4 shadow"
                        src={user.picture}
                        alt="profile-pic"
                      />
                    </Link>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                      <div
                        className="absolute mt-2 top-[40px] right-0 bg-white p-2 shadow rounded-md z-50"
                        ref={dropdownRef}
                      >
                        <Link
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="hover:opacity-70 transition-opacity duration-200"
                      >
                        <svg className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="20" y1="12" x2="10" y2="12" />  <line x1="20" y1="12" x2="16" y2="16" />  <line x1="20" y1="12" x2="16" y2="8" />  <line x1="4" y1="4" x2="4" y2="20" /></svg>
                      </button>
                  </div>
                )}

                {nav.title !== "log in" && nav.title !== "profile" && (
                  <Link to="/">{nav.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
