import React, { useRef, useEffect, useState } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import { useTranslation } from "react-i18next";
import Auth from "../../MainCall/Auth";
import PopupSuccess from "../MainPage/PopupSuccess";
import { MsgOK } from "../../MainCall/dialog";
import { useRecoilValue } from "recoil";
export default function OTP() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const phone = useRef(null);
  const otp = useRef(null);
  const [addclassbtn, setaddclassbtn] = useState("");
  const [addinvisible, setaddinvisible] = useState("invisible");
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [tknOTP, settknOTP] = useState("");
  interface LocationState {
    tknOTP: string;
    Status: string;
    Phone: string;
  }
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //------------------------------------------- onload ------------------------------------------
  {
    /*useEffect(() => {
    GetdataAPI("/api/Main/GetOTP", {}).then(async (res) => {
      settknOTP(res.Data);
    });
  }, []);*/
  }
  useEffect(() => {}, []);

  //------------------------------------------- funtion ------------------------------------------
  const [toggle, settoggle] = useState(false);
  const togglePopup = () => {
    settoggle(!toggle);
  };
  const done = () => {
    navigate("../Profilemenu/Editprofile");
  };
  const tryAgain = () => {
    GetdataAPI("/api/Main/GetOTP", {}).then(async (res) => {
      if (res.Status === "Success") {
        settknOTP(res.Data);
        MsgOK("แจ้งเตือน", "ส่ง OTP สำเร็จกรุณารอรับรหัส OTP");
      } else {
        MsgOK("แจ้งเตือน", "ส่ง OTP ไม่สำเร็จ");
      }
    });
  };
  const onSubmitOTP = () => {
    const code = otp.current.instance.option("value");
    GetdataAPI("/api/Main/GetStatusOTP", {
      OTPCode: code,
      Token: tknOTP,
    }).then(async (res) => {
      if (res.Status === "Success") {
        if (res.Data === "True") {
          if (StateInterface.Status === "OTPAuthen") {
            navigate("/Profilemenu/Editprofile");
          }
          GetdataAPI("/api/Main/EditProfile", {
            VerifyPhoneNumber: true,
          }).then(async (res) => {
            if (res.Status === "Success") {
              Auth.RefreshDataUser();
              {
                /*MsgOK("แจ้งเตือน", "ยืนยันสำเร็จ", "ตกลง").then((res) => {
                if (res) {
                  navigate("/Profilemenu/Editprofile");
                }
              });*/
              }
              navigate("../SendLinkVerify");
            }
          });
        } else {
          MsgOK("แจ้งเตือน", "OTP ไม่ถูกต้อง");
        }
      }
      console.log(res);
    });
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
      <div className="px-5 py-2">
        <div className="grid col-span-8 text-center mb-2 text-xl font-bold mb-3">
          {t("Send OTP by SMS") + "********"}
        </div>
        <div>
          <div className="grid grid-cols-12 gap-2">
            <div className="grid col-start-3 col-span-8 content-start mb-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("Enter OTP verification code")}
              </label>
            </div>
            <div className="grid col-start-3 col-span-5 content-start">
              <TextBox
                name="mobile"
                ref={otp}
                placeholder={t("Enter OTP verification code")}
              />
            </div>
            <div className="grid col-span-3 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start">
              <button type="button" className="btn-save" onClick={tryAgain}>
                {t("ส่งอีกครั้ง")}
              </button>
            </div>
            <div className="grid col-span-12 content-start justify-self-center">
              <button
                type="button"
                className="btn-save w-[300px] mx-10"
                onClick={onSubmitOTP}
              >
                {t("ถัดไป")}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-12 "></div>
        </div>
      </div>
    </>
  );
}
