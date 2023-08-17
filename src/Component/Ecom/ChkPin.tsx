import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PinInput } from "react-input-pin-code";
import { useNavigate } from "react-router-dom";
import { GetdataAPI } from "../../MainCall/MainCall";
export default function CheckPin(props) {
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  const [noti, setnoti] = useState<boolean>(false);

  //------------------------function--------------------------
  const Complete = (valpin) => {
    setValues(["", "", "", "", "", ""]);
    GetdataAPI("/api/Main/CheckPinTrueOrFalse", {
      user_pin: valpin.join(""),
    }).then(async (res) => {
      if (res.Status === "failure") {
      }
      if (res.Status === "Success") {
        if (res.Data === "True") {
          props.fn(true);
        } else {
          setnoti(true);
          alert("รหัสผิด");
        }
      } else if (res.Status === "Err") {
      }
    });
  };
  const ChangePin = (value, index, values) => {
    let valpin = [];
    return setValues(values), (valpin[index] = value);
  };

  //------------------------HTML------------------------------
  return (
    <>
      <PinInput
        values={values}
        mask
        placeholder="_"
        inputStyle={{ width: "100%" }}
        onChange={ChangePin}
        onComplete={Complete}
      />
      {noti ? (
        <label className="block text-sm font-medium text-red-600 mb-3">
          {t("Pin ไม่ถูกต้อง")}
        </label>
      ) : (
        ""
      )}
    </>
  );
}
