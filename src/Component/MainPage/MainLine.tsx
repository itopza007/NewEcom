import liff from "@line/liff/dist/lib";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { GetdataAPI_Outside } from "../../MainCall/MainCall";
import Loading from "./Loading";

export default function MainLine() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const navigate = useNavigate();
  const [islogin, setislogin] = useState(false);
  const [isloading, setisloading] = useState(true);

  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    Auth.LogOut().then(() => {
      lineAuth();
    });
  }, []);
  const lineAuth = () => {
    liff
      .init({
        liffId: "1657716200-pVx8km3R", // Use own liffId
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          setislogin(true);
          liff.getProfile().then((profile) => {
            const UserId = profile.userId;
            GetdataAPI_Outside("/api/Main/CheckUserLineId", {
              line_userlineid: UserId,
            }).then((res) => {
              setisloading(false);
              if (res.Status === "Success") {
                if (res.Data === "True") {
                  navigate("/MobileAuth/LineLogin", {
                    state: {
                      UserId: UserId,
                    },
                  });
                } else {
                  if (window.innerWidth < 992) {
                    navigate("/MobileAuth/SignUp", {
                      state: {
                        UserId: UserId,
                      },
                    });
                  } else if (window.innerWidth >= 992) {
                    navigate("/Authen/SignUp", {
                      state: {
                        UserId: UserId,
                      },
                    });
                  }
                }
              }
            });
          });
        }
      });
  };
  if (!islogin) return;

  //------------------------------------------- HTML ------------------------------------------
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="max-h-screen">
          <Outlet />
        </div>
      )}
    </>
  );
}
