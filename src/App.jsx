import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  // const [user, setUser] = useState('');
  // const [profPic, setProfPic] = useState('');

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
