import React from "react";

import IntroCanvas from "./canvas/IntroCanvas";
import MainGrid from "./MainGrid";

const Welcome = () => {
    return (
        <div >
        <section className={` text-white bg-main bg-cover bg-no-repeat bg-center relative flex w-full h-screen mx-auto justify-center align-center`}>
            <div className="p-40 pl-12 text-black">
                <div className="flex justify-between mb-10">
                <p className="text-5xl font-bold">Welcome to <span className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Share3D</span></p>
                </div>
                <p className="mt-30 text-2xl top-0 x-0">This project is for you to request and offer 3d models thus making your imagination come true through collaboration</p>
                <div className="flex h-[600px]">
                <IntroCanvas />
                </div>
            </div>
        </section>
        <MainGrid />
        </div>
    );
}

export default Welcome;