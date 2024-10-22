import React, { useEffect, useState } from "react";
import { StlViewer } from "react-stl-viewer";

const DisplayModel = ({ file, size = "large" }) => {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setSmall(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setSmall(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const style = size === "small"
    ? { width: "200px", height: "200px" } // Smaller size for preview
    : small
    ? { width: "300px", height: "300px" } // Adjusted for small screens
    : { width: "500px", height: "500px" }; // Fixed size for larger screens

  return (
    <div className="bg-primary rounded flex justify-start overflow-hidden">
      <StlViewer 
        style={style} 
        showAxes 
        orbitControls 
        shadows 
        url={file} 
      />
    </div>
  );
};

export default DisplayModel;
