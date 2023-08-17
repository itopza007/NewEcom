import DataGrid, {
  Column,
  Paging,
  Scrolling,
  Selection,
  Sorting,
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import {
  GetdataAPI,
  timeout,
  GetdataAPI_Outside,
} from "../../MainCall/MainCall";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Ads from "../MainPage/Ads";
import { NumberFormat } from "../../MainCall/NumberFormat";
import { ReactComponent as InforIcon } from "../../image/SVG_Memorybox/Payment/information_grey25.svg";
import { ReactComponent as PayIcon } from "../../image/SVG_Memorybox/Payment/Credit card.svg";
import { ReactComponent as Bin } from "../../image/SVG_Memorybox/Payment/Delete.svg";
import { useRecoilState } from "recoil";
import { cart_data, countcart, FindIMG } from "../../Recoil/CartRecoil";
import { Popup, ProgressBar, Toast } from "devextreme-react";
import { custom } from "devextreme/ui/dialog";
import PopupShowImg from "../MainPage/PopupShowImg";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { MsgOK, MsgOKCancel, MsgWarning } from "../../MainCall/dialog";
import Auth from "../../MainCall/Auth";
import { getRecoilPromise } from "recoil-nexus";
import { useTranslation } from "react-i18next";
import { active } from "../../Recoil/MenuRecoil";
import MenuBottom from "../Menu/MenuBottom";

//------------------------------------------- -DevStore/interface ------------------------------------------
interface ToasttypeFace {
  type?: "custom" | "error" | "info" | "success" | "warning";
}
const Carts = [];
const CartsStore = new ArrayStore({
  key: "cart_id",
  data: Carts,
});
const dataSource = new DataSource({
  store: CartsStore,
  reshapeOnPush: true,
});

export default function Cart() {
  //------------------------------------------- useRef ------------------------------------------
  const GridRef = useRef(null);
  const SelectRef = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingpopup, setisLoadingpopup] = useState(false);
  const navigate = useNavigate();
  const [skeleton_ar, setskeleton_ar] = useState([]);
  const [totalnum, settotalnum] = useState(0);
  const [noti, setnoti] = useState(false);
  const [img, setimg] = useRecoilState(FindIMG);
  const [numcount, setnumcount] = useRecoilState(countcart);
  const [ToastVisible, setToastVisible] = React.useState(false);
  const [ToastType, setToastType] = React.useState<ToasttypeFace>({
    type: "info",
  });
  const [Toastmessage, setToastmessage] = React.useState("");
  const [path, setpath] = useState("");
  const [toggle, settoggle] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const slist_id = searchParams.get("slist_id");
  const item_id = searchParams.get("item_id");
  const parentcomp_id = searchParams.get("parentcomp_id");
  const [menuactive, setmenuactive] = useRecoilState(active);
  const [remoteGrid, setremoteGrid] = useState(true);

  //------------------------onload----------------------------
  useEffect(() => {
    setmenuactive(2);
    setIsLoading(true);
    CeateSkeleton(1, 1);

    getRecoilPromise(cart_data).then((cartdata) => {
      console.log(cartdata);
      if (cartdata.length === 0) {
        setIsLoading(false);
      } else {
        cartdata.forEach((items) => {
          CartsStore.push([{ type: "insert", data: items }]);
        });
      }
    });

    return () => {
      CartsStore.clear();
    };
  }, []);

  //------------------------function--------------------------

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
  function onHiding(e) {
    setToastVisible(false);
  }
  const onunitChanged = (cart_id, ItemId, qty, datas) => {
    setisLoadingpopup(true);
    timeout(1).then(() => {
      GetdataAPI("/api/MainSale/UpdateItemToCart", {
        cart_id: cart_id,
        item_id: ItemId,
        qty: qty,
      }).then((res) => {
        if (res.Status === "Success") {
          const dataupdated = res.Data.filter((items) => {
            return items.cart_id === cart_id;
          });
          CartsStore.push([
            {
              type: "update",
              key: cart_id,
              data: dataupdated[0],
            },
          ]);
          setnumcount(res.Data.length);
          sumamount();
          setisLoadingpopup(false);
        }
      });
    });
    /* GridRef.current.instance.beginCustomLoading("Loading..."); */
  };
  const DeleteImg = (cart_id) => {
    MsgOKCancel("ยืนยันการลบ", "คุณต้องการลบรายการนี้หรือไม่").then((res) => {
      if (res === "OK") {
        GetdataAPI("/api/MainSale/DeleteItemCart", {
          cart_id: cart_id,
        }).then((res) => {
          if (res.Status === "Success") {
            setnumcount(res.Data.length);
            CartsStore.push([
              {
                type: "remove",
                key: cart_id,
              },
            ]);
          }
          sumamount();
          timeout(100).then(() => {
            CeateSkeleton(res.Data.length, 1);
          });
        });
      }
    });
  };
  const Checkout = () => {
    const SelectData = GridRef.current.instance.getSelectedRowsData();
    if (SelectData.length === 0) {
      MsgWarning("กรุณาเลือกรายการ");
    } else {
      navigate("../Pay", {
        state: {
          Item: SelectData,
        },
      });
    }
  };
  const Findphoto = () => {
    navigate("../Home", {
      state: {
        cate: img.cate,
        img: img.img,
      },
    });
  };
  const showimg = (img_path) => {
    setpath(img_path);
    fntoggle();
  };
  const fntoggle = () => {
    settoggle(!toggle);
  };

  const Grid_onCellPrepared = React.useCallback((e) => {
    const totalcount = dataSource.items().length;
    if (e.rowIndex === totalcount - 1 && e.columnIndex === 1) {
      setIsLoading(false);
    }
  }, []);

  const Refresh = (data) => {
    setremoteGrid(data);
  };

  const Grid_ColumsRender = React.useCallback((datas) => {
    return (
      <Grid_unitselect
        datas={datas}
        onunitChanged={onunitChanged}
        DeleteImg={DeleteImg}
        showimg={showimg}
        refresh={Refresh}
      />
    );
  }, []);
  const Grid_onSelectionChanged = React.useCallback((e) => {
    const DisableRowsData = e.selectedRowsData.filter(
      (i) => i.item_id === null
    );
    const currentKeys = e.currentSelectedRowKeys;
    const disabledKeys = currentKeys.filter((i) => {
      const chk_i = DisableRowsData.filter((item) => {
        return item.cart_id === i;
      });
      return chk_i.length > 0;
    });
    {
      /*if (disabledKeys.length > 0) {
      e.component.deselectRows(disabledKeys);
       แจ้งแตือนตัวเลือก 
      let myDialog = custom({
        title: "แจ้งเตือน",
        messageHtml: "<b>กรุณาเลือกตัวเลือก</b>",
        buttons: [
          {
            text: "ตกลง",
            type: "default",
            stylingMode: "text",
            focusStateEnabled: false,
            onClick: (e) => {
              return;
            },
          },
          // ...
        ],
      });
      myDialog.show();
      return;
    }*/
    }
    sumamount();
  }, []);
  const sumamount = () => {
    const SelectData = GridRef.current.instance.getSelectedRowsData();
    const OKRowsData = SelectData.filter((i) => i.item_id !== null);
    const numsum = OKRowsData.reduce(
      (a, v) => (a = a + parseFloat(v.price_total)),
      0
    );
    settotalnum(numsum);
  };

  //------------------------HTML------------------------------
  return (
    <div className="bg-white">
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
      <div className="mb-12 bg-white px-3 mb-40">
        <div className="mb-20 bg-white">
          <div className="grid grid-cols-12 ">
            <div className="grid col-span-12 ">
              <div className="grid grid-cols-12 ">
                <div className="justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mt-3 ">
                  <div className={isLoading ? "" : "hidden"}>
                    <DataGrid
                      id="Skeleton_Grid"
                      dataSource={skeleton_ar}
                      columnAutoWidth={true}
                      showBorders={false}
                      rowAlternationEnabled={false}
                      hoverStateEnabled={true}
                      showColumnLines={false}
                      remoteOperations={true}
                    >
                      <Selection
                        mode="multiple"
                        showCheckBoxesMode={"always"}
                      />
                      <Column
                        width="90%"
                        caption="Order Summary"
                        cellRender={() => {
                          return (
                            <div className="grid grid-cols-12 py-2">
                              <div className="grid col-span-12 ">
                                <div className="grid grid-cols-12 ">
                                  <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative  bg-gray-300 animate-pulse">
                                    <div className="rounded-lg absolute top-0 right-0 left-0 bottom-0 flex w-full h-full"></div>
                                  </div>
                                  <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
                                    <div className="grid grid-cols-12 ">
                                      <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 ">
                                        <div className=" bg-gray-300 animate-pulse">
                                          <div className="text-[16px] invisible">
                                            XXXX
                                          </div>
                                        </div>
                                      </div>
                                      <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                                        <div className=" bg-gray-300 animate-pulse">
                                          <div className="invisible my-2">
                                            <SelectBox
                                              placeholder={""}
                                              className="border border-white rounded-full px-1 shadow-inner-lg shadow-md"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12   ">
                                        <div className=" bg-gray-300 animate-pulse">
                                          <span className="text-xs invisible">
                                            {" "}
                                            xxx
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
                                    <div className="grid grid-cols-12 ">
                                      <div className="grid content-center justify-end col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-8 ">
                                        <div className=" bg-gray-300 animate-pulse">
                                          <div className="text-[16px] font-semibold text-gray-700 invisible">
                                            xxxxxxxxx
                                          </div>
                                        </div>
                                      </div>
                                      <div className="grid justify-end content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                                        <div className="grid grid-cols-12 ">
                                          <div className="grid content-center justify-center col-span-12  ">
                                            <Bin className="fill-[black] h-[auto] w-[20px]" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </DataGrid>
                  </div>
                  <div className={isLoading ? "hidden" : ""}>
                    <DataGrid
                      noDataText="ไม่พบข้อมูล"
                      id="Grid1"
                      dataSource={dataSource}
                      keyExpr="cart_id"
                      /* columnAutoWidth={false} */
                      showBorders={false}
                      rowAlternationEnabled={false}
                      hoverStateEnabled={true}
                      showColumnLines={false}
                      onSelectionChanged={Grid_onSelectionChanged}
                      showRowLines={true}
                      ref={GridRef}
                      onCellPrepared={Grid_onCellPrepared}
                      repaintChangesOnly={true}
                      remoteOperations={true}
                    >
                      <Paging enabled={false} />
                      <Selection mode="multiple" showCheckBoxesMode="always" />
                      <Column
                        width="90%"
                        caption="Order Summary"
                        cellRender={Grid_ColumsRender}
                      />
                    </DataGrid>
                  </div>
                  {noti ? (
                    <label className="text-sm font-medium text-red-600  mb-3">
                      กรุณาเลือกรายการ
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow  mb-[57px] border ">
          <div className="grid grid-cols-12 p-3  gap-6 ">
            <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
              <button type="button" className="btn-save" onClick={Findphoto}>
                Find more product
              </button>
            </div>
            <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
              <button type="button" className="btn-save" onClick={Checkout}>
                Checkout
              </button>
            </div>
          </div>
        </section>
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
      <PopupShowImg toggle={fntoggle} data={toggle} img_path={path} />
    </div>
  );
}

//------------------------Component------------------------------
function Grid_unitselect(props) {
  const [opt, setopt] = useState("กรุณาเลือก");
  const [unt, setunt] = useState("กรุณาเลือก");
  const [optId, setoptId] = useState();
  const [untId, setuntId] = useState();
  const [btnOption, setbtnOption] = useState<string>("");
  const [btnUnit, setbtnUnit] = useState<string>("");
  const [SListItem, setSListItem] = useState([]);
  const [itemOpt, setitemOpt] = useState([]);
  const [itemUnt, setitemUnt] = useState([]);
  const [isPopupOption, setPopupSelectTopup] = useState<boolean>(false);
  const [toqty, settoqty] = useState(0);
  const [drawunit, setdrawunit] = useState(props.datas.data.unitname);
  const [drawoption, setdrawoption] = useState(props.datas.data.itemoption);

  //------------------------onload----------------------------
  useEffect(() => {
    console.log(props.datas.data);
    GetdataAPI("/api/Salelist/SelectDataSaleListDetailsItem", {
      slist_id: props.datas.data.slist_id,
    }).then((res) => {
      setSListItem(res.Data.item);
      setitemOpt(res.Data.option);
      setitemUnt(res.Data.unit);
    });
  }, []);

  const togglePopupOption = () => {
    setPopupSelectTopup(!isPopupOption);
  };
  const del = (e) => {
    props.DeleteImg(props.datas.data.cart_id);
  };
  const Edit = (cart_id, qty) => {
    if (btnUnit === "") {
      MsgWarning("กรุณาเลือก Unit");
    } else if (btnOption === "") {
      MsgWarning("กรุณาเลือก Option");
    } else {
      let itemID = SListItem.filter(
        (e) => e.unitid === untId && e.slist_option_id === optId
      );

      GetdataAPI("/api/MainSale/UpdateItemToCart", {
        cart_id: cart_id,
        item_id: itemID[0].item_id,
        qty: qty,
      }).then((res) => {
        if (res.Status === "Success") {
          setdrawunit(unt);
          setdrawoption(opt);
          const dataupdated = res.Data.filter((items) => {
            return items.cart_id === cart_id;
          });
          CartsStore.push([
            {
              type: "update",
              key: cart_id,
              data: dataupdated[0],
            },
          ]);

          props.refresh();
          togglePopupOption();
        }
      });
    }

    /* GridRef.current.instance.beginCustomLoading("Loading..."); */
  };

  function decrement(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    if (value === 0) {
    } else {
      value--;
    }
    target.value = value;

    console.log(value);
    settoqty(value);
  }
  function increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;

    console.log(value);
    settoqty(value);
  }
  return (
    <div className="grid grid-cols-12 py-2 bg-white">
      <div className="grid col-span-12 ">
        <div className="grid grid-cols-12 ">
          <div className="grid col-span-4 content-center after:pt-[75%] after:block after:content-[''] relative">
            <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
              <img
                className="rounded-lg object-cover h-[100px] w-[150px]"
                onClick={() => {
                  props.showimg(props.datas.data.img_path);
                }}
                src={props.datas.data.img_path}
                loading="lazy"
              />
            </div>
          </div>
          <div className="grid col-span-7 pl-2">
            <div className="grid grid-cols-12">
              <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                <div className="text-lg truncate w-40">
                  {props.datas.data.slist_name}
                </div>
              </div>
              <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                <div className="inline-flex text-xs font-semibold"></div>
              </div>
              {itemUnt?.length < 2 ? (
                <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-1">
                  <button className="bg-red-500 text-white rounded-md h-8 opacity-50 cursor-not-allowed">
                    <div className="grid grid-cols-12">
                      {props.datas.data.unitname == null ? (
                        <div className="grid col-span-10 pl-1 truncate w-40">
                          ตัวเลือกสินค้า : ไม่พบตัวเลือก
                        </div>
                      ) : (
                        <div className="grid col-span-10 pl-1 truncate w-38">
                          ตัวเลือกสินค้า : {drawunit}
                        </div>
                      )}
                      <div className="grid col-span-2 content-center">
                        <i className="far fa-chevron-down"></i>
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-1">
                  <button
                    className="bg-red-500 text-white rounded-md h-8"
                    onClick={() => {
                      togglePopupOption();
                      console.log(props.datas.data);
                    }}
                  >
                    <div className="grid grid-cols-12">
                      {unt == "กรุณาเลือก" ? (
                        <>
                          {props.datas.data.itemoption_name == "" ? (
                            <div className="grid col-span-10 truncate w-38 pl-1">
                              ตัวเลือกสินค้า : {drawunit}
                            </div>
                          ) : (
                            <div className="grid col-span-10 truncate w-38 pl-1">
                              ตัวเลือกสินค้า : {drawoption},{drawunit}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {opt == "กรุณาเลือก" ? (
                            <div className="grid col-span-10 truncate w-38 pl-1">
                              ตัวเลือกสินค้า : {drawunit}
                            </div>
                          ) : (
                            <div className="grid col-span-10 truncate w-38 pl-1">
                              ตัวเลือกสินค้า : {drawoption},{drawunit}
                            </div>
                          )}
                        </>
                      )}
                      <div className="grid col-span-2 content-center">
                        <i className="far fa-chevron-down"></i>
                      </div>
                    </div>
                  </button>
                  <Popup
                    position="center"
                    visible={isPopupOption}
                    closeOnOutsideClick={true}
                    onHiding={togglePopupOption}
                    title={"เลือกตัวเลือก"}
                    resizeEnabled={true}
                    height="auto"
                    width="90%"
                    showCloseButton={true}
                  >
                    <div className="grid grid-cols-12 gap-3 my-3">
                      <div className="grid col-span-12">
                        <div className="flex text-base">
                          {itemOpt?.length < 2 ? (
                            <></>
                          ) : (
                            <div className="mr-1 flex">
                              <div className="text-gray-500">Option :</div>
                              <div className="text-red-500 ml-1">{opt}</div>
                            </div>
                          )}
                          {itemUnt?.length < 2 ? (
                            <></>
                          ) : (
                            <div className="flex">
                              <div className="text-gray-500 ml-1">Unit :</div>
                              <div className="text-red-500 ml-1">{unt}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {itemUnt?.length < 2 ? (
                        <></>
                      ) : (
                        <div className="grid col-span-12">
                          <div className="text-xl mb-2">Unit</div>
                          <div className="" role="group">
                            {itemUnt?.map((item, i) => (
                              <button
                                key={item.unitid}
                                type="button"
                                className={
                                  btnUnit === i.toString()
                                    ? "rounded-lg border-2 border-blue-500 bg-blue-500 text-white text-sm font-medium  w-[auto] h-14 m-1 px-5"
                                    : "rounded-lg border-2 border-gray text-gray-500 text-sm font-medium  w-[auto] h-14 m-1 px-5"
                                }
                                onClick={() => {
                                  setbtnUnit(i.toString());

                                  console.log(item.unitname);
                                  console.log(item.unitid);
                                  setuntId(item.unitid);
                                  setunt(item.unitname);
                                }}
                              >
                                <div className="text-base">{item.unitname}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {itemOpt?.length < 2 ? (
                        <></>
                      ) : (
                        <div className="grid col-span-12">
                          <div className="text-xl mb-2">Option</div>
                          <div className="" role="group">
                            {itemOpt?.map((item, i) => (
                              <button
                                key={item.slist_option_id}
                                type="button"
                                className={
                                  btnOption === i.toString()
                                    ? "rounded-lg border-2 border-blue-500 bg-blue-500 text-white text-sm font-medium w-[auto] h-14 m-1 px-5"
                                    : "rounded-lg border-2 border-gray text-gray-500 text-sm font-medium  w-[auto] h-14 m-1 px-5"
                                }
                                onClick={() => {
                                  setbtnOption(i.toString());

                                  console.log(item.slist_option_id);
                                  console.log(item);
                                  setoptId(item.slist_option_id);
                                  setopt(item.itemoption);
                                }}
                              >
                                <div className="text-base">
                                  {item.itemoption}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="grid col-span-12 justify-self-center">
                        <button
                          className="border bg-red-500 h-14 w-32 text-white rounded-lg mt-4 text-lg"
                          onClick={() =>
                            Edit(props.datas.data.cart_id, props.datas.data.qty)
                          }
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </Popup>
                </div>
              )}
              <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                <div className="inline-flex text-lg text-red-500 font-semibold">
                  <div className="mr-5">
                    ฿{NumberFormat(props.datas.data.unitprice)}
                  </div>
                  <div className="line-through text-gray-400">
                    ฿{NumberFormat(props.datas.data.unitprice)}
                  </div>
                </div>
              </div>
              <div className=" col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                <div className="custom-number-input">
                  <div className="flex flex-row h-8 w-20  rounded-xl  bg-transparent mt-1">
                    <button
                      data-action="decrement"
                      onClick={decrement}
                      className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-8 w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span className="m-auto text-sm font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      id={`qty`}
                      className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name=""
                      defaultValue={props.datas.data.qty}
                    />
                    <button
                      data-action="increment"
                      onClick={increment}
                      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-8 w-20 rounded-r cursor-pointer"
                    >
                      <span className="m-auto text-sm font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid col-span-1 pl-3">
            <div className="grid grid-cols-12 ">
              {/*<div className="grid content-center justify-end col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-8 ">
                  <div className="text-[16px]  text-[#000000B2]">
                    ฿{NumberFormat(props.datas.data.price_total)}
                  </div>
                </div>*/}
              <div className="grid justify-end content-start col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                <div className="grid grid-cols-12 ">
                  <div className="grid content-center justify-center col-span-12 pr-1">
                    <Bin
                      className="fill-[black] h-[auto] w-[20px]"
                      onClick={del}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
