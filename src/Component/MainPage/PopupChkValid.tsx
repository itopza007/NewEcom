import React, { useState } from "react";
import { Popup } from "devextreme-react/popup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export default function PopupChkValid(props) {
  //------------------------------------------- ตัวแปร ------------------------------------------
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
  const [result, setresult] = React.useState("Cancel");
  //------------------------------------------- funtion ------------------------------------------
  const renderContentConfrim = () => {
    return (
      <div>
        <div className="grid grid-cols-12 gap-3 mb-4">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center ">
            <img
              src="https://cdn.dribbble.com/users/4706493/screenshots/12030666/media/a2f7c5750368109158cde153c874aa81.gif"
              height="50"
            />
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 justify-center text-2xl">
            {t("Check Valid")}
          </div>
        </div>
        <div className="grid grid-cols-12 absolute inset-x-0 bottom-5 mx-5">
          <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
            <button
              className="btn-save"
              onClick={() => navigate("../Profilemenu/Editprofile")}
            >
              {t("Please Valid")}
            </button>
          </div>
        </div>
      </div>
    );
  };
  //------------------------------------------- HTML ------------------------------------------
  return (
    <>
      <Popup
        position="bottom"
        fullScreen={true}
        onHiding={props.toggle}
        visible={props.data}
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
