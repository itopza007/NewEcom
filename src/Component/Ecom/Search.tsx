import { Popup } from "devextreme-react";
import RangeSlider, { Tooltip, Label } from "devextreme-react/range-slider";
import List from "devextreme-react/list";
import TextBox from "devextreme-react/text-box";
import React, { useRef, useState, useEffect } from "react";
export default function Search(props) {
  //------------------------------------------- ตัวแปร ------------------------------------------
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
        id: "2",
        text: "M",
      },
      {
        id: "3",
        text: "L",
      },
      {
        id: "4",
        text: "XL",
      },
      {
        id: "5",
        text: "2XL",
      },
      {
        id: "6",
        text: "3XL",
      },
    ],
  };
  const [cate, setcate] = useState("0");
  const [size, setsize] = useState("0");
  const [PopFilter, setPopFilter] = useState(false);
  const [datasearch, setdatasearch] = useState(js.cate.map((e) => e.text));
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {}, []);
  //------------------------------------------- funtion ------------------------------------------
  const togglePopupFilter = () => {
    setPopFilter(!PopFilter);
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <div className="grid grid-cols-12 px-5 pt-10">
      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
        <div className="relative">
          <div className="absolute z-10 right-5 bottom-[-32px] text-lg text-red-500 font-bold cursor-pointer">
            <div className="w-7 h-7" onClick={togglePopupFilter}>
              <i className="far fa-filter"></i>
            </div>
            <Popup
              animation={{
                show: {
                  type: "slide",
                  duration: 400,
                  from: {
                    position: {
                      my: "top",
                      at: "bottom",
                    },
                  },
                  to: {
                    position: {
                      my: "center",
                      at: "center",
                    },
                  },
                },
                hide: {
                  type: "slide",
                  duration: 400,
                  from: {
                    opacity: 1,
                    position: {
                      my: "center",
                      at: "center",
                    },
                  },
                  to: {
                    opacity: 1,
                    position: {
                      my: "top",
                      at: "bottom",
                    },
                  },
                },
              }}
              position="bottom"
              showCloseButton={true}
              visible={PopFilter}
              closeOnOutsideClick={true}
              onHiding={() => {
                togglePopupFilter();
              }}
              width="100%"
              height="80%"
              showTitle={false}
              contentRender={() => {
                return (
                  <>
                    <div className="grid grid-cols-12 gap-8">
                      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5">
                        <div className="text-center text-2xl font-semibold">
                          Filter
                        </div>
                      </div>
                      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                        <div className="grid grid-cols-10 gap-3">
                          <div className="col-span-10">
                            <div className="font-semibold text-gray-600">
                              Categories
                            </div>
                          </div>
                          {js.cate.map((item) => (
                            <div className="col-span-2 justify-self-center">
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
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-12">
                            <div className="font-semibold text-gray-600">
                              Size
                            </div>
                          </div>
                          {js.size.map((item) => (
                            <div className="col-span-2 justify-self-center">
                              <button
                                type="button"
                                className={
                                  size === item.id
                                    ? "rounded-lg border-2 border-red-500 bg-red-500 text-white text-sm font-medium w-14 h-14"
                                    : "rounded-lg border-2 border-gray text-gray-500 text-sm font-medium  w-14 h-14"
                                }
                                onClick={() => setsize(item.id)}
                              >
                                <div className="text-base">{item.text}</div>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-12">
                            <div className="font-semibold text-gray-600">
                              Price Range
                            </div>
                          </div>
                          <div className="col-span-12">
                            <RangeSlider min={0} max={100} step={10}>
                              <Label visible={true} position="top" />
                              <Tooltip
                                enabled={true}
                                showMode="always"
                                position="top"
                              />
                            </RangeSlider>
                          </div>
                        </div>
                      </div>
                      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-6">
                            <button className="font-semibold w-full h-12 border border-red-500 text-red-500 rounded-full">
                              Reset
                            </button>
                          </div>
                          <div className="col-span-6">
                            <button className="font-semibold w-full h-12 bg-red-500 text-white rounded-full">
                              Save Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }}
            ></Popup>
          </div>
        </div>
        <List
          searchEnabled={true}
          dataSource={datasearch}
          height={"100%"}
          visible={true}
        />
      </div>
    </div>
  );
}
