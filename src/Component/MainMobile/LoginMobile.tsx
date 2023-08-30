import React, { useEffect, useRef, useState } from 'react';
import Loading from '../MainPage/Loading';
import Auth from '../../MainCall/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auhv from "../../MainCall/auhv.json";
import { GetdataAPI } from '../../MainCall/MainCall';
const { AuthenticateTokenApp } = auhv;

interface LocationState {
    UserId: string;
    uri: string;
}

const LoginMobile = () => {
    //---------------------Variables-----------------------------
    const location = useLocation();
    const stateFromLocation: any = location.state;
    const stateInterface: LocationState = stateFromLocation;
    const navigate = useNavigate();
    const isRunned = useRef(false);
    const [pk, setPk] = useState<string | null>(null);
    const [sk, setSk] = useState<string | null>(null);

    useEffect(() => {

        // console.log('success with login' + check        // window.addEventListener('message', testMessage);User);

    }, []);

    const testMessage = (event: any) => {
        if (isRunned.current) return;
        isRunned.current = true;
        console.log('test pk' ,  event.data.pk)
        console.log('test sk' , event.data.sk)
    }

    const receiveMessage = (event: any) => {
        if (isRunned.current) return;
        isRunned.current = true;
        if (event.data.pk && event.data.sk) {
           
        } else {
            console.log("error pk: " + event.data.pk);
            window.parent.postMessage('error from login pk' + event.data.pk, '*');
            console.log("error sk: " + event.data.sk);
            window.parent.postMessage('error from login sk' + event.data.sk, '*');
        }
    };

    const login = (event :any) => {
        Auth.Login(
            AuthenticateTokenApp,
            event.data.pk,
            event.data.sk
        ).then((res) => {
            if (res.Status === "Success") {
                navigate('/MyProfile');
                console.log('success with login', res);
                window.parent.postMessage('Success with login' + res, '*');
            } else {
                console.log('error with login', res);
                window.parent.postMessage('Failed' + res, '*');
            }
        });
    };

    //---------------------JSX----------------------------
    return (
        <div>
            <Loading />
        </div>
    );
};

export default LoginMobile;
