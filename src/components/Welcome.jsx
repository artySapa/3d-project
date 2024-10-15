import React from "react";
import IntroCanvas from "./canvas/IntroCanvas";
import MainGrid from "./MainGrid";

const Welcome = () => {
  return (
    <div>
      <section className="text-white bg-main bg-cover bg-no-repeat bg-center relative flex flex-col w-full h-auto md:h-screen mx-auto justify-center items-center">
        <div className="px-4 py-12 md:px-16 md:py-24 lg:px-24 lg:py-32 text-black w-full max-w-screen-xl mt-12 md:mt-20">
          {/* Welcome Text */}
          <div className="flex flex-col justify-center items-center text-center md:text-left mb-4 md:mb-10">
            <p className="text-3xl md:text-4xl lg:text-5xl break-words font-bold">
              Welcome to{" "}
              <span className="font-extrabold text-transparent text-3xl md:text-4xl lg:text-5xl bg-clip-text bg-gradient-to-r break-words from-purple-400 to-pink-600">
                Share3D
              </span>
            </p>
          </div>

          {/* Description */}
          <p className="mt-6 md:mt-8 text-base md:text-xl lg:text-2xl text-center md:text-left max-w-full md:max-w-4xl break-words">
            This project is for you to request and offer 3D models, making your imagination come true through collaboration.
          </p>

          {/* Canvas Container */}
          <div className="flex h-[200px] md:h-[300px] lg:h-[400px] mt-8 w-full">
            <IntroCanvas />
            </div>

        </div>
      </section>

      <MainGrid />
    </div>
  );
};

export default Welcome;
