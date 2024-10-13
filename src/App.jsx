import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-primary">
        <Navbar />
        {/* Your main content goes here */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
