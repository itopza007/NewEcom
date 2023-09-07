import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import TextBox from "devextreme-react/text-box";
import { useTranslation } from "react-i18next";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//------------------------------------------- -DevStore/interface ------------------------------------------
interface LocationState {
  email: string;
}

export default function ChangeEmailpath2() {
  //------------------------------------------- useRef ------------------------------------------
  const email = useRef(null);
  //------------------------------------------- ตัวแปร ------------------------------------------
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [labelshowmail, setlabelshowmail] = useState(false);
  //------------------------------------------- funtion ------------------------------------------
  const Verify = () => {
    if (
      email.current.instance.option("value") === "" ||
      labelshowmail === true
    ) {
      setlabelshowmail(true);
    } else {
      navigate("../VerifyYourEmail", {
        state: { email: email.current.instance.option("value") },
      });
    }
  };
  const Edit = () => {
    navigate("../ChangeEmailpath2");
  };
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-6">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <div className="relative">
            <label className="block  text-sm font-medium text-gray-900  mb-2">
              {t("Email")}
            </label>
            <TextBox value={User_Data.user_email} placeholder="" ref={email} />
            <div
              className="absolute right-2.5 bottom-[9px] text-lg text-orange-400 font-bold cursor-pointer hover:text-orange-700 active:text-orange-900"
              onClick={Edit}
            >
              {t("Edit")}
            </div>
          </div>
        </div>
        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <button className="btn-save" type="button" onClick={Verify}>
            {t("Verify")}
          </button>
        </div>
      </div>
    </div>
  );
}
