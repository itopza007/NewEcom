import React, { useRef } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";

//--------------------------------------------DevStore/interface ------------------------------------------
interface LocationState {
  phoneORmail: string;
  email: string;
}
export default function Forgotpass() {
  //------------------------------------------- useRef ------------------------------------------
  const EmailORTel = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const email = "test@gmail.com";
  //------------------------function--------------------------
  const Next = () => {
    if (EmailORTel.current.instance.option("value") === "") {
      alert("กรุณากรอกอีเมลล์หรือเบอร์โทรศัพท์");
    } else {
      navigate("../Resetpass", {
        state: {
          phoneORmail: EmailORTel.current.instance.option("value"),
          email: email,
        },
      });
    }
  };
  //------------------------HTML------------------------------
  return (
    <div className="px-5 py-4">
      <div className="grid grid-cols-12 ">
        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 text-xl font-bold mb-3">
          ค้นหาบัญชีของคุณ
        </div>
        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2">
          <label className="block text-sm font-medium text-gray-900 ">
            โปรดป้อนอีเมลหรือหมายเลขโทรศัพท์มือถือของคุณเพื่อค้นหาบัญชีของคุณ
          </label>
        </div>
        <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start">
          <TextBox placeholder="Email or Phone" ref={EmailORTel} />
        </div>
        <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start">
          <button type="button" className="btn-save" onClick={Next}>
            ดำเนินการต่อ
          </button>
        </div>
      </div>
    </div>
  );
}
