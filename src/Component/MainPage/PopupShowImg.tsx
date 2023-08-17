import { Popup } from "devextreme-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function PopupShowImg(props) {
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
  const { t } = useTranslation();
  //------------------------------------------- function ------------------------------------------
  const renderContentConfrim = () => {
    return (
      <div className="grid justify-end col-cols-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-end after:pt-[75%] after:block after:content-[''] relative">
        <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 h-[85vh]">
          <img
            src={props.img_path}
            className="rounded-lg object-cover object-center w-full h-full h-[100%]"
          />
        </div>
      </div>
    );
  };
  //------------------------------------------- HTML ------------------------------------------
  return (
    <>
      <Popup
        position="bottom"
        showCloseButton={true}
        fullScreen={true}
        onHiding={props.toggle}
        visible={props.data}
        closeOnOutsideClick={true}
        contentRender={renderContentConfrim}
        resizeEnabled={false}
        height="auto"
        width="100%"
        animation={popup_config}
      />
    </>
  );
}
