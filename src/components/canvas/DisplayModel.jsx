import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from './Loader';

const CoolObject = ({ file }) => {
    const cool = useGLTF({file});
  
    return (
        <mesh>
        <hemisphereLight intensity={10} groundColor='black' />
        <spotLight
          position={[-200, 500, 100]}
          angle={0.52}
          penumbra={1}
          intensity={10}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight intensity={10} />
        <primitive
          object={cool.scene}
          scale={makeResponsive ? 0.7 : 0.5}
          position={makeResponsive ? [0, -3, -2.2] : [0, -1, -1.5]}
          rotation={[-0.1, -0, -0]}
        />
      </mesh>
      );
  };

const DisplayModel = ({file}) => {
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
        <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 2]}
          camera={{ position: [50, 30, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={<CanvasLoader/>}>
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <CoolObject makeResponsive={small} file={file}/>
          </Suspense>
          <Preload all />
        </Canvas>
      );

};

export default DisplayModel;