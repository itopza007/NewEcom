import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const js = {
    data: [
      {
        id: 1,
        storeName: "XuXu Shop",
        no: "ECOM55-50484-50",
        img: "https://images.autofun.co.th/file1/206a62568fe84b238b39f9a2ea9b600d_800.jpg",
        name: "ผ้าม๊อบ Imported JSX component Refund_Return must be in PascalCase or SCREAMING_SNAKE_CASE",
        price: "78",
        dis: "28",
        pricetotal: "35",
        detials: "400c ชุด 30 ผืน",
        amount: "1",
        date: "16-2-2022",
        status: [
          {
            id: "1",
            step: "พัสดุถูกจัดส่งแล้ว",
            date: "14-12-2022 08:31",
          },
        ],
        address: "151/1 ม.3 ต.โชคชัย อ.โชคชัย จ.นครราชสีมา 30190",
        name2: "วัชรพล พร้อมกระโทก",
        tel: "0883630631",
        time: [
          {
            id: "1",
            step: "เวลาที่สั่งซื้อ",
            date: "14-12-2022 08:31",
          },
          {
            id: "2",
            step: "เวลาที่ชำระเงิน",
            date: "14-12-2022 08:40",
          },
          {
            id: "3",
            step: "เวลาส่งสินค้า",
            date: "18-12-2022 09:40",
          },
          {
            id: "3",
            step: "เวลาคำสั่งซื้อสำเร็จ",
            date: "19-12-2022 12:40",
          },
        ],
        step: "สำเร็จ",
      },
    ],
  };
  const navigate = useNavigate();

  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="grid grid-cols-12 p-2 mb-20">
      <div className="grid col-span-12">
        {js.data.map((item) => (
          <div key={item.id}>
            <div className="grid grid-cols-12 border rounded-md p-3 mb-2">
              <div className="grid col-span-12">
                <div className="grid grid-cols-12 mb-2">
                  <div className="grid col-span-6">
                    <div className="flex">
                      <i className="far fa-store text-xl"></i>
                      <div className="ml-2 text-xl font-semibold">
                        {item.storeName}
                      </div>
                    </div>
                  </div>
                  <div className="grid col-span-6">
                    <div className="text-end text-red-500">สำเร็จแล้ว</div>
                  </div>
                </div>
              </div>
              <div className="grid col-span-12">
                <div
                  className="grid grid-cols-12"
                  onClick={() => {
                    navigate("../OrderDetails", {
                      state: {
                        Item: [item],
                      },
                    });
                  }}
                >
                  <div className="grid col-span-4 content-center after:pt-[75%] after:block after:content-[''] relative mb-2">
                    <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                      <img
                        className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                        src={item.img}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="grid col-span-8 pl-3 mb-2">
                    <div className="grid col-span-12">
                      <div className="grid grid-cols-12 mb-2">
                        <div className="grid col-span-12">
                          <div className="flex">
                            <div className="text-gray-800 font-semibold">
                              ชื่อสินค้า :
                            </div>
                            <div className="text-gray-500 pl-1 truncate w-36">
                              {item.name}
                            </div>
                          </div>
                        </div>
                        <div className="grid col-span-10">
                          <div className="flex">
                            <div className="text-gray-800 font-semibold">
                              Option :
                            </div>
                            <div className="text-gray-500 pl-1">M</div>
                            <div className="text-gray-500 font-semibold mx-1">
                              |
                            </div>
                            <div className="text-gray-800 font-semibold">
                              Unit :
                            </div>
                            <div className="text-gray-500 pl-1">ชิ้น</div>
                          </div>
                        </div>
                        <div className="grid col-span-2">
                          <div className="text-end mr-1">x{item.amount}</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-12 justify-end">
                      <div className="flex">
                        <div className="text-gray-500 font-semibold line-through">
                          ฿{item.dis}
                        </div>
                        <div className="text-red-500 pl-1">฿{item.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid col-span-12 pt-2 border border-b-white border-r-white border-l-white">
                <div className="grid grid-cols-12 mb-2">
                  <div className="grid col-span-6">
                    <div className="text-gray-500">{item.amount} ชิ้น</div>
                  </div>
                  <div className="grid col-span-6 justify-end">
                    <div className="flex">
                      <div className="text-gray-500">รวมการสั่งซื้อ :</div>
                      <div className="text-red-500 pl-1">
                        ฿{item.pricetotal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid col-span-12 pt-2 border border-b-white border-r-white border-l-white">
                <div className="grid grid-cols-12 mb-2">
                  <div className="grid col-span-6">
                    <div className="flex">
                      <i className="far fa-truck pt-[2px] text-[#26aa99]"></i>
                      <div className="ml-2 text-[#26aa99]">พัสดุถูกส่งแล้ว</div>
                    </div>
                  </div>
                  <div className="grid col-span-6 justify-end content-center">
                    <i className="far fa-chevron-right"></i>
                  </div>
                </div>
              </div>
              <div className="grid col-span-12 pt-2 border border-b-white border-r-white border-l-white">
                <div className="grid grid-cols-12 mb-2">
                  <div className="grid col-span-8 content-center">
                    <div className="flex">ให้คะแนนภายในวันที่ {item.date}</div>
                  </div>
                  <div className="grid col-span-4">
                    <button className="border p-2 bg-red-500 text-white rounded-lg w-full">
                      ให้คะแนน
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
