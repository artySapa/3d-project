import React from "react";

import IntroCanvas from "./canvas/IntroCanvas";

const Welcome = () => {
    return (
        <section className={`relative flex w-full h-screen mx-auto justify-center align-center`}>
            <div className="p-40 pl-12">
                <div className="flex justify-between mb-10">
                <p className="text-5xl font-bold">Hello, my name is <span className="text-[lightgreen]">Arty</span></p>
                </div>
                <p className="mt-30 text-2xl">This project is for you to play around with 3d objects and for me to learn more about the ThreeJS library :)</p>
                <div className="flex h-[600px]">
                <IntroCanvas />
                </div>
            </div>
        </section>
    );
}

export default Welcome;