import React, { useEffect, useState } from "react";
import Home from "../Ecom/Home";
import SignUp from "../MainPage/SignUp";
import { isBrowser } from "react-device-detect";
import LoginMobile from "../MainMobile/LoginMobile";

export default function AppOrBrowser() {
  const [isApp, setIsApp] = useState(false);
  //---------------------onload-----------------------------

  return <>
    { !isApp ?
      <Home /> :
      <LoginMobile />
    }
  </>;
}