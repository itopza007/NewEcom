import React, { useEffect, useRef, useState } from "react";

export default function Notification() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 250);
  }, []);

  const json = {
    data: [
      {
        id: 1,
        icon: "relative far fa-tag text-xl",
        text1: "อัปเดตจาก Ecom",
        text2: "มีการอัปเดตระบบตะกร้าสินค้าใหม่ จาก Ecom",
        items: "relative border rounded-full w-10 h-10 bg-orange-600",
      },
      {
        id: 2,
        icon: "relative far fa-comment-edit text-xl",
        text1: "อัปเดตจาก Ecom",
        text2: "มีการอัปเดตระบบตะกร้าสินค้าใหม่ จาก Ecom",
        items: "relative border rounded-full w-10 h-10 bg-red-500",
      },
      {
        id: 3,
        icon: "relative fal fa-gift text-xl",
        text1: "อัปเดตจาก Ecom",
        text2: "มีการอัปเดตระบบตะกร้าสินค้าใหม่ จาก Ecom",
        items: "relative border rounded-full w-10 h-10 bg-blue-700",
      },
    ],
  };

  return (
    <div className="p-2 ">
      {isLoading ? (
        <>
          <div className="grid grid-cols-12 py-2">
            <div className="grid col-span-12 ">
              <div className="grid grid-cols-12 ">
                <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 ">
                  <div className="grid grid-cols-12 ">
                    <div className="grid content-center  col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-8 ">
                      <div className=" bg-gray-300 animate-pulse">
                        <div className="text-[16px] font-semibold text-gray-700 invisible">
                          xxxxxxxxx
                        </div>
                      </div>
                    </div>
                    <div className="grid justify-end content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                      <div className="grid grid-cols-12 ">
                        <div className="grid content-center justify-center col-span-12  "></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 "></div>

                <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 pl-3">
                  <div className="grid grid-cols-12 ">
                    <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-8 ">
                      <div className=" bg-gray-300 animate-pulse">
                        <div className="text-[16px] font-semibold text-gray-700 invisible">
                          xxxxxxxxx
                        </div>
                      </div>
                    </div>
                    <div className="grid  content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                      <div className="grid grid-cols-12 ">
                        <div className="grid content-center justify-center col-span-12  "></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-12 ">
            <div className="grid col-span-12 ">
              <div className="grid grid-cols-12 ">
                <div className="grid col-span-12 ">
                  <div className=" text-xl">การแจ้งเตือน</div>
                </div>
              </div>
            </div>

            <div className="grid col-span-12 ">
              <div className="grid grid-cols-12 ">
                <div className="grid col-span-12">
                  {json.data?.map((item) => (
                    <div className="grid col-span-12 mt-3">
                      <div className="grid grid-cols-12 ">
                        <div className="grid col-span-12 p-2 active:bg-[#F2F3F5] rounded-md">
                          <span className="inline-flex  ">
                            <span className="pr-3">
                              <button className={item.items}>
                                <div className="text-white ">
                                  <i className={item.icon}></i>
                                </div>
                              </button>
                            </span>
                            <span>
                              <div className="grid grid-cols-12">
                                <div className="grid col-span-12 font-semibold">
                                  {item.text1}
                                </div>
                                <div className="grid col-span-12 text-gray-700 ">
                                  {item.text2}
                                </div>
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
