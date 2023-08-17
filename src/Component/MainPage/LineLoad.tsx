import { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { useTranslation } from "react-i18next";
import Auth from "../../MainCall/Auth";
import auhv from "../../MainCall/auhv.json";
import { MsgWarning } from "../../MainCall/dialog";

import liff from "@line/liff/dist/lib";
import { useRecoilState } from "recoil";
import Loading from "./Loading";

interface LocationState {
  UserId: string;
  uri: string;
  displayName: string;
  inv_id: number;
  email: string;
}
export default function LineLoad() {
  const Username = useRef(null);
  const Password = useRef(null);
  const Phone = useRef(null);
  const btnSign = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const [noti, setnoti] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const data1 = searchParams.get("data1");
  const data2 = searchParams.get("data2");
  const { Authenticate, AuthenticateLine } = auhv;
  const [teldisabled, setteldisabled] = useState(false);
  const [namedisabled, setnamedisabled] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notiEmail, setnotiEmail] = useState(false);
  const [notiPhone, setnotiPhone] = useState(false);

  const location = useLocation();
  const stateany: any = location.state;

  const UserId = searchParams.get("UserId");
  const UserEmail = searchParams.get("email");
  const displayName = searchParams.get("displayName");
  const platform = searchParams.get("platform");
  const [phone, setphone] = useState("");
  const [user, setuser] = useState("");
  const LineLogin = searchParams.get("line");

  const [NameLine, setNameLine] = useState("");
  const [IDLine, setIDLine] = useState("");

  //-------------------------- onload --------------------------
  useEffect(() => {
    lineAuth();
  }, []);
  //------------------------function--------------------------
  const lineAuth = () => {
    liff
      .init({
        liffId: "2000436952-PpzaXXN2", // Use own liffId
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
        } else {
          getProfile();
        }
      });
  };

  const getProfile = () => {
    liff.getProfile().then((profile) => {
      const UserId = profile.userId;
      const displayName = profile.displayName;
      console.log(profile.userId);
      setIDLine(UserId);

      GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
        authen_code: UserId,
        platform_name: "lineauthen",
      }).then((res) => {
        if (res.Status === "Success") {
          console.log(res.Data);
          if (res.Data === "True") {
            Auth.Login(AuthenticateLine, UserId, "000000").then((res) => {
              if (res.Status === "Success") {
                navigate("/");
              }
            });
          } else {
            /*    GetdataAPI_Outside("/api/Main/Register", {
              PhoneNumber: "",
              UserName: UserId,
              Password: "000000",
              Email: "",
              User_Name: displayName,
            }).then((Register) => {
              if (Register.Status === "Success") {
                Auth.Login(Authenticate, UserId, "000000").then((res) => {
                  if (res.Status === "Success") {
                    GetdataAPI("/api/Main/SaveAuthenCode", {
                      authen_code: UserId,
                      platform_name: "lineauthen",
                    }).then((res) => {
                      if (res.Status === "Success") {
                        navigate("/");
                      }
                    });
                  }
                });
              }
            }); */
            navigate("/Authen", {
              state: {
                UserId: UserId,
              },
            });
          }
        } else {
          MsgWarning(res.Message);
        }
      });
    });
  };

  //------------------------HTML------------------------------
  return (
    <>
      <Loading />
    </>
  );
}
