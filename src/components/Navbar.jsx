import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./Welcome";

const links = [
  { id: "main", title: "main" },
  { id: "footer", title: "bottom" },
  { id: "log in", title: "log in" },
];

const Navbar = () => {
  const [active, setActive] = useState("");

  const handleLoginClick = () => {
    setActive("log in");
  };

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
              Arty &nbsp;
              <span className="sm:block hidden"> | 3D Project</span>
            </p>
          </Link>

          <ul className="list-none hidden sm:flex flex-row gap-10">
            {links.map((nav) => (
                
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                {nav.title === "log in" ? (
                  <Link to="/login">{nav.title}</Link>
                ) : 
                nav.title === "log in" ? (
                  <Link to="/">{nav.title}</Link>
                ) : <Link to="/">{nav.title}</Link>}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
