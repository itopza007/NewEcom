import React, { useRef, useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { useLocation } from "react-router-dom";
import "../../App.css";
import "../../css/Custom.css";
import ImgProfile from "../../image/user.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MBluecoin } from "../../image/SVG_Memorybox/Account/Review/MCoin.svg";
import { useRecoilValue } from "recoil";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import { resizeImg } from "../../MainCall/MainCall";
import PopupEditImg from "./PopupEditImg";
import { active } from "../../Recoil/MenuRecoil";
import { useRecoilState } from "recoil";
//--------------------------------------------DevStore/interface ------------------------------------------
interface LocationState {
  rate_id: number;
  num: number;
}
export default function MyProfile() {
  //------------------------------------------- useRef ------------------------------------------
  const fileInputRef = useRef<HTMLInputElement>();
  //------------------------------------------- ตัวแปร ------------------------------------------

  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  const [menuactive, setmenuactive] = useRecoilState(active);
  const js = {
    data1: [
      {
        id: "1",
        text: "My Address",
        icon: "far fa-map-marked-alt",
      },
      {
        id: "2",
        text: "Account",
        icon: "far fa-user-alt",
      },
    ],
    data2: [
      {
        id: "1",
        text: "Notification",
        icon: "far fa-bell",
      },
      {
        id: "2",
        text: "Devices",
        icon: "fas fa-tablet-android-alt",
      },

      {
        id: "4",
        text: "Language",
        icon: "fal fa-globe",
      },
      {
        id: "5",
        text: "Track Order",
        icon: "far fa-truck",
      },
    ],
  };
  //--------------------------------------------onload ------------------------------------------
  useEffect(() => {
    setmenuactive(5);
  }, []);

  //------------------------------------------- funtion ------------------------------------------
  const ChangeAccout = (item) => {
    if (item.id === "1") {
      navigate("../MyAddress");
    } else if (item.id === "2") {
      navigate("../Account");
    }
  };

  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="grid grid-cols-12 gap-5 pb-20 mt-10 flex mx-5">
      <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
        <div className="grid grid-cols-12 gap-7">
          <div className="pt-0 grid col-span-12 ">
            <div className="flex items-center justify-center space-x-8">
              <img
                className="w-24 h-24 rounded-full cursor-pointer"
                src={"data:image/jpeg;base64," + User_Data.user_img}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 justify-items-center">
            <div className="text-2xl font-semibold text-center mb-5">
              {User_Data.user_username}
            </div>

            <span className="inline-flex items-baseline">
              <span>
                <div className="grid grid-cols-12 ">
                  <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 justify-items-center">
                    <div className="font-semibold text-orange-600 text-[30px] flex">
                      <i className="far fa-wallet"></i>
                    </div>
                    <div>Pay</div>
                    <div className="text-orange-600 font-semibold">฿548.52</div>
                  </div>
                </div>
              </span>
              <span>
                <div className="px-5"></div>
              </span>
              <span>
                <div className="grid grid-cols-12 ">
                  <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 justify-items-center">
                    <div className="font-semibold text-yellow-500 text-[30px] flex">
                      <i className="far fa-coins"></i>
                    </div>
                    <div>Coins</div>
                    <div className="text-yellow-500  font-semibold">฿22.49</div>
                  </div>
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 border px-5 rounded-md mt-3">
        {js.data1.map((item, i) => (
          <div key={item.id}>
            <div
              className="grid grid-cols-12 py-3 border border-t-white border-r-white border-l-white hover:border-b-red-500"
              onClick={() => {
                ChangeAccout(item);
              }}
            >
              <div className="col-span-3 content-center">
                <div className="pl-2 text-2xl text-red-600">
                  <i className={item.icon}></i>
                </div>
              </div>
              <div className="col-span-8 content-center">
                <div className="text-xl">{item.text}</div>
              </div>
              <div className="col-span-1 content-center">
                <div className="text-[16px] ">
                  <i className="far fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid col-span-12">
        <hr />
      </div>
      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 border px-5 rounded-md">
        {js.data2.map((item, i) => (
          <div key={item.id}>
            <div
              className="grid grid-cols-12 py-3 border border-t-white border-r-white border-l-white hover:border-b-red-500"
              onClick={() => {
                if (item.id === "5") {
                  navigate("../TrackOrder");
                }
              }}
            >
              <div className="col-span-3 content-center">
                <div className="pl-2 text-2xl text-red-600">
                  <i className={item.icon}></i>
                </div>
              </div>
              <div className="col-span-8 content-center">
                <div className="text-xl">{item.text}</div>
              </div>
              <div className="col-span-1 content-center">
                <div className="text-[16px] ">
                  <i className="far fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
