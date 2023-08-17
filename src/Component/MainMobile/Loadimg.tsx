import React, { useEffect, useState } from "react";

import detect from'../../image/Bambies2.jpg'

function Loadimg() {
    return (
        <div className="App">
            <div id="app">
                <div className="grid grid-cols-12 gap-0 mx-10 mt-1 ">
                    <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mt-60">
                        <img className='center' src={detect} style={{
                            height: '100px',
                            width: '100px',
                        }} />
                        <a className="text-center mt-3">Face analyzing</a>
                    </div>

                    <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mt-0">
                        <iframe className="w-full px-0" src="https://embed.lottiefiles.com/animation/99740" ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Loadimg;