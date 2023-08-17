import React from "react";
import { Popup } from "devextreme-react/popup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import pic1 from "../../image/user.png";
import { GetdataAPI } from "../../MainCall/MainCall";
import Auth from "../../MainCall/Auth";

export default function PopupEditImg(props) {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [result, setresult] = React.useState("Cancel");
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

  //------------------------------------------- funtion ------------------------------------------

  const saveImg = () => {
    GetdataAPI("/api/Main/EditProfile", {
      user_img: props.img.replace("data:image/jpeg;base64,", ""),
    }).then(async (res) => {
      if (res.Status === "Success") {
        Auth.RefreshDataUser();
      } else {
      }
    });
  };

  const OK = () => {
    props.toggle();
    saveImg();
  };

  const CANCEL = () => {
    //props.toggle();
    //setresult("Cancel");
  };

  const renderContentConfrim = () => {
    return (
      <div>
        <div className="grid grid-cols-12 gap-3 mb-4">
          <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
            <img
              className="rounded-full cursor-pointer center"
              src={props.img}
              style={{ height: "200px", width: "200px", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 absolute inset-x-0 bottom-5 mx-5 gap-5">
          <div className="pt-0 grid col-span-6 content-center">
            <button className="btn-save" onClick={OK}>
              {t("Confirm")}
            </button>
          </div>
          <div className="pt-0 grid col-span-6 content-center">
            <button className="btn-save" onClick={CANCEL}>
              {t("Cancel")}
            </button>
          </div>
        </div>
      </div>
    );
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <Popup
      position="bottom"
      fullScreen={true}
      onHiding={props.close}
      visible={props.data}
      closeOnOutsideClick={true}
      contentRender={renderContentConfrim}
      resizeEnabled={false}
      height="auto"
      width="100%"
      animation={popup_config}
    />
  );
}
