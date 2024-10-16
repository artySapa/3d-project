import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from './Loader';
import CanvasOverlay from "./CanvasOverlay";

const CoolObject = ({ makeResponsive }) => {
  const cooler = useGLTF('./vending/scene.gltf');
  const [scale, setScale] = useState(0.7);
  const coolerRef = useRef();

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

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial scale
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotate the object on every frame
  useFrame(() => {
    if (coolerRef.current) {
      coolerRef.current.rotation.y -= 0.002; // Adjust rotation speed
    }
  });

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
        ref={coolerRef}
        object={cooler.scene}
        scale={scale}
        position={makeResponsive ? [0, -2.5, -1.5] : [0, -3, -2.2]}
        rotation={[-0.1, 0, 0]}
      />
    </mesh>
  );
};

const IntroCanvas = () => {
  const [small, setSmall] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setSmall(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setSmall(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleUserInteraction = () => {
    setInteracted(!interacted);
  };

  return (
    <div className="flex flex-col items-center relative w-full">
    <Canvas
    style={{ cursor: 'grab' }}
      shadows
      dpr={[1, 2]}
      camera={{ position: [50, 30, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      onPointerDown={handleUserInteraction}
        onWheel={handleUserInteraction}
        
        onTouchStart={handleUserInteraction}
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
    <CanvasOverlay onInteract={interacted}/>
    </div>
  );
};

export default IntroCanvas;
