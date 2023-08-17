import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Home } from "../../image/SVG_Memorybox/Navbar Bottom sticky/Home.svg";
import { ReactComponent as Cart } from "../../image/SVG_Memorybox/Navbar Bottom sticky/Basket.svg";
import { ReactComponent as HistoryIcon } from "../../image/SVG_Memorybox/Navbar Bottom sticky/Photo.svg";
import { ReactComponent as UserIcon } from "../../image/SVG_Memorybox/Navbar Bottom sticky/Account_Grey.svg";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol2.svg";
import { ReactComponent as Pay } from "../../image/SVG_Memorybox/Payment/Payment_Blue25.svg";
import { cart_data, countcart, FindIMG } from "../../Recoil/CartRecoil";
import { useRecoilState } from "recoil";
import { GetdataAPI } from "../../MainCall/MainCall";
import { active } from "../../Recoil/MenuRecoil";
import Auth from "../../MainCall/Auth";

export default function MenuBottom(props) {
  //------------------------------------ตัวแปร---------------------------------------------
  const navigate = useNavigate();
  const [numcount, setnumcount] = useRecoilState(countcart);

  const [img, setimg] = useRecoilState(FindIMG);
  const [cartdata, setcartdata] = useRecoilState(cart_data);
  const [menuactive, setmenuactive] = useRecoilState(active);
  const [numNoti, setnumNoti] = useState(0);

  useEffect(() => {}, []);

  const Home = () => {
    setmenuactive(1);
    navigate("/", {
      state: {
        cate: img.cate,
        img: img.img,
      },
    });
  };
  const ToCart = () => {
    setmenuactive(2);
    navigate("/Main/Cart");
  };
  const History = () => {
    setmenuactive(3);
    navigate("/Main/History");
  };
  const Noti = () => {
    setmenuactive(4);
    navigate("/Main/Notification");
  };

  const MyProfile = () => {
    setmenuactive(5);
    navigate("/Main/MyProfile", {
      state: {
        num: 0,
      },
    });
  };

  //------------------------------------ HTML ---------------------------------------------
  return (
    <section
      id="bottom-navigation"
      className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
    >
      <div id="tabs" className="flex justify-between p-2">
        <a
          onClick={Home}
          className={
            menuactive === 1
              ? "text-red-600 w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
              : "w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <UpimgIcon
            className={
              menuactive === 1
                ? "fill-red-600 inline h-[20px] w-[auto]"
                : "inline h-[20px] w-[auto]"
            }
          />
          {/* <Home className="inline h-[auto] w-[20px] " /> */}
          {/* <img src={home} className="inline h-[auto] w-[30px] menunav" /> */}
          {/* <i className="fal fa-2x fa-home"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            Home
          </span>
        </a>
        <a
          onClick={ToCart}
          className={
            menuactive === 2
              ? " text-red-600 relative w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
              : "relative w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <Cart
            className={
              menuactive === 2
                ? "fill-red-600 relative inline h-[20px] w-[auto]"
                : "relative inline h-[20px] w-[auto]"
            }
          />
          <span
            className={
              numcount != 0
                ? "absolute top-1 right-5 text-[13px] inline-block py-1 px-1 leading-none  text-center whitespace-nowrap align-baseline font-bold bg-[#FF4A4A] text-white rounded-full w-[22px]"
                : "absolute invisible "
            }
          >
            {numcount}
          </span>

          {/* <i className="fal fa-2x fa-shopping-cart"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            Basket
          </span>
        </a>
        <a
          onClick={History}
          className={
            menuactive === 3
              ? " text-red-600 w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
              : "w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <Pay
            className={
              menuactive === 3
                ? "fill-red-600 inline h-[20px] w-[auto]"
                : "inline h-[20px] w-[auto]"
            }
          />
          {/* <i className="fal fa-2x fa-history"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            History
          </span>
        </a>

        <a
          onClick={Noti}
          className={
            menuactive === 4
              ? " text-red-600 relative w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
              : "relative w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <i
            className={
              menuactive === 4
                ? "far fa-bell fill-red-600 relative inline h-[20px] w-[auto]"
                : "far fa-bell relative inline h-[20px] w-[auto]"
            }
          />
          <span
            className={
              numcount != 0
                ? "absolute top-1 right-5 text-[13px] inline-block py-1 px-1 leading-none  text-center whitespace-nowrap align-baseline font-bold bg-[#FF4A4A] text-white rounded-full w-[22px]"
                : "absolute invisible "
            }
          >
            {numNoti}
          </span>

          {/* <i className="fal fa-2x fa-shopping-cart"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            แจ้งเตือน
          </span>
        </a>

        <a
          onClick={MyProfile}
          className={
            menuactive === 5
              ? " text-red-600 w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
              : "w-full menunav focus:text-red-600 hover:text-red-600 justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <UserIcon
            className={
              menuactive === 5
                ? "fill-red-600 inline h-[20px] w-[auto]"
                : "inline h-[20px] w-[auto]"
            }
          />

          {/* <i className="fal fa-2x fa-user"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            Profile
          </span>
        </a>
      </div>
    </section>
  );
}
