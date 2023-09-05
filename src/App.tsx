import React, { useState, useEffect, Suspense, useRef } from "react";

import Loading from "./Component/MainPage/Loading";
import Router from "./routes/routes";
import { setupPwaUpdateNotifications } from "./pwaUpdateNotifications";
import { useNavigate } from "react-router-dom";
import { isAppOrNot } from "./Recoil/AppCheckRecoil";
import { useRecoilState } from "recoil";
import { isBrowser } from "react-device-detect";
import Auth from "./MainCall/Auth";
import auhv from "./MainCall/auhv.json";
import { TextBox } from "devextreme-react";
const { AuthenticateTokenApp } = auhv;
interface DataState {
  firstname: string;
  lastname: string;
}

function App(props) {
  //---------------------ตัวแปร-----------------------------
  const isRunned = useRef(false);
  const Name = useRef(null);
  const navigate = useNavigate();
  const [isApp, setIsApp] = useRecoilState(isAppOrNot);
  //---------------------onload-----------------------------
  useEffect(() => {
    setupPwaUpdateNotifications();
  }, []);

  useEffect(() => {
    if (isAppOrNot) {
      setIsApp(true)
    } else {
      setIsApp(false)
    }
    window.addEventListener('message', receiveMessage);
    // console.log('App is ' + isApp)
  }, []);

  //---------------------function-----------------------------
  const receiveMessage = (event: any) => {
    if (isRunned.current) return;
    isRunned.current = true;
    if (event.data.app) {
      console.log('Success' + event.data.app)
      setIsApp(true)
      Login(event.data.pk, event.data.sk)
    } else {
      console.log('error' + event.data.app)
    }
    console.log('test pk', event.data.pk)
    console.log('test sk', event.data.sk)

  }

  const Login = (pk: any, sk: any) => {
    Auth.Login(
      AuthenticateTokenApp,
      pk,
      sk
    ).then((res) => {
      if (res.Status === "Success") {
        navigate('/');
        console.log('success with login', res);
        window.parent.postMessage('Success with login' + res, '*');
      } else {
        console.log('error with login', res);
        window.parent.postMessage('Failed' + res, '*');
      }
    });
  }

  //---------------------function-----------------------------


  //---------------------html----------------------------
  return (
    <>
      <div>
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
      </div>
    </>
  );
}

export default App;
