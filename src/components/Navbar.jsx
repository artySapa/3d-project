import React, { useEffect, useState, useRef } from "react";
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
      <nav className="w-full flex items-center py-5 fixed top-0 z-50 bg-slate-900">
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

          {/* Navigation Menu (visible on all screen sizes) */}
          <ul className="list-none flex flex-row sm:flex-row gap-4 sm:gap-10">
            {links.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onMouseEnter={
                  nav.title === "log in" && user.username !== ""
                    ? () => setShowDropdown(true)
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
                        alt="profile-pic"
                      />
                    </Link>
                    {showDropdown && (
                      <div
                        className="absolute top-[40px] right-0 bg-white p-2 shadow rounded-md z-30"
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
