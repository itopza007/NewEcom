import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import TextBox from "devextreme-react/text-box";
import { useTranslation } from "react-i18next";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetdataAPI } from "../../MainCall/MainCall";
import Auth from "../../MainCall/Auth";
import PopupSuccess from "../MainPage/PopupSuccess";
import PopupFailed from "../MainPage/PopupFailed";

//--------------------------------------------DevStore/interface ------------------------------------------
interface LocationState {
  tel: string;
}
export default function ChangePhoneNumber3() {
  //------------------------------------------- useRef ------------------------------------------
  const tel = useRef(null);
  //------------------------------------------- ตัวแปร ------------------------------------------
  const User = useRecoilValue<userdata>(UserState);
  const { username, ud } = User;
  const User_Data: userWebdata = User.ud;
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [CFtel, setCFtel] = useState(false);
  const [toggle, settoggle] = useState<boolean>(false);
  const [togglefail, settogglefail] = useState<boolean>(false);
  //------------------------------------------- funtion ------------------------------------------
  const saveTel = () => {
    if (tel.current.instance.option("value") === "") {
      setCFtel(true);
    } else {
      setCFtel(false);
      GetdataAPI("/api/Main/EditProfile", {
        phonenumber: tel.current.instance.option("value"),
        phonenumber_verify: false,
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
  const donefail = () => {
    settogglefail(false);
  };
  const done = () => {
    navigate("../MyProfile");
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <div>
      <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
      <PopupFailed data={togglefail} toggle={togglePopupfail} done={donefail} />
      <div className="px-5 py-2">
        <div className="grid grid-cols-12 gap-3">
          <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
            <div className=" ">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                {t("Phone Number")}
              </label>
              <TextBox
                ref={tel}
                placeholder={t("Please enter a new phone number")}
                valueChangeEvent="keyup"
                onValueChanged={() => {
                  if (tel.current.instance.option("value") !== "") {
                    setCFtel(false);
                  }
                }}
              />
              {CFtel ? (
                <label className="block  text-sm font-medium text-red-500 ">
                  {t("Please enter a new phone number")}
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center ">
            <button className="btn-save" type="button" onClick={saveTel}>
              {t("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
