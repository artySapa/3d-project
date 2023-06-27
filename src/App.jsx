import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import MainGrid from "./components/MainGrid";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="text-white bg-main bg-cover bg-no-repeat bg-center">
          <Navbar/>
          <Welcome/>
        </div>
        <MainGrid />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
