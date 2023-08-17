import React, { useRef, useState, useEffect, useReducer } from "react";
import { NumberFormat } from "../../MainCall/NumberFormat";
import { useTranslation } from "react-i18next";
import { Popup } from "devextreme-react/popup";
import { ReactComponent as Qr } from "../../image/SVG_Memorybox/Payment/QR_black.svg";
import { ReactComponent as Creditcard } from "../../image/SVG_Memorybox/Payment/Credit_black.svg";
import Ads from "../MainPage/Ads";
import { ReactComponent as Cart } from "../../image/SVG_Memorybox/Payment/Basket_Blue.svg";
import { ReactComponent as InforIcon } from "../../image/SVG_Memorybox/Payment/information_Blue25.svg";
import { ReactComponent as PayIcon } from "../../image/SVG_Memorybox/Payment/Payment_Blue25.svg";
import { GetdataAPI } from "../../MainCall/MainCall";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Bin } from "../../image/SVG_Memorybox/Payment/Delete.svg";
import {
  DataGrid,
  DropDownBox,
  ScrollView,
  TextArea,
  TextBox,
} from "devextreme-react";
import ArrayStore from "devextreme/data/array_store";
import {
  FilterRow,
  Paging,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import { MsgOK, MsgOKCancel } from "../../MainCall/dialog";
import { cart_data, countcart } from "../../Recoil/CartRecoil";
import { useRecoilState } from "recoil";

//--------------------------------------------DevStore/interface ------------------------------------------
const Datas = [];
const gridDataSource = new ArrayStore({
  data: Datas,
  key: "a1",
});
export default function Pay(props) {
  //------------------------------------------- useRef ------------------------------------------
  const name = useRef(null);
  const tel = useRef(null);
  const address = useRef(null);
  const addresstext = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const [item, setitem] = useState([]);
  const [numsum, setnumsum] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isPopupSelectTopup, setPopupSelectTopup] = useState<boolean>(false);
  const [isPopupAddress, setPopupAddress] = useState<boolean>(false);
  const [TopupBy, setTopupBy] = useState<string>("");
  const post = [];
  const skeleton = [];
  const slist = [];
  const [isLoading, setIsLoading] = useState(true);
  const [chkAdress, setchkAdress] = useState(false);
  let location: any = useLocation();
  let params = useParams();
  const [btnAddress, setbtnAddress] = useState<string>("1");
  let ItemSelect = location.state.Item; //รูปที่ส่งเข้ามา
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
  const DateNow = new Date();
  const [gridBoxValue, setgridBoxValue] = useState([0]);
  const [isGridBoxOpened, setisGridBoxOpened] = useState<boolean>(false);
  const [addressPage, setaddressPage] = useState<boolean>(false);
  const js = {
    Showaddress: [
      {
        id: 1,
        name: "วัชรพล พร้อมกระโทก",
        tel: "0883630631",
        area: "151/1 ม.3 ต.โชคชัย อ.โชคชัย",
        county: "นครราชสีมา",
        zip: "30190",
        district: "อำเภอโชคชัย",
      },
    ],
    address: [
      {
        id: "1",
        name: "วัชรพล พร้อมกระโทก",
        tel: "0883630631",
        area: "151/1 ม.3 ต.โชคชัย อ.โชคชัย",
        county: "นครราชสีมา",
        zip: "30190",
        district: "อำเภอโชคชัย",
      },
      {
        id: "2",
        name: "วัชรพล พร้อมกระโทก",
        tel: "0883630631",
        area: "151/1 ม.3 ต.โชคชัย อ.โชคชัย",
        county: "นครราชสีมา",
        zip: "30190",
        district: "อำเภอโชคชัย",
      },
    ],
  };
  const [numcount, setnumcount] = useRecoilState(countcart);
  const [cartdata, setcartdata] = useRecoilState(cart_data);
  //------------------------onload----------------------------
  useEffect(() => {
    GetdataAPI("/api/MainSale/SelectItemCart", {}).then((res) => {
      setitem(res.Data);
    });
    setIsLoading(true);
    setTimeout(stopLoad, 2000);
  }, []);
  useEffect(() => {
    console.log(ItemSelect);
    setnumsum(ItemSelect.reduce((a, v) => (a = a + v.price_total * v.qty), 0));
  }, [item]);

  //------------------------function--------------------------
  const togglePopupSelectTopup = () => {
    setPopupSelectTopup(!isPopupSelectTopup);
  };
  const togglePopupAddress = () => {
    setPopupAddress(!isPopupAddress);
  };
  const stopLoad = () => {
    setIsLoading(false);
  };
  const ConfirmPay = () => {
    ItemSelect.forEach((item) => {
      slist.push({
        item_id: item.item_id,
        qty: item.qty,
        unit_price: item.unitprice,
        item_discount: 0,
        total: item.qty * item.unitprice,
        remark: "",
      });
    });
    GetdataAPI("/api/Main/SaveDataPartnerFromUserWeb", {
      comp_id: ItemSelect[0].comp_id,
    }).then((Partner) => {
      if (Partner.Status === "Success") {
        console.log(Partner);
        GetdataAPI("/api/MainSale/InsertOrder", {
          comp_id: ItemSelect[0].comp_id,
          inv_doctype: "E-SO",
          order_date: DateNow,
          oder_rate: "1",
          total: numsum,
          discount: 0,
          deposit: 0,
          sumtotal: numsum,
          vat: 0,
          grand_total: numsum,
          remark: "",
          item_order: slist,
        }).then((SOData) => {
          console.log(SOData);
          if (SOData.Data.length !== 0) {
            GetdataAPI("/api/MainSale/SelectOrderNotInv", {
              order_id: SOData.Data[0].order_id,
            }).then((NotInv) => {
              GetdataAPI("/api/MainSale/SelectItemCart", {}).then((res) => {
                if (res.Status === "Success") {
                  setnumcount(res.Data.length);
                  setcartdata(res.Data);
                  if (TopupBy === "Qrcode") {
                    navigate("../TopupQrcode", {
                      state: {
                        rate_id: 1,
                        num: numsum,
                        Data: NotInv.Data,
                      },
                    });
                  }
                  if (TopupBy === "Cradit card") {
                    navigate("../TopupCreditcard", {
                      state: {
                        rate_id: 1,
                        num: numsum,
                        Data: NotInv.Data,
                      },
                    });
                  }
                }
              });
            });
          }
        });
      } else {
        alert(Partner.Message);
      }
    });
  };
  const setPopupTrue = () => {
    setPopupSelectTopup(true);
  };
  const setPopupFalse = () => {
    setPopupSelectTopup(false);
  };
  const setTopupCreditcard = () => {
    setTopupBy("Cradit card");
  };
  const setTopupQrcode = () => {
    setTopupBy("Qrcode");
  };

  skeleton.push(
    <div className="px-5 pb-2 mb-2">
      <div className="grid grid-cols-12 ">
        <div className="grid col-span-12 ">
          {ItemSelect.map((item) => (
            <div
              className="grid grid-cols-12  px-5 border border-t-white border-b-gray-300 border-l-white border-r-white py-4"
              key={item.id}
            >
              <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative">
                <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                  <div className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit] bg-gray-300 animate-pulse" />
                </div>
              </div>
              <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
                <div className="grid grid-cols-12 ">
                  <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                    <div className="text-lg bg-gray-300 animate-pulse w-20 h-5 rounded-lg mt-1"></div>
                  </div>
                  <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                    <div className="text-base bg-gray-300 animate-pulse w-16 h-5 rounded-lg mt-1"></div>
                  </div>
                  <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                    <div className="bg-gray-300 animate-pulse w-12 h-6 rounded-lg mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-12 px-5  py-4">
            <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start font-bold text-xl">
              <div className="text-lg bg-gray-300 animate-pulse w-20 h-6 rounded-lg "></div>
            </div>
            <div className="grid justify-end col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
              <div className="text-lg bg-gray-300 animate-pulse w-24 h-10 rounded-lg "></div>
            </div>
          </div>
          <div className="grid grid-cols-12  px-5 border border-b-gray-300 border-t-white border-l-white border-r-white py-4">
            <div className="grid col-span-12">
              <div className="grid grid-cols-12 content-center ">
                <div className="grid col-span-12 content-center ">
                  <div className="text-base bg-gray-300 animate-pulse w-full h-14 mt-2  rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const LoadData = async () => {
    GetdataAPI("/api/Main/SelectAddress", {}).then(async (res) => {
      Datas.push(res.Data);
    });
  };
  const syncDataGridSelection = (e) => {
    setgridBoxValue(e.value);
  };
  const dataGridOnSelectionChanged = (e) => {
    setgridBoxValue(e.selectedRowKeys);
    setisGridBoxOpened(false);
  };
  const gridBoxDisplayExpr = (item: any) => {
    return item && `${item.a6}`;
  };
  const onGridBoxOpened = (e) => {
    if (e.name === "opened") {
      setisGridBoxOpened(e.value);
      LoadData();
    }
  };
  const dataGridRender = () => {
    return (
      <DataGrid
        //onCellClick={(e)=> Setaddressno(false)}
        dataSource={Datas}
        rowAlternationEnabled={true}
        showColumnLines={false}
        columns={[{ dataField: "a6", caption: "เลือกพื้นที่" }]}
        hoverStateEnabled={true}
        selectedRowKeys={gridBoxValue}
        onSelectionChanged={dataGridOnSelectionChanged}
        height="100%"
      >
        <Selection mode="single" />
        <Scrolling mode="virtual" />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  };
  const saveAddress = async () => {
    setaddressPage(false);
    {
      /*if (name.current.instance.option("value") === "") {
      MsgOK("แจ้งเตือน", "กรุณากรอกชื่อลูกค้า");
    } else if (tel.current.instance.option("value") === "") {
      MsgOK("แจ้งเตือน", "กรุณากรอกเบอร์โทรลูกค้า");
    } else if (address.current.instance.option("text") === "") {
      MsgOK("แจ้งเตือน", "กรุณาเลือกที่อยู่จัดส่ง(ตำบล/อำเภอ/จังหวัด)");
    } else if (addresstext.current.instance.option("value") === "") {
      MsgOK("แจ้งเตือน", "กรุณากรอกที่อยู่จัดส่งรายละเอียด");
    }
    else {
      let AdressId = address.current.instance.option("value").map(e => e.a1).join("");
      GetdataAPI("/api/Main/SaveDataDeliveryAddressUserWeb", {
        RecieverName: name.current.instance.option("value"),
        RecieverTel: tel.current.instance.option("value"),
        AddressId: AdressId,
        AddressText1: addresstext.current.instance.option("value"),
      }).then(async (res) => {
        MsgOKCancel("แจ้งเตือน", "บันทึกสำเร็จ", "ตกลง").then((res) => {
          if (res) {
            navigate("../MyProfile");
          }
        });
      });
    }*/
    }
  };
  //------------------------HTML------------------------------
  return (
    <>
      {" "}
      {isLoading ? (
        <div className="mt-5">{skeleton}</div>
      ) : (
        <>
          <div className="px-5 pb-2 mb-2 mt-5">
            <div className="grid grid-cols-12 mb-80">
              <div className="grid col-span-12 ">
                {ItemSelect.map((item) => (
                  <div key={item.id}>
                    <div className="grid grid-cols-12  px-5 border border-b-gray-300 rounded-lg py-4 mb-4">
                      <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative">
                        <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                          <img
                            className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                            src={item.img_path}
                          />
                        </div>
                      </div>
                      <div className="grid col-span-6 pl-3">
                        <div className="grid grid-cols-12 ">
                          <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                            <div className="text-lg truncate">
                              {item.slist_name}
                            </div>
                          </div>
                          <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                            <div className="inline-flex text-red-500 font-semibold">
                              <div className="mr-5">
                                ฿{NumberFormat(item.price_total * item.qty)}
                              </div>
                              <div className="line-through text-gray-400">
                                ฿{NumberFormat(item.price_total)}
                              </div>
                            </div>
                          </div>
                          <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                            <div className="mr-2 flex text-sm">
                              <div
                                className="text-gray-500 w-9"
                                onClick={() => console.log(item)}
                              >
                                Unit :
                              </div>
                              <div className="text-red-500 mr-2">
                                {item.unitname}
                              </div>
                              {item.itemoption_name === "" ? (
                                <></>
                              ) : (
                                <>
                                  <div className="text-gray-500 w-[50px]">
                                    Option :
                                  </div>
                                  <div className="text-red-500">
                                    {item.itemoption_name}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid col-span-2">
                        <div className="grid grid-cols-12 ">
                          <div className="grid content-start justify-end col-span-12 ">
                            <div className="text-lg">x{item.qty}</div>
                          </div>
                          {/*<div className="grid content-center justify-center col-span-12 ">
                          <Bin
                            className="fill-[black] h-[auto] w-[20px]"
                          />
                        </div>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid col-span-12 mt-2">
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
                            onClick={setPopupFalse}
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
                  showCloseButton
                />
                <div className="grid grid-cols-12 content-center ">
                  <div
                    className="grid col-span-12 content-center shadow-md shadow-gray-300 py-3 rounded-md hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
                    onClick={setPopupTrue}
                  >
                    <div className="grid grid-cols-12 px-3">
                      {TopupBy === "" ? (
                        <>
                          <div className="grid  col-span-6 content-center text-md ">
                            {t("เลือกวิธีการชำระเงิน")}
                            {TopupBy}
                          </div>
                          <div className="grid justify-end  col-span-6 content-center  ">
                            <i className="far fa-angle-right text-3xl"></i>
                          </div>
                        </>
                      ) : TopupBy === "Qrcode" ? (
                        <>
                          <div className="grid  col-span-6 content-center text-md">
                            {t("เลือกวิธีการชำระเงิน")}
                          </div>
                          <div className="grid justify-end col-span-6 content-center text-md">
                            <span className="inline-flex items-center">
                              <Qr fill="black" />
                              <div className="grid content-center text-md px-2">
                                {TopupBy}
                              </div>
                              <i className="far fa-angle-right text-3xl pl-3"></i>
                            </span>
                          </div>
                        </>
                      ) : TopupBy === "Cradit card" ? (
                        <>
                          <div className="grid  col-span-6 content-center text-md ">
                            {t("เลือกวิธีการชำระเงิน")}
                          </div>
                          <div className="grid justify-end col-span-6 content-center text-md">
                            <span className="inline-flex items-center">
                              <Creditcard fill="black" />
                              <div className="grid content-center text-md px-2">
                                {TopupBy}
                              </div>

                              <i className="far fa-angle-right text-3xl pl-3"></i>
                            </span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid col-span-12">
                <div
                  className="grid grid-cols-12 content-center shadow-md shadow-gray-300 py-3 rounded-md hover:bg-slate-50 active:bg-slate-100 cursor-pointer px-3"
                  onClick={togglePopupAddress}
                >
                  <div className="grid col-span-1 text-md content-start mt-1">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="grid col-span-10 content-center text-md">
                    {t("ที่อยู่จัดส่ง")}
                    {js.Showaddress.map((item) => (
                      <div key={item.id}>
                        <div className="flex">
                          <div>{item.name}</div>
                          <div className="mx-1">|</div>
                          <div>{item.tel}</div>
                        </div>
                        <div className="">{item.area}</div>
                        <div className="flex">
                          <div>{item.district},</div>
                          <div>{item.county},</div>
                          <div>{item.zip}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid justify-end  col-span-1 content-center">
                    <i className="far fa-angle-right text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow ">
            <div className="grid grid-cols-12 border border-t-2 border-gray mx-3 border-l-white border-r-white pt-2">
              <div className="grid col-span-12">
                <div className="grid grid-cols-12 ">
                  <div className="grid col-span-6 mb-1">
                    <div className="text-xl font-semibold">Total Amount</div>
                  </div>
                  <div className="grid col-span-6">
                    <div className="text-xl text-end line-through text-gray-400">
                      ฿{NumberFormat(numsum)}
                    </div>
                  </div>
                  <div className="grid col-span-6 mb-1">
                    <div className="text-xl font-semibold">Final Amount</div>
                  </div>
                  <div className="grid col-span-6">
                    <div className="text-xl text-end text-red-500">
                      ฿{NumberFormat(numsum)}
                    </div>
                  </div>

                  <div className="grid col-span-12 h-[100px] mt-2">
                    <div className="text-lg text-end text-red-500">
                      <button
                        type="button"
                        className="btn-save px-3"
                        onClick={ConfirmPay}
                      >
                        Confirm Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid col-span-12 content-center justify-self-center mb-5"></div>
            </div>
          </section>
          <Popup
            position="bottom"
            visible={isPopupAddress}
            closeOnOutsideClick={true}
            onHiding={togglePopupAddress}
            contentRender={() => {
              return (
                <>
                  {!addressPage ? (
                    <ScrollView>
                      <div className="grid grid-cols-12 gap-3 py-3 px-2">
                        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                          {js.address.map((item, i) => (
                            <>
                              <div
                                key={item.id}
                                className="grid grid-cols-12 content-center shadow-md shadow-gray-300 py-3 rounded-md hover:bg-slate-50 active:bg-slate-100 cursor-pointer px-3"
                              >
                                <div className="grid col-span-1 content-start text-md justify-self-start">
                                  {btnAddress === item.id ? (
                                    <i
                                      className="far fa-dot-circle text-red-500 text-2xl"
                                      onClick={() => {
                                        setbtnAddress(item.id);
                                      }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="far fa-circle text-2xl text-gray-400"
                                      onClick={() => {
                                        setbtnAddress(item.id);
                                        togglePopupAddress();
                                      }}
                                    ></i>
                                  )}
                                </div>
                                <div className="grid col-span-10 content-center text-md ml-2">
                                  {t("ที่อยู่จัดส่ง")}
                                  <>
                                    <div className="flex">
                                      <div>{item.name}</div>
                                      <div className="mx-1">|</div>
                                      <div>{item.tel}</div>
                                    </div>
                                    <div className="">{item.area}</div>
                                    <div className="flex">
                                      <div>{item.district},</div>
                                      <div>{item.county},</div>
                                      <div>{item.zip}</div>
                                    </div>
                                  </>
                                </div>
                                <div className="grid justify-end  col-span-1 content-start text-red-500">
                                  แก้ไข
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5">
                          <button
                            className="w-full border rounded-lg bg-red-500 text-white p-3"
                            onClick={() => {
                              setaddressPage(true);
                            }}
                          >
                            <div className="flex justify-center text-base">
                              <div className="mr-1">
                                <i className="far fa-plus-circle"></i>
                              </div>
                              <div>เพิ่มที่อยู่ใหม่</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </ScrollView>
                  ) : (
                    <ScrollView>
                      <div className="grid grid-cols-12 gap-3 py-3 px-2">
                        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                          <div className="grid grid-cols-12 gap-3">
                            <div className="grid col-span-12 mb-2">
                              <div className="text-2xl font-semibold">
                                Shipping
                              </div>
                            </div>
                            <div className="grid col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                              <label className="block mb-2 text-sm text-gray-700  font-semibold">
                                ชื่อลูกค้า
                              </label>
                              <TextBox
                                ref={name}
                                className=""
                                placeholder="ระบุชื่อลูกค้า"
                              />
                            </div>
                            <div className="grid col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                              <label className="block mb-2 text-sm text-gray-700  font-semibold">
                                เบอร์โทรลูกค้า
                              </label>
                              <TextBox
                                ref={tel}
                                className=""
                                placeholder="ระบุเบอร์โทรลูกค้า"
                              />
                            </div>
                            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                              <label className="block mb-2 text-sm text-gray-700  font-semibold">
                                ที่อยู่จัดส่ง(ตำบล/อำเภอ/จังหวัด)
                              </label>
                              <DropDownBox
                                ref={address}
                                value={gridBoxValue}
                                opened={isGridBoxOpened}
                                valueExpr=""
                                deferRendering={false}
                                displayExpr={gridBoxDisplayExpr}
                                placeholder={"เลือกที่อยู่จัดส่ง"}
                                showClearButton={true}
                                dataSource={gridDataSource}
                                onValueChanged={syncDataGridSelection}
                                onOptionChanged={onGridBoxOpened}
                                contentRender={dataGridRender}
                                dropDownOptions={{ fullScreen: true }}
                              />
                            </div>
                            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                              <label className="block mb-2 text-sm text-gray-700  font-semibold">
                                ที่อยู่จัดส่งรายละเอียด
                              </label>
                              <TextArea height={113} ref={addresstext} />
                            </div>
                            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5 justify-self-center">
                              <button
                                className="border bg-red-500 text-white w-56 h-14 px-3 rounded-full"
                                onClick={saveAddress}
                              >
                                Save Address
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollView>
                  )}
                </>
              );
            }}
            title={t("ที่อยู่จัดส่ง")}
            resizeEnabled={true}
            height="100%"
            width="100%"
            animation={popup_config}
            showCloseButton
          />
        </>
      )}
    </>
  );
}
