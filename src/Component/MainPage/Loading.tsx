import React from "react";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
export default function Loading() {
  return (
    <>
      <div className="App-header">
        <Logo className="inline h-[auto] w-[150px] " />
        {/* <img src={logo} height={5000} /> */}
        <div>Loading...</div>
      </div>
    </>
  );
}
