import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import MainGrid from "./components/MainGrid";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState('');

  return (
    <div>
      <div className="relative z-0 bg-primary">
        <div>
          <Navbar setUser={setUser}/>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App;
