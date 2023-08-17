import { Popup } from "devextreme-react/popup";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CheckPin from "./ChkPin";

export function Pincode(prop) {
  //------------------------ตัวแปร-----------------------------
  const [result, setresult] = React.useState("Cancel");
  const { t } = useTranslation();
  
  //------------------------function--------------------------
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
  const renderContentPin = () => {
    return (
      <>
        <CheckPin fn={returnfn} />
      </>
    );
  };
  const returnfn = (data) => {
    if (data) {
      prop.fnToggle();
      setresult("OK");
    } else {
      setresult("failed");
    }
  };
  const onhide = (e) => {
    if (result === "OK") {
      prop.fnReturn("OK");
      setresult("Cancel");
    } else if (result === "Cancel") {
      prop.fnReturn("Cancel");
      setresult("Cancel");
    } else {
      prop.fnReturn("failed");
      setresult("Cancel");
    }
  };

  //------------------------HTML------------------------------
  return (
    <>
      <Popup
        position="bottom"
        fullScreen={true}
        onHiding={onhide}
        visible={prop.data}
        closeOnOutsideClick={true}
        contentRender={renderContentPin}
        title={t("Enter Your Pin")}
        resizeEnabled={true}
        height="auto"
        width="100%"
        animation={popup_config}
      />
    </>
  );
}
