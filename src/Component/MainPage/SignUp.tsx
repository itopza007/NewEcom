import React, { useRef, useState, useEffect } from "react";
import { sign } from "crypto";
import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import liff from "@line/liff/dist/lib";
import { custom } from "devextreme/ui/dialog";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { useTranslation } from "react-i18next";
import { log } from "console";
import Auth from "../../MainCall/Auth";
import auhv from "../../MainCall/auhv.json";

import { MsgOK } from "../../MainCall/dialog";
import { Popup } from "devextreme-react";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import Beta from "../../image/Beta.png";
import PopupWelcome from "../../MainCall/PopupWelcome";

//-------------------------------------------- DevStore/interface ------------------------------------------
interface LocationState {
  UserId: string;
  uri: string;
}
export default function SignUp() {
  //------------------------useRef-----------------------------
  const Username = useRef(null);
  const Password = useRef(null);
  const REPassword = useRef(null);
  const Phone = useRef(null);
  const btnSign = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const { Authenticate } = auhv;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notiEmail, setnotiEmail] = useState(false);
  const [notiPhone, setnotiPhone] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(true);
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //-------------------------- onload --------------------------
  useEffect(() => {
    togglePopup();
    //console.log(StateInterface.UserId);
    btnSign.current.setAttribute("disabled", "");
    Username.current.instance.option("value", "");
    Password.current.instance.option("value", "");
  }, []);
  //------------------------function--------------------------
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  const chkPhone = () => {
    GetdataAPI_Outside("/api/Main/CheckPhoneNumber", {
      phonenumber: Phone.current.instance.option("value"),
    }).then((CheckPhoneNumber) => {
      if (CheckPhoneNumber.Status === "Success") {
        if (CheckPhoneNumber.Data === "False") {
          setnotiPhone(false);
        } else {
          setnotiPhone(true);
          btnSign.current.setAttribute("disabled", "");
        }
      } else {
      }
    });
  };
  const chkEmail = () => {
    GetdataAPI_Outside("/api/Main/CheckUserName_Email", {
      email: Username.current.instance.option("value"),
    }).then((CheckUserEmail) => {
      if (CheckUserEmail.Status === "Success") {
        if (CheckUserEmail.Data === "False") {
          setnotiEmail(false);
          chkPhone();
          btnSign.current.removeAttribute("disabled");
        } else {
          setnotiEmail(true);
          btnSign.current.setAttribute("disabled", "");
        }
      } else {
      }
    });
  };
  const register = () => {
    GetdataAPI_Outside("/api/Main/Register", {
      phonenumber: Phone.current.instance.option("value"),
      user_username: Username.current.instance.option("value"),
      user_password: Password.current.instance.option("value"),
      user_email: Username.current.instance.option("value"),
    }).then((Register) => {
      if (Register.Status === "Success") {
        Auth.Login(
          Authenticate,
          Username.current.instance.option("value"),
          Password.current.instance.option("value")
        ).then((res) => {
          if (res !== undefined && !("error" in res)) {
            if (StateInterface !== null) {
              GetdataAPI("/api/Main/SaveDataUserLineId", {
                line_userlineid: StateInterface.UserId,
              }).then(async (res) => {
                if (res.Status === "Success") {
                  navigate("/Mobile");
                  togglePopup();
                } else {
                  MsgOK("แจ้งเตือน", "failure");
                }
              });
            } else {
              if (window.innerWidth < 992) {
                togglePopup();
                navigate("/Mobile");
              } else {
                navigate("/");
              }
            }
          }
        });
      } else {
        MsgOK("แจ้งเตือน", Register.Message);
      }
    });
  };
  const sign = () => {
    if (
      Password.current.instance.option("value") === "" ||
      REPassword.current.instance.option("value") === ""
    ) {
      MsgOK("แจ้งเตือน", "กรุณากรอกรหัสผ่าน");
    }

    if (
      Password.current.instance.option("value") !==
      REPassword.current.instance.option("value")
    ) {
      MsgOK("แจ้งเตือน", "รหัสผ่านไม่ตรงกัน");
    }
    if (
      Password.current.instance.option("value") ===
      REPassword.current.instance.option("value")
    ) {
      register();

      /* liff.getProfile().then((profile) => {
        const UserId = profile.userId;
        GetdataAPI("/api/Main/Register", {
          PhoneNumber: Phone.current.instance.option("value"),
          UserName: Username.current.instance.option("value"),
          Password: Password.current.instance.option("value"),
          Email: Email.current.instance.option("value"),
          UserlineId: UserId,
        }).then((Register) => {
        });
      }); */
    }
  };
  const ToLogin = () => {
    {
      /*console.log(StateInterface.UserId);
    navigate("/MobileAuth", {
      state: {
        UserId: StateInterface.UserId,
      },
    });*/
    }
    navigate("/MobileAuth");
  };
  const done = () => {
    togglePopup();
  };
  //------------------------HTML------------------------------
  return (
    <>
      {/*<PopupWelcome data={isPopupVisible} toggle={togglePopup} done={done} />
      <Popup
        position="center"
        visible={isPopupVisible}
        closeOnOutsideClick={true}
        onHiding={togglePopup}
        width="70%"
        height={"auto"}
        showTitle={false}
      >
        <div className="grid grid-cols-12">
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mb-5">
            <div className="text-center">
              <div className="text-xl font-semibold text-[#000000B2]">
                WELCOME
              </div>
            </div>
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
            <Logo className="inline h-[auto] w-[70px] center" />
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center justify-center">
            <img src={Beta} className="w-8 h-[auto] ml-28"></img>
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mb-5">
            <div className="text-center">
              <div className="text-sm font-semibold text-[#000000B2]">
                Ecom
              </div>
            </div>
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mb-5">
            <div className="text-center">
              <div className="text-[4px] text-[#000000B2]">
                Digital marketplace with face.
              </div>
            </div>
            <div className="text-center">
              <div className="text-[4px] text-[#000000B2]">
                recognition technology.
              </div>
            </div>
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center justify-center">
            <button className="btn-save w-40" onClick={togglePopup}>
              <div className="text-lg">Get started</div>
            </button>
          </div>
        </div>
  </Popup>*/}
      <div className="px-5 py-2">
        <div className="grid grid-cols-12 bg-white">
          <div className="grid col-span-12 sm:col-span-10 sm:col-start-2  md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
            <div className="grid grid-cols-12 gap-3 mt-14">
              <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-4">
                <UpimgIcon className="inline h-[auto] w-[70px] " />
              </div>

              <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-8 font-bold">
                Ecom
              </div>

              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  {t("Email")}
                </label>
                <TextBox
                  defaultValue=""
                  placeholder="Email"
                  ref={Username}
                  onValueChange={chkEmail}
                />
                <div className={notiEmail ? "" : "hidden"}>
                  <label className="block  text-sm font-medium text-red-500 ">
                    {t("มีข้อมูล Email นี้อยู่ในระบบแล้ว")}
                  </label>
                </div>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  {t("Password")}
                </label>
                <TextBox
                  mode="password"
                  defaultValue=""
                  placeholder="Password"
                  ref={Password}
                />
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  {t("Confirm Password")}
                </label>
                <TextBox
                  mode="password"
                  defaultValue=""
                  placeholder="Confirm Password"
                  ref={REPassword}
                />
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  {t("Phone number")}
                </label>
                <TextBox
                  defaultValue=""
                  placeholder="Phone number"
                  ref={Phone}
                  onValueChange={chkEmail}
                />
                <div className={notiPhone ? "" : "hidden"}>
                  <label className="block  text-sm font-medium text-red-500 ">
                    {t("มีเบอร์โทรศัพท์นี้อยู่ในระบบแล้ว")}
                  </label>
                </div>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4 mb-2">
                <button
                  type="button"
                  className="btn-save"
                  ref={btnSign}
                  onClick={sign}
                >
                  Sign Up
                </button>
              </div>
              <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 ">
                <span>
                  <span className="text-blue-600" onClick={ToLogin}>
                    มีบัญชีผู้ใช้แล้ว
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
