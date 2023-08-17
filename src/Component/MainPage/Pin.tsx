import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import SetPin from "../Ecom/SetPin";
import CheckPin from "./CheckPin";
import RePin from "./RePin";
export default function Pin({ navlink }) {
  const User = useRecoilValue<userdata>(UserState);
  const { username, ud } = User;
  const User_Data: userWebdata = User.ud;
  const [chk, setchk] = useState<Boolean>(false);
  const [chkhaspin, setchkhaspin] = useState<Boolean>(false);
  const [valpin, setvalpin] = useState<String>("");
  const [repin, setrepin] = useState<String>("");
  const [notiPin, setnotiPin] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    alert(User_Data.haspin);
    if (User_Data.haspin === false) {
      setchkhaspin(true);
    } else {
      setchkhaspin(false);
    }
  }, []);
  const fnreturn = (data) => {
    setchkhaspin(data);
  };
  const fnrepin = (data) => {
    setnotiPin(data);
  };
  const returnpin = (data) => {
    setrepin(data);
  };
  return (
    <div className="p-3">
      {" "}
      {!chkhaspin ? (
        <>
          <div className="text-2xl text-center">{t("Check Pin")}</div>
          <div className="p-3">
            <CheckPin fn={fnreturn} />
          </div>
        </>
      ) : (
        <>
          {repin === "" ? (
            <div>
              {t("Set Pin")}
              <SetPin fn={returnpin} />
            </div>
          ) : (
            <div>
              {t("Re Enter Pin")}
              <RePin nav={navlink} fn={fnrepin} data={repin} />
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
