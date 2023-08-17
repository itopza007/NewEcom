import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MsgWarning } from "../../MainCall/dialog";
import CheckPin from "./CheckPin";
import RePin from "./RePin";
import SetPin from "./SetPin";
export default function Pin() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const [chk, setchk] = useState<Boolean>(false);
  const [valpin, setvalpin] = useState<String>("");
  const [repin, setrepin] = useState<String>("");
  const [notiPin, setnotiPin] = useState(false);
  const { t } = useTranslation();
  //------------------------------------------- onload ------------------------------------------
  //------------------------------------------- funtion ------------------------------------------
  const fnreturn = (data) => {
    setchk(data);
  };
  const fnrepin = (data) => {
    setnotiPin(data);
  };
  const returnpin = (data) => {
    setrepin(data);
    setvalpin(data);
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <div className="p-3">
      {" "}
      {!chk ? (
        <div>
          {t("Check Pin")}
          <CheckPin fn={fnreturn} />
        </div>
      ) : (
        <>
          {valpin === "" ? (
            <div>
              {t("Set Pin")}
              <SetPin fn={returnpin} />
            </div>
          ) : (
            <div>
              {t("Re Enter Pin")}
              <RePin fn={fnrepin} data={repin} />
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
      )}
    </div>
  );
}
