import React, { useRef, useState, useEffect } from "react";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import "swiper/css";
import "swiper/css/pagination";
import { useLocation } from "react-router-dom";
import "../../App.css";
import "../../css/Custom.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import PopupEditImg from "./PopupEditImg";
import { resizeImg } from "../../MainCall/MainCall";
import ImgProfile from "../../image/user.png";
import Auth from "../../MainCall/Auth";
import { countcart } from "../../Recoil/CartRecoil";
export default function Account() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const navigate = useNavigate();
  interface LocationState {
    rate_id: number;
    num: number;
  }
  const tab = useRef(null);
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  const [telnum, settelnum] = useState("");
  const [Email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const [image, setImage] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>();
  const [isPopup, setPopup] = useState<boolean>(false);
  const js = {
    data: [
      {
        id: "1",
        text: "ChangeEmail",
        icon: "far fa-envelope",
      },
      {
        id: "2",
        text: "ChangePhoneNumber",
        icon: "far fa-mobile-alt",
      },
      {
        id: "3",
        text: "ChangePin",
        icon: "far fa-key",
      },
      {
        id: "4",
        text: "ChangePassWord",
        icon: "far fa-unlock-alt",
      },
      {
        id: "5",
        text: "Logout",
        icon: "fas fa-sign-out",
        icon2: "",
      },
    ],
  };
  const [numcount, setnumcount] = useRecoilState(countcart);
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {}, []);
  //------------------------------------------- funtion ------------------------------------------
  const ChangeEmail = () => {
    navigate("../ChangeEmailpath", {
      state: {
        num: 0,
        tel: telnum,
        email: Email,
        pass: pass,
      },
    });
  };
  const ChangePhoneNumber = () => {
    navigate("../ChangePhoneNumber", {
      state: {
        num: 0,
        tel: telnum,
        email: Email,
        pass: pass,
      },
    });
  };
  const ChangePin = () => {
    navigate("../Pin", {
      state: {
        num: 0,
        tel: telnum,
        email: Email,
        pass: pass,
      },
    });
  };
  const ChangePass = () => {
    navigate("../Changepassword", {
      state: {
        num: 0,
        tel: telnum,
        email: Email,
        pass: pass,
      },
    });
  };
  const ToggleEditImg = () => {
    setPopup(!isPopup);
  };
  const Toggle = () => {
    setPopup(false);
  };
  const Logout = () => {
    setnumcount(0);
    Auth.LogOut();
    navigate("/");
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <div className="grid grid-cols-12 p-5">
      <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
        <div className="grid grid-cols-12 gap-5 bg-white">
          <div className="pt-0 grid col-span-12 ">
            <>
              <div className="flex items-center justify-center space-x-8">
                {User_Data.user_img ? (
                  <>
                    <div className="relative">
                      <img
                        className="w-24 h-24 rounded-full cursor-pointer"
                        src={"data:image/jpeg;base64," + User_Data.user_img}
                        style={{ objectFit: "cover" }}
                        onClick={(event) => {
                          event.preventDefault();
                          fileInputRef.current.click();
                        }}
                      />
                      <div className="absolute p-1 bottom-0 right-0 rounded-full bg-white">
                        <i className="fas fa-camera-alt"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        fileInputRef.current.click();
                      }}
                    >
                      <img
                        className="w-24 h-24 rounded-full"
                        src={ImgProfile}
                        alt="Logo"
                      />
                    </button>
                    <div className="absolute p-1 bottom-0 right-0 rounded-full bg-white">
                      <i className="fas fa-camera-alt"></i>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    resizeImg(file, 2048).then((res) => {
                      ToggleEditImg();
                      setImage(res);
                      event.target.value = null;
                    });
                  }}
                />
              </div>
              <PopupEditImg
                img={image}
                data={isPopup}
                toggle={ToggleEditImg}
                close={Toggle}
              />
            </>
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 text-center">
            <div onClick={() => console.log(User_Data)}>
              Name : {User_Data.user_username}
            </div>
            <div>PhoneNumber : {User_Data.phonenumber}</div>
            <div>Email : {User_Data.user_email}</div>
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 border px-5 rounded-md mt-3">
            {js.data.map((item, i) => (
              <div key={item.id}>
                <div
                  className="grid grid-cols-12 py-3 border border-t-white border-r-white border-l-white hover:border-b-red-500 content-center"
                  onClick={() => {
                    if (item.id === "1") {
                      ChangeEmail();
                    } else if (item.id === "2") {
                      ChangePhoneNumber();
                    } else if (item.id === "3") {
                      ChangePin();
                    } else if (item.id === "4") {
                      ChangePass();
                    } else {
                      Logout();
                    }
                  }}
                >
                  <div className="col-span-3 content-center">
                    <div className="pl-2 text-2xl text-red-600">
                      <i className={item.icon}></i>
                    </div>
                  </div>
                  <div className="col-span-8 content-center">
                    <div className="text-lg">{item.text}</div>
                  </div>
                  <div className="col-span-1 content-center">
                    <div className="text-[16px] ">
                      <i
                        className={
                          item.id === "5" ? "" : "far fa-chevron-right"
                        }
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
