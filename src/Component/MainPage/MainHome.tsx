import { useNavigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Islogin, OnlineFace, OnlineRec } from "../../Recoil/MainRecoil";
import { cart_data, countcart } from "../../Recoil/CartRecoil";
import Auth from "../../MainCall/Auth";
import { Toast } from "devextreme-react";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupPDPA from "../Ecom/PopupPDPA";

//------------------------------------------- -DevStore/interface ------------------------------------------
interface ToasttypeFace {
  type?: "custom" | "error" | "info" | "success" | "warning";
}
export default function MainHome() {
  //------------------------ตัวแปร-----------------------------
  const [Online, setOnline] = useRecoilState<OnlineFace>(OnlineRec);
  const navigate = useNavigate();
  const [ToastVisible, setToastVisible] = React.useState(false);
  const [ToastType, setToastType] = React.useState<ToasttypeFace>({
    type: "info",
  });
  const [Toastmessage, setToastmessage] = React.useState("");
  const [numcount, setnumcount] = useRecoilState(countcart);
  const [popup, setpopup] = React.useState(false);
  const [cartdata, setcartdata] = useRecoilState(cart_data);
  //------------------------onload----------------------------
  useEffect(() => {
    if (localStorage.getItem("chk") !== "0") {
      setpopup(true);
    }
    const uri = window.location.href;

    Auth.CurrentUser().then((res) => {
      if (res !== "") {
        GetdataAPI("/api/MainSale/SelectItemCart", {}).then((res) => {
          if (res.Status === "Success") {
            setnumcount(res.Data.length);
            setcartdata(res.Data);
          }
        });
      }
    });

    window.addEventListener("offline", fnsetOffline);
    window.addEventListener("online", fnsetOnline);
    return () => {
      window.removeEventListener("offline", fnsetOffline);
      window.removeEventListener("online", fnsetOnline);
    };
  }, []);

  useEffect(() => {
    if (Online.isOnline === true && Online.Prev === false) {
      setToastVisible(true);
      setToastType({ type: "success" });
      setToastmessage("Online");
    } else if (Online.isOnline === false) {
      setToastVisible(true);
      setToastType({ type: "error" });
      setToastmessage("Offline");
    }
  }, [Online]);

  //------------------------function--------------------------
  const fnsetOnline = () => {
    setOnline({ isOnline: true, Prev: false });
  };
  const fnsetOffline = () => {
    setOnline({ isOnline: false, Prev: true });
  };

  function onHiding(e) {
    if (Online.isOnline === true) {
      setToastVisible(false);
    } else {
      e.cancel = true;
    }
  }
  const toggle = () => {
    setpopup(!popup);
  };

  //------------------------HTML------------------------------

  return (
    <>
      <Toast
        animation={{
          show: { type: "fade", duration: 400, from: 0, to: 1 },
          hide: { type: "fade", duration: 1000, from: 1, to: 0 },
        }}
        position={{
          my: { x: "center", y: "top" },
          at: { x: "center", y: "top" },
          of: window,
          offset: "0 10",
        }}
        visible={ToastVisible}
        message={Toastmessage}
        type={ToastType.type}
        onHiding={onHiding}
        displayTime={600}
      />
      <div className="max-h-screen">
        <div className={popup ? "" : "hidden"}>
          <PopupPDPA toggle={popup} fntoggle={toggle} />
        </div>
        <div className={popup ? "hidden" : ""}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
