import { Gallery, Popup, ScrollView, Toast } from "devextreme-react";
import { custom } from "devextreme/ui/dialog";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoilState, useRecoilState } from "recoil";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { MsgOK } from "../../MainCall/dialog";
import { GetdataAPI } from "../../MainCall/MainCall";
import { countcart } from "../../Recoil/CartRecoil";

//------------------------------------------- -DevStore/interface ------------------------------------------
interface ToasttypeFace {
  type?: "custom" | "error" | "info" | "success" | "warning";
}
//------------------------------------------- ตัวแปร ------------------------------------------
const PopupImg = forwardRef<any, any>((props, ref) => {
  //ตัวแปร
  const { data, toggle, fntoggle, fetchMoreData, more } = props;
  const [ToastVisible, setToastVisible] = React.useState(false);
  const [ToastType, setToastType] = React.useState<ToasttypeFace>({
    type: "info",
  });
  const [Toastmessage, setToastmessage] = React.useState("");
  const navigate = useNavigate();
  const [dataimg, setdataimg] = useState([]);
  const [numcount, setnumcount] = useRecoilState(countcart);

  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    const d = data.filter((i) => {
      return i.Rownumber >= 1 && i.Rownumber <= 10;
    });
    setdataimg(d);
  }, []);

  //------------------------------------------- function ------------------------------------------

  const AddCart = (slist_id) => {
    GetdataAPI("/api/MemoryBox/AddItemToCart", {
      CompId: "1",
      slist_id: slist_id,
      ItemId: 0,
      Qty: "1",
    }).then(async (res) => {
      if (res.Status === "Success") {
        setnumcount(res.Data.length);
        setToastVisible(true);
        setToastType({ type: "success" });
        setToastmessage("เพิ่มสำเร็จ");
      } else if (res.Message === "item already exists.") {
        MsgOK("แจ้งเตือน", "มีภาพในตะกร้าแล้ว");
      }
    });
  };
  function onHiding(e) {
    setToastVisible(false);
  }
  const Gallery_onSelectionChanged = (e) => {
    const num = e.addedItems[0].Rownumber;
    console.log(data);

    if (more) {
      if (num + 3 > data[data.length - 1].Rownumber) {
        console.log("fetchMoreData");

        fetchMoreData();
      }
    }
    const d = data.filter((i) => {
      return i.Rownumber >= num - 3 && i.Rownumber <= num + 3;
    });
    setdataimg(d);
  };

  const slide = (item, index) => {
    return (
      <>
        <div className="grid justify-end col-cols-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-end after:pt-[75%] after:block after:content-[''] relative">
          <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 h-[85vh]">
            <img
              src={item.img_path}
              className="rounded-lg object-cover object-center w-full h-full h-[100%]"
            />
            <div
              className="flex items-center absolute bottom-0 right-0 m-8"
              onClick={() => AddCart(item.slist_id)}
            >
              <div className="flex items-center rounded-full bg-white drop-shadow-md rounded-full px-[12px] py-[11px] shadow-sm shadow-gray-200">
                <span className="text-white ">
                  {" "}
                  <svg
                    className="h-6 w-6 text-blue-500 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  //------------------------------------------- HTML ------------------------------------------
  return (
    <>
      <Popup
        position="center"
        showCloseButton={true}
        visible={toggle}
        fullScreen={true}
        closeOnOutsideClick={true}
        onHiding={fntoggle}
        /* contentRender={renderContent} */
        resizeEnabled={true}
        width={460}
        height="90%"
      >
        <ScrollView
          id="scrollview"
          scrollByContent={true}
          bounceEnabled={false}
          showScrollbar="onScroll"
          scrollByThumb={true}
        >
          <div className="">
            <Gallery
              id="gallery"
              itemRender={slide}
              dataSource={dataimg}
              loop={false}
              showNavButtons={false}
              showIndicator={false}
              onSelectionChanged={Gallery_onSelectionChanged}
              ref={ref}
            />
          </div>
        </ScrollView>
      </Popup>
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
    </>
  );
});

export default PopupImg;
