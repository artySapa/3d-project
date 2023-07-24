import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from './Loader';


import { StlViewer } from "react-stl-viewer";

const DisplayModel = ({file}) => {
    const style = {
        width: '30vw',
        height: '30vh',
    }
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
        <div className="bg-primary rounded m-3">
        <StlViewer
            style={style}
            orbitControls
            shadows
            url={file}
        />
        </div>
      );

};

export default DisplayModel;