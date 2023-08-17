import { Popup } from "devextreme-react/popup";
import { PinInput } from "react-input-pin-code";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Krungthai from "../../image/Krungthai.png";
import Krungsri from "../../image/Krungsri.png";
import { useNavigate } from "react-router-dom";

export function Confrim(prop) {
  const navigate = useNavigate();

  const popup_config = {
    hide: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: { my: "center" as const, at: "center" as const, of: window },
      },
      to: {
        position: { my: "top" as const, at: "bottom" as const, of: window },
      },
    },
    show: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: { my: "top" as const, at: "bottom" as const, of: window },
      },
      to: {
        position: { my: "center" as const, at: "center" as const, of: window },
      },
    },
  };

  const { t } = useTranslation();

  const [result, setresult] = React.useState("Cancel");
  const renderContentConfrim = () => {
    return (
      <div>
        <div className="grid grid-cols-12 gap-3 mb-4">
          <div className="grid col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 content-center ">
            <img
              className="w-16 h-16 rounded-full mb-4"
              src={Krungthai}
              alt="Logo"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-18 w-10 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
          </div>
          <div className=" grid col-span-9 sm:col-span-9 md:col-span-9 lg:col-span-9 xl:col-span-9 content-start  ">
            <div className="text-2xl px-3 font-bold">นายพีรพัฒน์ วรรณโก</div>
            <p className="text-xl px-3 text-black">กรุงไทย</p>
            <p className="text-xl px-3 text-gray-600">XXX-X-XX123-X</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-12">
          <div className="grid col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 content-start ">
            <img
              className="w-16 h-16 rounded-full mb-2"
              src={Krungsri}
              alt="Logo"
            />
          </div>
          <div className="grid col-span-9 sm:col-span-9 md:col-span-9 lg:col-span-9 xl:col-span-9 content-start  ">
            <div className="text-2xl px-3 font-bold">นายวัชรพล พร้อมกระโทก</div>
            <p className="text-xl px-3 text-black">กรุงศรี</p>
            <p className="text-xl px-3 text-gray-600">XXX-X-XX444-X</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start text-2xl font-bold">
            จำนวนเงิน
          </div>
          <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start text-right">
            <span>
              <span className="text-3xl font-bold ">100.00 </span>
              <span className="text-2xl font-bold ">บาท</span>
            </span>
          </div>
          <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start text-2xl font-bold ">
            ค่าธรรมเนียม
          </div>
          <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start text-2xl font-bold text-right">
            <span>
              <span>0.00 </span>
              <span>บาท</span>
            </span>
          </div>
          <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start text-2xl font-bold ">
            วันที่ทำรายการ
          </div>
          <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start text-2xl font-bold text-right">
            <span>
              <span>2 </span>
              <span>ก.ค.</span>
              <span> 2565</span>
              <span> - 13.01</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 absolute inset-x-0 bottom-5 mx-5">
          <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
            <button className="btn-save" onClick={() => navigate("../")}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Popup
        position="bottom"
        fullScreen={true}
        onHiding={(e) => prop.fnReturn(result)}
        visible={prop.data}
        closeOnOutsideClick={true}
        contentRender={renderContentConfrim}
        title={t("Confrim")}
        resizeEnabled={false}
        height="auto"
        width="100%"
        animation={popup_config}
      />
    </>
  );
}
