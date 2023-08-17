import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SetPin from "../Ecom/SetPin";

import RePin from "./RePin";

export default function Setpin() {
  //-----------ตัวแปร------------------------------
  const [repin, setrepin] = useState<String>("");
  const [notiPin, setnotiPin] = useState(false);
  const { t } = useTranslation();
  //----------------onload---------------------------
  //----------------function---------------------------

  const fnrepin = (data) => {
    setnotiPin(data);
  };
  const returnpin = (data) => {
    setrepin(data);
  };
  //------------------html----------------------------
  return (
    <>
      {repin === "" ? (
        <div className="p-3 mt-12">
          <SetPin fn={returnpin} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-12 gap-3 mt-3 mx-1">
            <div
              className="grid col-span-12"
              onClick={() => {
                setrepin("");
                setnotiPin(false);
              }}
            >
              <div className="flex">
                <i className="far fa-chevron-left text-3xl mr-2"></i>
                <div className="mt-1">ย้อนกลับเพื่อตั้งค่า PIN ใหม่</div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <RePin fn={fnrepin} data={repin} />
          </div>
          {notiPin ? (
            <label className="block  text-sm font-medium text-red-500  text-center mt-3">
              {t("Pin not match")}
            </label>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
