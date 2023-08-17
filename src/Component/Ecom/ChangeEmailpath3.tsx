import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { GetdataAPI } from "../../MainCall/MainCall";
import { useTranslation } from "react-i18next";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import PopupSuccess from "../MainPage/PopupSuccess";
import { TextBox } from "devextreme-react";
import PopupFailed from "../MainPage/PopupFailed";

//--------------------------------------------DevStore/interface ------------------------------------------
interface LocationState {
  email: string;
}
export default function ChangeEmailpath3() {
  //------------------------------------------- useRef ------------------------------------------
  const email = useRef(null);
  //------------------------------------------- ตัวแปร ------------------------------------------
  const User = useRecoilValue<userdata>(UserState);
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [labelshowmail, setlabelshowmail] = useState(false);
  const [CFemail, setCFemail] = useState(false);
  const [toggle, settoggle] = useState<boolean>(false);
  const [togglefail, settogglefail] = useState<boolean>(false);
  let chkMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  //------------------------------------------- funtion ------------------------------------------
  const saveEmail = () => {
    let chk = chkMail.test(email.current.instance.option("value")) === true;
    let chkno = chkMail.test(email.current.instance.option("value")) === false;
    if (email.current.instance.option("value") === "") {
      setCFemail(true);
      setlabelshowmail(false);
    }
    if (chk) {
      setlabelshowmail(false);
    }
    if (chkno) {
      setCFemail(false);
      setlabelshowmail(true);
    } else {
      GetdataAPI("/api/Main/EditProfile", {
        email_verify: false,
        user_email: email.current.instance.option("value"),
      }).then(async (res) => {
        if (res.Status === "Success") {
          Auth.RefreshDataUser();
          settoggle(!toggle);
        } else {
          settogglefail(!togglefail);
        }
      });
    }
  };
  const togglePopup = () => {
    settoggle(!toggle);
  };
  const togglePopupfail = () => {
    settogglefail(!togglefail);
  };
  const ChkEMail = () => {
    let chk = chkMail.test(email.current.instance.option("value")) === true;
    if (chk) {
      setlabelshowmail(false);
    } else {
      setCFemail(false);
      setlabelshowmail(true);
    }
  };
  const done = () => {
    navigate("../MyProfile");
  };
  const donefail = () => {
    settogglefail(false);
  };
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="px-5 py-2">
      <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
      <PopupFailed data={togglefail} toggle={togglePopupfail} done={donefail} />
      <div className="grid grid-cols-12 gap-6">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900  mb-2 text-left">
            {t("Email")}
          </label>
          <TextBox
            defaultValue={""}
            placeholder={t("Please enter a new email address")}
            ref={email}
            valueChangeEvent="keyup"
            onValueChanged={ChkEMail}
          />
          {labelshowmail ? (
            <label className="block  text-sm font-medium text-red-500 ">
              {t("Please enter gmail correctly")}
            </label>
          ) : (
            ""
          )}
          {CFemail ? (
            <label className="block  text-sm font-medium text-red-500 ">
              {t("Please enter a new email address")}
            </label>
          ) : (
            ""
          )}
        </div>

        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center ">
          <button className="btn-save" type="button" onClick={saveEmail}>
            {t("Save")}
          </button>
        </div>
      </div>
    </div>
  );
}
