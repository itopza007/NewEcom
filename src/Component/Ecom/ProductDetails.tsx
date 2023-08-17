import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { ReactComponent as Cart } from "../../image/SVG_Memorybox/Payment/Basket.svg";
import Auth from "../../MainCall/Auth";
import { MsgOK, MsgWarning } from "../../MainCall/dialog";
import { GetdataAPI } from "../../MainCall/MainCall";
import { cart_data } from "../../Recoil/CartRecoil";
export default function ProductDetails() {
  //------------------------------------------- ตัวแปร ------------------------------------------

  let location: any = useLocation();

  //console.log(params.imgId); Get ID จาก queryString Url
  const [btnOption, setbtnOption] = useState<string>();
  const [btnUnit, setbtnUnit] = useState<string>();
  const [option1, setoption] = useState([]);
  const [unit, setunit] = useState([]);
  const [item, setitem] = useState([]);
  const [opt, setopt] = useState();
  const [unt, setunt] = useState();
  const [optname, setoptname] = useState("");
  const [untname, setuntname] = useState("");
  const navigate = useNavigate();
  const [cartdata, setcartdata] = useRecoilState(cart_data);

  const [searchParams, setSearchParams] = useSearchParams();
  const item_id = searchParams.get("item_id");
  const details = searchParams.get("details");
  const parentcomp_id = searchParams.get("parentcomp_id");
  const slist_id = searchParams.get("slist_id");
  const maxprice = searchParams.get("maxprice");
  const name = searchParams.get("name");
  const img = searchParams.get("img");

  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    GetdataAPI("/api/Salelist/SelectDataSaleListDetailsItem", {
      slist_id: slist_id,
    }).then(async (res) => {
      if (res.Data.unit?.length === 1) {
        //------- ถ้า Unitมีอันเดียว ---------
        setunt(res.Data.unit[0].unitid); //------- เลือกไว้เลย เอาเทียบเงื่อนไขกับเอาไปหาitem_id ---------
      }
      if (res.Data.option?.length === 1) {
        //------- ถ้า Optionมีอันเดียว ---------
        setopt(res.Data.option[0].slist_option_id); //------- เลือกไว้เลย เอาเทียบเงื่อนไขกับเอาไปหาitem_id ---------
      }
      setoption(res.Data.option);
      setunit(res.Data.unit);
      setitem(res.Data.item);
      console.log(item);
    });
  }, []);
  //------------------------------------------- funtion ------------------------------------------

  const AddCart = () => {
    Auth.CurrentUser().then((res) => {
      if (res === "") {
        navigate("/Main/Cart");
      } else {
        const qty = document.getElementById(`qty`) as HTMLInputElement | null;
        if (option1.length != 0) {
          //------- ถ้า Optionมีข้อมูล ---------
          if (unt === undefined) {
            MsgWarning("กรุณาเลือก Unit");
          } else if (opt === undefined) {
            MsgWarning("เลือก Option");
          } else {
            //------- เลือกunitกับoptionแล้ว ---------
            let itemToCart = item.filter(
              (e) => e.unitid == unt && e.slist_option_id == opt
            ); //------- เอา unit กับ option มาหา item_id ---------
            GetdataAPI("/api/MainSale/AddItemToCart", {
              comp_id: parentcomp_id,
              slist_id: slist_id,
              item_id: itemToCart[0].item_id,
              qty: qty.value,
            }).then(async (res) => {
              if (res.Status === "Success") {
                setcartdata(res.Data);
                navigate("/Main/Cart");
              } else if (res.Message === "item already exists.") {
                MsgOK("แจ้งเตือน", "มีสินค้าในตะกร้าแล้ว");
              }
            });
          }
        } else {
          //------- ถ้า Optionไม่มีข้อมูล ---------
          if (unt === undefined) {
            alert("เลือกUnit");
          } else {
            let itemToCart = item.filter((e) => e.unitid === unt); //------- เอา unitอย่างเดียว มาหา item_id ---------
            GetdataAPI("/api/MainSale/AddItemToCart", {
              comp_id: parentcomp_id,
              slist_id: slist_id,
              item_id: itemToCart[0].item_id,
              qty: qty.value,
            }).then(async (res) => {
              if (res.Status === "Success") {
                setcartdata(res.Data);
                navigate("/Main/Cart");
              } else if (res.Message === "item already exists.") {
                MsgOK("แจ้งเตือน", "มีสินค้าในตะกร้าแล้ว");
              }
            });
          }
        }
      }
    });
  };

  const Pay = () => {
    const qty = document.getElementById(`qty`) as HTMLInputElement | null;
    if (unt === undefined && opt === undefined) {
      navigate("/Main/Pay", {
        state: {
          Item: [
            {
              cart_id: 1,
              comp_id: 1,
              comp_name_th: "",
              fitem_name: null,
              img_path: img,
              img_path2: null,
              item_id: 1,
              itemoption: null,
              itemoption_name: "",
              package_depth: 0,
              package_height: 0,
              package_weight: 0.2388,
              package_width: 0,
              price_total: item[0].unitprice,
              qty: qty.value,
              sku: item[0].sku,
              slist_id: item[0].slist_id,
              slist_name: name,
              slist_name1: name,
              slist_option_id: null,
              unitname: "ชิ้น",
              unitprice: item[0].unitprice,
            },
          ],
        },
      });
    } else if (unt !== null && opt === undefined) {
      let itemToPay = item.filter((e) => e.unitid === unt);
      navigate("/Main/Pay", {
        state: {
          Item: [
            {
              cart_id: 1,
              comp_id: 1,
              comp_name_th: "",
              fitem_name: null,
              img_path: img,
              img_path2: null,
              item_id: itemToPay[0].item_id,
              itemoption: null,
              itemoption_name: "",
              package_depth: 0,
              package_height: 0,
              package_weight: 0.2388,
              package_width: 0,
              price_total: itemToPay[0].unitprice,
              qty: qty.value,
              sku: itemToPay[0].sku,
              slist_id: itemToPay[0].slist_id,
              slist_name: name,
              slist_name1: name,
              slist_option_id: null,
              unitname: itemToPay[0].unitname,
              unitprice: itemToPay[0].unitprice,
            },
          ],
        },
      });
    } else {
      let itemToPay = item.filter(
        (e) => e.unitid == unt && e.slist_option_id == opt
      );
      navigate("/Main/Pay", {
        state: {
          Item: [
            {
              cart_id: 1,
              comp_id: 1,
              comp_name_th: "",
              fitem_name: null,
              img_path: img,
              img_path2: null,
              item_id: itemToPay.map((e) => e.item_id).toString(),
              itemoption: null,
              itemoption_name: optname,
              package_depth: 0,
              package_height: 0,
              package_weight: 0.2388,
              package_width: 0,
              price_total: itemToPay.map((e) => e.unitprice).toString(),
              qty: qty.value,
              sku: itemToPay.map((e) => e.sku).toString(),
              slist_id: itemToPay.map((e) => e.slist_id).toString(),
              slist_name: name,
              slist_name1: name,
              slist_option_id: null,
              unitname: untname,
              unitprice: itemToPay.map((e) => e.unitprice).toString(),
            },
          ],
        },
      });
    }
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
  }
  function increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
  }
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="grid grid-cols-12 px-5 gap-3 mb-20">
      <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
        <div className="grid grid-cols-12 gap-0 mb-2 rounded-sm">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center after:pt-[75%] after:block after:content-[''] relative">
            <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
              <img
                className=" object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                src={img}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 pt-2 gap-0 bg-white rounded-sm">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center bg-white">
            <div className="grid grid-cols-12">
              <div className="grid col-span-10"></div>
              <div className="grid col-span-2 content-start">
                <div className="text-red-500 text-end text-xl font-semibold">
                  ฿ {maxprice}
                </div>
                <div className="text-gray-500 text-end text-base font-semibold line-through">
                  ฿ 99
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-0 bg-white rounded-sm">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
            <div className="text-xl">Description</div>
            <div className="text-xs text-gray-500">{details}</div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-0 bg-white rounded-sm">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center  mt-3">
            <div className="grid grid-cols-12 gap-5">
              {unit?.length < 2 ? (
                <></>
              ) : (
                <>
                  <div className=" col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                    <div className="text-xl mb-2">Unit</div>

                    <div className="mb-2 gap-2" role="group">
                      {unit?.map((item, i) => (
                        <button
                          key={item.unitid}
                          type="button"
                          className={
                            btnUnit === i.toString()
                              ? "rounded-lg border-2 border-blue-500 bg-blue-500 text-white text-sm font-medium w-[auto] h-14 m-1 px-5"
                              : "rounded-lg border-2 border-gray text-gray-500 text-sm font-medium  w-[auto] h-14 m-1 px-5"
                          }
                          onClick={() => {
                            setbtnUnit(i.toString());
                            setunt(item.unitid);
                            setuntname(item.unitname);

                            console.log(item.unitid);
                            console.log(item.unitname);
                          }}
                        >
                          <div className="text-base">{item.unitname}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {option1?.length < 2 ? (
                <></>
              ) : (
                <>
                  <div className=" col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                    <div className="text-xl mb-2">Option</div>
                    <div className="mb-2" role="group">
                      {option1?.map((item, i) => (
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
                            setopt(item.slist_option_id);
                            setoptname(item.itemoption);
                            console.log(item.itemoption);
                            console.log(item.slist_option_id);
                          }}
                        >
                          <div className="text-base">{item.itemoption}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className=" col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-5">
                <div className="custom-number-input">
                  <div className="text-xl mb-2">Amount</div>
                  <div className="flex flex-row h-14 w-[auto]  rounded-xl  bg-transparent mt-1">
                    <button
                      data-action="decrement"
                      onClick={decrement}
                      className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      id={`qty`}
                      className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name=""
                      defaultValue="1"
                    />
                    <button
                      data-action="increment"
                      onClick={increment}
                      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
            <div className="grid grid-cols-12 gap-5">
              <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center">
                <div className="flex">
                  <span className="fa fa-star text-yellow-500 text-xl"></span>
                  <span className="fa fa-star text-yellow-500 text-xl"></span>
                  <span className="fa fa-star text-yellow-500 text-xl"></span>
                  <span className="fa fa-star text-yellow-500 text-xl"></span>
                  <span className="fa fa-star-half text-yellow-500 text-xl"></span>
                  <span className="text-yellow-500 text-xl">4.5</span>
                </div>
              </div>
              <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center justify-self-end">
                <div className="text-yellow-500 text-xs pb-1">comment(30)</div>
                <div className="relative h-7">
                  <div className="absolute right-16 text-gray-500 text-base">
                    99+
                  </div>
                  <img
                    className="absolute right-8 w-7 h-7 rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/6/66/Blackpink_Lisa_GMP_240622.png"
                  />
                  <img
                    className="absolute right-4 w-7 h-7 rounded-full"
                    src="https://thestandard.co/wp-content/uploads/2021/08/Lisa-BLACKPINK.jpg"
                  />
                  <img
                    className="absolute right-0 w-7 h-7 rounded-full"
                    src="https://i.ytimg.com/vi/YPNeFdHvbbU/maxresdefault.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center my-3">
            <div className="grid grid-cols-12 gap-5">
              <div className="grid col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-center justify-self-center">
                <button
                  className="border border-blue-500 bg-gray-50 rounded-full h-14 w-14 text-blue-500"
                  onClick={(e) => {
                    AddCart();
                  }}
                >
                  {/*<Cart className="fill-[]"/>*/}
                  <i className="fad fa-shopping-cart text-xl"></i>
                </button>
              </div>
              <div className="grid col-span-9 sm:col-span-9 md:col-span-9 lg:col-span-9 xl:col-span-9 content-center">
                <button
                  className="btn-save w-full h-14 rounded-full"
                  onClick={Pay}
                >
                  <div className="text-base">Buy Now</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
