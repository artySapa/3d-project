import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import MainGrid from "./components/MainGrid";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <div className="relative z-0 bg-primary">
        <div>
          <Navbar/>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App;
