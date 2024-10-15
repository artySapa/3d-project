import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from './Loader';

const CoolObject = ({ makeResponsive }) => {
  const cooler = useGLTF('./vending/scene.gltf');

  // Adjust scaling based on screen size dynamically
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      
      if (screenWidth < 500) {
        setScale(0.45); // Smaller scale for mobile screens
      } else if (screenWidth > 1200) {
        setScale(0.6); // Limit the scale for very large screens
      } else {
        setScale(0.55); // Default scale for medium screens
      }
    };

    // Add event listener for resizing
    window.addEventListener('resize', handleResize);

    // Call it initially to set the correct scale on load
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        object={cooler.scene}
        scale={scale} // Dynamically adjusted scale
        position={makeResponsive ? [0, -2.5, -1.5] : [0, -3, -2.2]} // Adjust the position as needed
        rotation={[-0.1, 0, 0]}
      />
    </mesh>
  );
};


const IntroCanvas = () => {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Consider tablets as well

    // Set the initial value of the `small` state variable
    setSmall(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setSmall(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
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
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <CoolObject makeResponsive={small} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};


export default IntroCanvas;
