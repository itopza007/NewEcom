import React, { useState } from "react";
import { Popup } from "devextreme-react/popup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export default function PopupClock(props) {
  //------------------------ตัวแปร-----------------------------
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
  const navigate = useNavigate();
  const { t } = useTranslation();

  //------------------------function--------------------------
  const renderContentConfrim = () => {
    return (
      <div>
        <div className="grid grid-cols-12 gap-3 mb-4">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <img
              src="https://owascovolkswagen.ca/wp-content/uploads/sites/2/2018/11/TIMER.gif"
              height="50"
            />
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 justify-center text-2xl">
            {t("รอดำเนินการ")}
          </div>
        </div>
      </div>
    );
  };

  //------------------------HTML------------------------------
  return (
    <Popup
      position="bottom"
      fullScreen={true}
      visible={props.data}
      closeOnOutsideClick={false}
      contentRender={renderContentConfrim}
      resizeEnabled={false}
      height="auto"
      width="100%"
      animation={popup_config}
    />
  );
}
