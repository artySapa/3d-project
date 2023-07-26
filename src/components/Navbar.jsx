import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./Welcome";
import Profile from "./pages/Profile";

import { useSelector } from "react-redux";
import { logout } from "../../redux/actions";

const links = [
  { id: "main", title: "main" },
  { id: "log in", title: "log in" },
  { id: "userview", title: "profile" },
];

const Navbar = ({ setUser, profPic, setProfPic }) => {
  const [active, setActive] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const dropdownRef = useRef(null);

  const handleLoginClick = () => {
    setActive("log in");
  };

  const handleProfileHover = () => {
    setShowDropdown(true);
  };

  const handleProfileLeave = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Router>
      <nav className="w-full flex items-center py-5 fixed top-0 z-20 bg-slate-900">
        <div className="w-full flex justify-around items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              Share
              <span className="sm:block hidden">3D</span>
            </p>
          </Link>

          <ul className="list-none hidden sm:flex flex-row gap-10">
            {links.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onMouseEnter={
                  nav.title === "log in" && user.username !== ""
                    ? handleProfileHover
                    : null
                }
              >
                {nav.title === "log in" && user.username === "" && (
                  <Link to="/login">{nav.title}</Link>
                )}
                {nav.title === "log in" && user.username !== "" && (
                  <div className="relative">
                    <Link to="/profile">
                      <img
                        className="w-[30px] h-[30px] rounded-full object-cover mr-4 shadow"
                        src={user.picture}
                      />
                    </Link>
                    {showDropdown && (
                      <div
                        className="absolute top-[40px] right-0 bg-white p-2 shadow rounded-md"
                        ref={dropdownRef}
                      >
                        <Link
                          to="/profile"
                          onClick={handleProfileLeave}
                          className="block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/"
                          onClick={() => {
                            handleProfileLeave;
                            dispatch(logout());
                          }}
                          className="block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200"
                        >
                          Logout
                        </Link>
                      </div>
                    )}
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
