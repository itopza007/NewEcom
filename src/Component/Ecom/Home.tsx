import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  GetdataAPI,
  timeout,
  GetdataAPI_Outside,
} from "../../MainCall/MainCall";
import { countcart } from "../../Recoil/CartRecoil";
import Ads from "../MainPage/Ads";
import { ReactComponent as Basket_blue } from "../../image/SVG_Memorybox/Find Photo/Add_Basket_White.svg";
import {
  Gallery,
  List,
  Popup,
  ScrollView,
  TextBox,
  Toast,
} from "devextreme-react";
import { MsgOK, MsgOKCancel } from "../../MainCall/dialog";
import {
  userdata,
  UserState,
  userWebdata,
  Islogin,
} from "../../Recoil/MainRecoil";
import Auth from "../../MainCall/Auth";
import { active } from "../../Recoil/MenuRecoil";

//--------------------------------------------DevStore/interface ------------------------------------------
interface LocationState {
  img: string;
  cate: number;
}
interface ToasttypeFace {
  type?: "custom" | "error" | "info" | "success" | "warning";
}

export default function Home() {
  //------------------------------------------- useRef ------------------------------------------
  const Gallery_Ref = useRef(null);
  const searchVal = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  const [isLoadingpopup, setisLoadingpopup] = useState(false);
  const [numimg, setnumimg] = useState(0);
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const { v4: uuidv4 } = require("uuid");
  const [Datas, setDatas] = useState([]);
  const [salelist, setsalelist] = useState(0);
  const [pagecount, setpagecount] = useState(1);
  const [more, setmore] = useState(true);
  const [notiData, setnotiData] = useState(false);
  const [dataimg, setdataimg] = useState([]);
  const [dataimg2, setdataimg2] = useState([]);
  const [ToastVisible, setToastVisible] = useState(false);
  const [ToastType, setToastType] = useState<ToasttypeFace>({
    type: "info",
  });
  const [Toastmessage, setToastmessage] = useState("");
  const skeleton = [];
  const COUNTER = 8;
  const scope_image = 10;
  const RowsOfPage = scope_image * 2;
  const [cate, setcate] = useState("0");
  const js = {
    cate: [
      {
        id: "1",
        text: "Shoes",
        icon: "far fa-ice-skate",
      },
      {
        id: "2",
        text: "Shirt",
        icon: "far fa-tshirt",
      },
      {
        id: "3",
        text: "Cap",
        icon: "fal fa-hat-cowboy",
      },
      {
        id: "4",
        text: "Watch",
        icon: "fal fa-watch",
      },
      {
        id: "5",
        text: "Food",
        icon: "far fa-hamburger",
      },
    ],
    size: [
      {
        id: "1",
        text: "S",
      },
      {
        id: "1",
        text: "M",
      },
      {
        id: "1",
        text: "L",
      },
      {
        id: "1",
        text: "XL",
      },
      {
        id: "1",
        text: "2XL",
      },
      {
        id: "1",
        text: "3XL",
      },
    ],
  };
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  const [datasearch, setdatasearch] = useState(js.cate.map((e) => e.text));
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState(false);
  const [menuactive, setmenuactive] = useRecoilState(active);
  const [Login, setLogin] = useState(true);
  const [showimg, setshowimg] = useState("");

  const [numcount, setnumcount] = useRecoilState(countcart);
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    setmenuactive(1);
    fetchMoreData().then((res) => {
      console.log(res);
      if (res.Status === "Success") {
        if (res.Data.length === 0) {
          setmore(false);
          setnotiData(true);
        } else {
          const d = res.Data.filter((currentValue, index) => {
            return index <= scope_image;
          });
          let img = [];
          d.forEach((item) => {
            img.push(item.img_path);
          });
          setsalelist(d[0].slist_id);
          setdataimg(d);
          setdataimg2(img);
        }
      }
    });
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);
  //------------------------------------------- funtion ------------------------------------------
  const onBackButtonEvent = (e: any) => {
    console.log(e.state);
    console.log(window.location);
    // if (!finishStatuif (!e.state)
    if (e.state) {
      MsgOKCancel("แจ้งเตือน", "คุณต้องออกจากหน้านี้ใช่หรือไม่").then((res) => {
        if (res === "OK") {
          window.history.back();
        } else {
          window.history.pushState(null, "", window.location.pathname);
        }
      });
    } else {
      window.history.back();
    }
    // }
  };
  const fetchMoreData = async () => {
    const d = GetdataAPI_Outside("/api/Salelist/SelectDataSaleList", {
      pagenumber: pagecount,
      rowsofpage: RowsOfPage,
      category: 0,
      search: "",
      //Fileupload: StateInterface.img,
    }).then((res) => {
      console.log(res);
      if (res.Status === "Success") {
        if (res.Data.length === 0 && Datas.length > 0) {
          setmore(false);
          return;
        }
        console.log(pagecount);

        setDatas([...Datas, ...res.Data]);
        setpagecount(pagecount + 1);
        setnumimg(Datas.length + res.Data.length);
      }
      return res;
    });
    return d;
  };

  for (let i = 0; i < COUNTER; i++) {
    skeleton.push(
      <div
        key={uuidv4()}
        className="grid col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 content-center after:pt-[75%] after:block after:content-[''] relative postSk"
      >
        <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
          <div className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit] bg-gray-300 animate-pulse"></div>
          <div className="absolute  top-0 right-0 left-0 bottom-0 flex justify-end  items-end pb-1">
            <div className="rounded-full mr-1 p-0 ">
              <div className="w-5 h-5 bg-white animate-pulse rounded-full">
                {" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const toProductdetails = (
    img,
    name,
    details,
    slist_id,
    parentcomp,
    maxprice
  ) => {
    navigate({
      pathname: "/ProductDetails",
      search: `?${createSearchParams({
        slist_id: slist_id,
        details: details,
        img: img,
        name: name,
        parentcomp: parentcomp,
        maxprice: maxprice,
      })}`,
    });
  };

  function onHiding(e) {
    setToastVisible(false);
  }

  const Noti = () => {
    navigate("/Main/Notification");
  };
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div>
      <div className={isLoadingpopup ? "" : "hidden"}>
        <div className="overlay">
          <div className="overlay__inner">
            <div className="overlay__content">
              <div className="bounce">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={isLoadingpopup ? "" : ""}>
        <div className="grid grid-cols-12 gap-3 mt-0 border border-solid px-5 py-5  bg-white ">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
            <div className="grid grid-cols-12">
              {User_Data.user_username === undefined ? (
                <></>
              ) : (
                <>
                  <div className="grid col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-10 xl:col-span-10 content-center">
                    <div className="inline-flex">
                      <img
                        src={"data:image/jpeg;base64," + User_Data.user_img}
                        className="w-20 h-[auto] rounded-full"
                      />
                      <div className="pt-2 ml-2">
                        <div className="text-gray-600">Welcome</div>
                        <div className="font-semibold">
                          {User_Data.user_username}
                        </div>
                        <div className="font-semibold text-gray-600 flex">
                          <div className="mr-1">0.00</div>
                          <div className="text-red-500">COIN</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 content-center justify-end">
                    <button
                      className="relative border rounded-full w-10 h-10"
                      onClick={Noti}
                    >
                      <i className="relative far fa-bell text-xl"></i>
                      <span className="absolute top-0 right-0  text-[13px] inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#FF4A4A] text-white rounded-full w-[22px]">
                        3
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
            <div className="relative">
              <TextBox
                ref={searchVal}
                placeholder="Search your memory here..."
                onFocusIn={() => {
                  navigate("../Search");
                }}
              />
              <List dataSource={datasearch} height={"100%"} visible={search} />
              <div className="absolute right-2.5 bottom-[3px] text-lg text-red-500 font-bold cursor-pointer hover:text-red-700 active:text-red-900"></div>
            </div>
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
            <div className="grid grid-cols-10 gap-3">
              <div className="col-span-10">
                <div className="font-semibold text-gray-600">Categories</div>
              </div>
              {js.cate.map((item) => (
                <div className="col-span-2 justify-self-center" key={item.id}>
                  <button
                    type="button"
                    className={
                      cate === item.id
                        ? "rounded-full border-2 border-red-500 bg-red-500 text-white text-sm font-medium w-14 h-14"
                        : "rounded-full border-2 border-gray text-gray-500 text-sm font-medium  w-14 h-14"
                    }
                    onClick={() => setcate(item.id)}
                  >
                    <div className="text-base">
                      <i className={item.icon}></i>
                    </div>
                  </button>
                  <div
                    className={
                      cate === item.id
                        ? "text-center text-red-600 text-xs mt-1"
                        : "text-center text-gray-500 text-xs mt-1"
                    }
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
            <img
              className="rounded-xl"
              src="https://1.bp.blogspot.com/-MNRsnFygJ1Y/X6CUfpLnnKI/AAAAAAAAFu4/fkvw7PS_rhw7xLz2e7uPOjRqGpU6ejucgCNcBGAsYHQ/s1200/IMG-20201103-WA0000.jpg"
            />
          </div>
        </div>
        <div className="pb-[68px]">
          <div className={notiData ? "text-center" : "hidden"}>
            <label className="text-2xl">ไม่พบข้อมูล</label>
          </div>
          <InfiniteScroll
            key={uuidv4()}
            className="grid grid-cols-12 gap-3 border border-solid px-2 pb-0 pt-5  bg-gray-50"
            dataLength={Datas.length}
            next={fetchMoreData}
            hasMore={more}
            loader={skeleton}
            endMessage={""}
          >
            {Datas.map((item, idx) => (
              <div
                className="grid col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 content-start after:pb-[5%] border border-white rounded-lg bg-white"
                key={uuidv4()}
              >
                <div className="grid grid-cols-12">
                  <div
                    className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start after:pt-[75%] after:block after:content-[''] relative "
                    onClick={
                      (e) => {
                        toProductdetails(
                          item.img_path,
                          item.slist_name,
                          item.slist_details,
                          item.slist_id,
                          item.parentcomp_id,
                          item.maxprice
                        );
                        //openimg(e, item.slist_id);
                      } /* openimg(item.slist_id); */
                      /* !clicked
                          ? () => {
                              openimg(item.slist_id);
                            }
                          : null */
                    }
                  >
                    <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                      <img
                        alt=""
                        className=" object-cover w-[inherit] h-[170px] max-w-[inherit] max-h-[inherit]"
                        src={item.img_path}
                      />
                    </div>
                    <div className="absolute bottom-0 right-1">
                      {/*<button className="border h-7 w-7 rounded-full text-xs bg-red-100 text-red-600 font-bold" onClick={(e) => {
                          if (e && e.stopPropagation) e.stopPropagation();
                          AddCart(item.slist_id, item.parentcomp_id, idx);
                        }}><i className="fad fa-shopping-cart"></i></button>*/}
                    </div>
                  </div>
                  <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-1 py-1 px-2">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                        <div className="font-medium text-gray-700 line-clamp-2 h-12">
                          {item.slist_name}
                        </div>
                      </div>
                      {/*<div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-2">
                          <div className="font-medium text-gray-400 text-sm" >รหัส {item.slist_id}</div>
                        </div>*/}
                      <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center">
                        <div className="flex">
                          <div className="text-red-500 text-start text-xl mr-1 font-semibold">
                            ฿
                          </div>
                          <div className="text-red-500 text-start text-xl font-semibold">
                            {item.maxprice}
                          </div>
                          <div className="text-gray-500 text-start text-xs pt-[6px] pl-1">
                            (501)
                          </div>
                        </div>
                      </div>
                      <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center justify-self-end">
                        <div className="font-medium bg-red-100 text-red-600 w-10 h-5 text-sm rounded-lg">
                          <div className="text-center">0{item.slist_id}%</div>
                        </div>
                      </div>
                      <div className="grid col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 xl:col-span-5 content-center">
                        <div className="flex">
                          <span className="fa fa-star text-yellow-500 text-xs"></span>
                          <span className="fa fa-star text-yellow-500 text-xs"></span>
                          <span className="fa fa-star text-yellow-500 text-xs"></span>
                          <span className="fa fa-star text-yellow-500 text-xs"></span>
                          <span className="fa fa-star text-xs"></span>
                        </div>
                      </div>
                      <div className="grid col-span-7 sm:col-span-7 md:col-span-7 lg:col-span-7 xl:col-span-7 content-center">
                        <div className="text-xs text-red-600 pl-2">
                          (Sell ​​500 pcs)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>

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
    </div>
  );
}
