import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../MainCall/NumberFormat";
import { useTranslation } from "react-i18next";
import { GetdataAPI } from "../../MainCall/MainCall";
import { ReactComponent as Bin } from "../../image/SVG_Memorybox/Payment/Delete.svg";
import { ReactComponent as Creditcard } from "../../image/SVG_Memorybox/Payment/Credit_black.svg";
import { ReactComponent as Qr } from "../../image/SVG_Memorybox/Payment/QR_black.svg";
import { custom } from "devextreme/ui/dialog";
import PopupShowImg from "../MainPage/PopupShowImg";
import FormatDate from "../../MainCall/FormatDate";
import { useRecoilState } from "recoil";
import { count, countcart } from "../../Recoil/CartRecoil";
import { Popup } from "devextreme-react";
import { MsgOKCancel } from "../../MainCall/dialog";
export default function PendingPay(props) {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const { v4: uuidv4 } = require("uuid");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [skeleton_ar, setskeleton_ar] = useState([]);
  const [path, setpath] = useState("");
  const [Header_order_id, setHeader_order_id] = useState(0);
  const [toggle, settoggle] = useState(false);
  const [isPopupSelectTopup, setPopupSelectTopup] = useState<boolean>(false);
  const [TopupBy, setTopupBy] = useState<string>("");
  const popup_config = {
    hide: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: {
          my: "center" as const,
          at: "center" as const,
          of: window,
        },
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
        position: {
          my: "center" as const,
          at: "center" as const,
          of: window,
        },
      },
    },
  };
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    CeateSkeleton(3, 1);
  }, []);
  //------------------------------------------- funtion ------------------------------------------
  const CeateSkeleton = (hnum, inum) => {
    let ar = [];
    for (let i = 0; i < hnum; i++) {
      let newdata = { details: [] };
      for (let j = 0; j < inum; j++) {
        let details = { j: j };
        newdata.details.push(details);
      }
      ar.push(newdata);
    }
    setskeleton_ar(ar);
  };
  const Cancel = (order_id) => {
    MsgOKCancel("ยืนยันการลบ", "คุณต้องการลบรายการนี้หรือไม่").then((res) => {
      if (res === "OK") {
        GetdataAPI("/api/MainSale/CancelOrder", {
          order_id: order_id,
        }).then((res) => {
          if (res.Status === "Success") {
            props.fn_refreshSO();
          }
        });
      }
    });
  };

  const togglePopupSelectTopup = () => {
    setPopupSelectTopup(!isPopupSelectTopup);
  };

  const ConfirmPay = (order_id) => {
    const orderpay = props.SOitem.filter((e) => {
      return e.order_id === order_id;
    });

    const numsum = orderpay.reduce((a, v) => (a = a + parseFloat(v.total)), 0);
    GetdataAPI("/api/MainSale/SelectOrderNotInv", {
      order_id: order_id,
    }).then((NotInv) => {
      if (NotInv.Status === "Success") {
        if (TopupBy === "Qrcode") {
          navigate("../TopupQrcode/", {
            state: {
              rate_id: 1,
              num: numsum,
              Data: NotInv.Data,
            },
          });
        }
        if (TopupBy === "Cradit card") {
          navigate("../TopupCreditcard/", {
            state: {
              rate_id: 1,
              num: numsum,
              Data: NotInv.Data,
            },
          });
        }
      } else {
        alert(NotInv.Message);
      }
    });
  };
  const showimg = (img_path) => {
    setpath(img_path);
    fntoggle();
  };
  const fntoggle = () => {
    settoggle(!toggle);
  };
  const setTopupCreditcard = () => {
    setTopupBy("Cradit card");
  };
  const setTopupQrcode = () => {
    setTopupBy("Qrcode");
  };
  const setPopupTrue = (id) => {
    setHeader_order_id(id);
    setPopupSelectTopup(true);
  };
  const setPopupFalse = () => {
    setPopupSelectTopup(false);
  };

  //------------------------------------------- HTML ------------------------------------------
  return (
    <>
      {props.isLoading ? (
        <div className="grid col-span-12 ">
          {skeleton_ar.map((itemh) => {
            return (
              <div key={uuidv4()}>
                <div className="grid grid-cols-12">
                  <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center text-xl"></div>
                </div>
                {itemh.details.map((item) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="grid grid-cols-12  px-2 py-3"
                    >
                      <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative">
                        <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                          <div className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit] bg-gray-300 animate-pulse" />
                        </div>
                      </div>
                      <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 pl-3">
                        <div className="grid grid-cols-12 gap-1">
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-20 h-3 xl:h-7 xl:w-36 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-16 h-3 xl:h-7 xl:w-32 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-12 h-3 xl:h-7 xl:w-20 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-12 h-3 xl:h-7 xl:w-36 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-16 h-3 xl:h-7 xl:w-24 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-16 h-5 xl:h-7 xl:w-48 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-16 h-3 xl:h-7 xl:w-36 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-12 h-3 xl:h-7 xl:w-20 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-8 h-3 xl:h-7 xl:w-24 rounded-md" />
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="bg-gray-300 animate-pulse w-16 h-3 xl:h-7 xl:w-24 rounded-md" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="grid grid-cols-12 px-3 py-1  gap-1">
                  <div className="grid col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-center font-bold ">
                    <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md" />
                  </div>
                  <div className="grid col-span-8  sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-center font-bold ">
                    <div className="bg-gray-300 animate-pulse w-full h-8 rounded-md" />
                  </div>
                  <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mt-2">
                    <div className=" border border-b-gray-300 border-t-white border-l-white border-r-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid col-span-12 p-3">
          {props.SOheader.map((itemh) => {
            return (
              <div key={uuidv4()}>
                <div className="grid grid-cols-12  px-2 pt-2">
                  <div className="grid col-span-12 content-center \">
                    <h3>Order Number {itemh.order_no}</h3>
                  </div>
                </div>
                {/* <div className="grid grid-cols-12 px-5">
                <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center text-xl"></div>
              </div> */}

                {props.SOitem.filter((i) => {
                  return i.order_id === itemh.order_id;
                }).map((item) => {
                  return (
                    <div
                      className="grid grid-cols-12  px-2 py-3"
                      key={uuidv4()}
                    >
                      <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative">
                        <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                          <img
                            className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                            onClick={() => {
                              showimg(item.img_path);
                            }}
                            src={item.img_path}
                          />
                        </div>
                      </div>
                      <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 pl-3">
                        <div className="grid grid-cols-12 ">
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg">
                              Date of order :
                            </div>
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg">
                              {FormatDate(item.order_date)}
                            </div>
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg">
                              Photo size :
                            </div>
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="flex items-center ">
                              <div className="flex  items-center rounded-full bg-[#2679FA]  drop-shadow-md rounded-full px-[11.5px] py-[5.5px] ">
                                <span className="text-white text-[14px]">
                                  {item.unitname}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/*  <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                              <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg">
                                Photo amount :
                              </div>
                            </div>
                            <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                              <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg">
                                {item.qty} photos
                              </div>
                            </div> */}
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg">
                              Total :
                            </div>
                          </div>
                          <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg">
                              ฿{item.total}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="grid grid-cols-12 px-2 py-1  gap-3">
                  <div className="grid content-center col-span-12">
                    <div className="text-[14px] md:text-lg lg:text-lg xl:text-lg text-end text-bold">
                      จำนวนเงินที่ต้องชำระ {NumberFormat(itemh.grand_total)} บาท
                    </div>
                  </div>
                  <div className="grid col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-center font-bold ">
                    <button
                      className="bg-[#E21D1D1A] text-[#E21D1D] border border-[#E21D1D] rounded-md py-1"
                      onClick={(e) => {
                        Cancel(itemh.order_id);
                      }}
                    >
                      ยกเลิก
                    </button>
                  </div>
                  <div className="grid col-span-8  sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-center font-bold ">
                    <button
                      className="bg-[#0062FA19] text-[#0062FA] border border-[#0062FA] rounded-md py-1"
                      onClick={(e) => {
                        setPopupTrue(itemh.order_id);
                      }}
                    >
                      ชำระเงิน
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-12 mt-2">
        <div className="grid col-span-12">
          <Popup
            position="bottom"
            visible={isPopupSelectTopup}
            closeOnOutsideClick={true}
            onHiding={togglePopupSelectTopup}
            contentRender={() => {
              return (
                <div className="grid grid-cols-12 gap-6 ">
                  {TopupBy === "Cradit card" ? (
                    <div
                      className="grid bg-slate-100 col-span-12 content-center  border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50 "
                      onClick={setTopupCreditcard}
                    >
                      <div className="grid grid-cols-12 px-3 py-3">
                        <div className="grid col-span-6">
                          <span className="inline-flex ">
                            <Creditcard />
                            <div className="grid content-center pl-2">
                              {t("Cradit card")}
                            </div>
                          </span>
                        </div>

                        <div className="grid justify-items-end content-center col-span-6 ">
                          <i className="fas fa-check  text-green-500"></i>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="grid  col-span-12 content-center border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50 "
                      onClick={setTopupCreditcard}
                    >
                      <div className="grid grid-cols-12 px-3 py-3">
                        <div className="grid col-span-6 ">
                          <span className="inline-flex">
                            <Creditcard />
                            <div className="grid content-center pl-2">
                              {t("Cradit card")}
                            </div>
                          </span>
                        </div>
                        <div className="grid justify-items-end content-center col-span-6 "></div>
                      </div>
                    </div>
                  )}

                  {TopupBy === "Qrcode" ? (
                    <div
                      className="grid bg-slate-100 col-span-12 content-center border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50 "
                      onClick={setTopupQrcode}
                    >
                      <div className="grid grid-cols-12 px-3 py-3">
                        <div className="grid col-span-6 ">
                          <span className="inline-flex ">
                            <Qr />
                            <div className="grid content-center text-md pl-2">
                              {t("Qrcode")}
                            </div>
                          </span>
                        </div>

                        <div className="grid justify-items-end content-center col-span-6 ">
                          <i className="fas fa-check text-green-500"></i>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="grid  col-span-12 content-center  border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50 "
                      onClick={setTopupQrcode}
                    >
                      <div className="grid grid-cols-12 px-3 py-3">
                        <div className="grid  col-span-6 ">
                          <span className="inline-flex ">
                            <Qr />
                            <div className="grid content-center text-md pl-2">
                              {t("Qrcode")}
                            </div>
                          </span>
                        </div>
                        <div className="grid justify-items-end content-center col-span-6 "></div>
                      </div>
                    </div>
                  )}

                  <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
                    <button
                      type="button"
                      className="btn-save"
                      onClick={() => {
                        ConfirmPay(Header_order_id);
                      }}
                    >
                      {t("Confirm")}
                    </button>
                  </div>
                </div>
              );
            }}
            title={t("เลือกวิธีการชำระ")}
            resizeEnabled={true}
            height="100%"
            width="100%"
            animation={popup_config}
          />
        </div>
      </div>
      <PopupShowImg toggle={fntoggle} data={toggle} img_path={path} />
    </>
  );
}
