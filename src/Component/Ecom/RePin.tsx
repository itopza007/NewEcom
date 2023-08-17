import TextBox from "devextreme-react/text-box";
import React, { useRef, useState, useEffect } from "react";
import { PinInput } from "react-input-pin-code";
import { useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupFailed from "../MainPage/PopupFailed";
import PopupSuccess from "../MainPage/PopupSuccess";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
export default function RePin(props) {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const navigate = useNavigate();
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  const [toggle, settoggle] = useState<boolean>(false);
  const [togglefail, settogglefail] = useState<boolean>(false);
  const togglePopup = () => {
    settoggle(!toggle);
  };
  //------------------------------------------- onload ------------------------------------------
  //------------------------------------------- funtion ------------------------------------------
  const done = () => {
    navigate("../MyProfile");
  };
  const PinComplete = (valpin) => {
    setValues(["", "", "", "", "", ""])
    const pin = valpin.join("");
    if (props.data !== pin) {
      props.fn(false);
    } else {
      GetdataAPI("/api/Main/EditProfile", {
        user_pin: pin,
      }).then(async (res) => {
        if (res.Status === "Success") {
          Auth.RefreshDataUser();
          settoggle(!toggle);
        } else {
          settogglefail(!togglefail);
        }
      });
      //props.fn(true)
    }
  };
  const togglePopupfail = () => {
    settogglefail(!togglefail);
  };
  const donefail = () => {
    settogglefail(false);
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
      <PopupFailed data={togglefail} toggle={togglePopupfail} done={donefail} />
      <div className="mx-2">
        <div className="grid grid-cols-12 gap-3 mt-16">
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5">
            <Logo className="inline h-[auto] w-[60px] center" />
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              PINCODE
            </div>
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              ยืนยันรหัสอีกครั้ง
            </div>
          </div>
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <PinInput
              values={values}
              autoFocus={true}
              mask
              placeholder=""
              inputStyle={{ width: "45px" }}
              onChange={(value, index, values) => {
                return setValues(values);
              }}
              onComplete={PinComplete}
            />
          </div>
        </div>
      </div>
    </>
  );
}
