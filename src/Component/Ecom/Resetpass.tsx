import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import SelectBox from "devextreme-react/select-box";

//------------------------------------------- -DevStore/interface ------------------------------------------
interface LocationState {
  phoneORmail: string;
  email: string;
}

export default function Resetpass() {
  //------------------------------------------- useRef ------------------------------------------
  const valdata = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const Phonehide = "********" + StateInterface.phoneORmail.slice(-2);
  const data = [
    {
      ID: 1,
      Name: "ส่ง Email " + StateInterface.email,
    },
    {
      ID: 2,
      Name: "ส่ง SMS " + Phonehide,
    },
  ];

  //------------------------function--------------------------
  const Next = () => {
    if (valdata.current.instance.option("value") === 1) {
      navigate("../ForgotEmail", {
        state: {
          phoneORmail: StateInterface.phoneORmail,
          email: StateInterface.email,
        },
      });
    }

    if (valdata.current.instance.option("value") === 2) {
      navigate("../ForgotOTP", {
        state: {
          phoneORmail: StateInterface.phoneORmail,
          email: StateInterface.email,
        },
      });
    }
  };

  //------------------------HTML------------------------------
  return (
    <div className="px-5 py-4">
      <div className="grid grid-cols-12 ">
        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 text-xl font-bold mb-3">
          รีเซ็ตรหัสผ่านของคุณ
        </div>
        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2">
          <label className="block text-sm font-medium text-gray-900 ">
            คุณต้องการรับรหัสเพื่อรีเซ็ตรหัสผ่านใหม่ด้วยวิธีใด
          </label>
        </div>
        <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start ">
          <SelectBox
            dataSource={data}
            valueExpr="ID"
            displayExpr="Name"
            defaultValue={data[0].ID}
            ref={valdata}
          />
        </div>
        <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start ">
          <button type="button" className="btn-save" onClick={Next}>
            ดำเนินการต่อ
          </button>
        </div>
      </div>
    </div>
  );
}
