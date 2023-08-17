import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef } from "react";

//--------------------------------------------DevStore/interface ------------------------------------------
interface LocationState {
  num: number;
  email: string;
  tel: string;
  pass: string;
}
export default function ConfirmEmail() {
  //------------------------------------------- useRef ------------------------------------------
  const valEmail = useRef(null);
  //------------------------------------------- ตัวแปร ------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //------------------------------------------- funtion ------------------------------------------
  const Tonext = () => {
    if (StateInterface.email === valEmail.current.instance.option("value")) {
      alert("กรุณากรอก Email ใหม่ !");
    } else
      navigate("../ConfirmEmail", {
        state: {
          email: StateInterface.email,
        },
      });
  };
  const Toconfirm = () => {
    alert("บันทึกเรียบร้อย");
    navigate("../MyProfile", {
      state: {
        num: 0,
        email: valEmail.current.instance.option("value"),
        tel: StateInterface.tel,
        pass: StateInterface.pass,
      },
    });
  };
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="px-5 py-2">
      <div className="mb-1">
        <div id="sign-in-button"></div>
        <div className="grid grid-cols-12 ">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2">
            <label className="block text-sm font-medium text-gray-900 ">
              กรุณากรอก Email ใหม่เพื่อรับ Password
            </label>
          </div>
          <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start">
            <TextBox ref={valEmail} placeholder="Email" />
          </div>
          <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start">
            <button type="button" className="btn-save" onClick={Tonext}>
              ดำเนินการต่อ
            </button>
          </div>
          <div className="grid justify-end col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <div className="text-xl text-blue-500 invisible">ส่งอีกครั้ง</div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-12 ">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2">
            <label className="block text-sm font-medium text-gray-900 ">
              กรอกรหัสยืนยัน Password
            </label>
          </div>
          <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start">
            <TextBox name="mobile" placeholder="Password" />
          </div>
          <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start">
            <button type="button" className="btn-save  " onClick={Toconfirm}>
              ยืนยัน
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 "></div>
      </div>
    </div>
  );
}
