import React, { useState, useEffect } from 'react';
import fingerIcon from './finger-icon.png';

const CanvasOverlay = ({ onInteract }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (onInteract) {
      setVisible(false);
    }
  }, [onInteract]);

  if (!visible) return null;

  return (
    <div
      className="absolute flex items-center justify-center pointer-events-none h-full"
      style={{
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -10%)', // Adjusted from -30% to -10%
      }}
    >
      <img
        src={fingerIcon}

        alt="Interact with the model"
        className="w-8 sm:w-10 md:w-12 lg:w-16 xl:w-20 opacity-70 animate-float"

      />
    </div>
  );
};

export default CanvasOverlay;
