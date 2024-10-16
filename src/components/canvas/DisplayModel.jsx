import React, { Suspense, useEffect, useState } from "react";

import { StlViewer } from "react-stl-viewer";

const DisplayModel = ({ file }) => {
    const style = {
        width: "500px",
        height: "200px",
      };
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

  return (
    <div className="bg-primary rounded w-[50%] flex justify-start overflow-hidden">
        <StlViewer style={style} showAxes orbitControls shadows url={file} />
    </div>
  );
};

export default DisplayModel;