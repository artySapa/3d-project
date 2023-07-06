import React from "react";

import IntroCanvas from "./canvas/IntroCanvas";
import MainGrid from "./MainGrid";

const Welcome = ({user, setUser}) => {
    return (
        <div >
        <section className={` text-white bg-main bg-cover bg-no-repeat bg-center relative flex w-full h-screen mx-auto justify-center align-center`}>
            <div className="p-40 pl-12 text-black">
                <div className="flex justify-between mb-10">
                <p className="text-5xl font-bold">Hello, my name is <span className="text-[#FF5733]">Arty</span></p>
                </div>
                <p className="mt-30 text-2xl top-0 x-0">This project is for you to play around with 3d objects and for me to learn more about the ThreeJS library :)</p>
                <div className="flex h-[600px]">
                <IntroCanvas />
                </div>
            </div>
        </section>
        <MainGrid user={user} setUser={setUser} />
        </div>
    );
}

export default Welcome;