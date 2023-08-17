import { ReactComponent as Loveandman } from "../../image/SVG_Memorybox/Home instruction/Loveandaman.svg";
import { ReactComponent as Passion } from "../../image/SVG_Memorybox/Home instruction/Passion.svg";
import { ReactComponent as Rai } from "../../image/SVG_Memorybox/Home instruction/500 Rai.svg";
import { ReactComponent as Symbol } from "../../image/SVG_Memorybox/Home instruction/Symbol_White.svg";
import Banner from "../../image/Banner Pricing.png";
import Ads from "../MainPage/Ads";

export default function Price() {
  //------------------------HTML------------------------------
  return (
    <>
      <Ads />
      <div className="grid grid-cols-12 ">
        <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
          <div className="px-4 bg-[#F6F9FF] mt-2">
            <div className="grid grid-cols-12 mt-5 mb-5">
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5">
                <img src={Banner}></img>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
                <button
                  type="button"
                  className=" bg-[#0D6AFA] py-3 rounded hover:bg-blue-800 active:bg-blue-900"
                >
                  <div className="grid grid-cols-12 ">
                    <div className="grid content-center justify-center col-span-12  ">
                      <span className="inline-flex ">
                        <Symbol />
                        <div className="grid content-center pl-8 text-white text-[18px]">
                          อัพโหลดภาพใบหน้าเพื่อค้นหา
                        </div>
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-7">
              <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                <div className="text-[#000000] opacity-60 text-center text-[11px]">
                  {" "}
                  *เนื่องด้วยนโยบายความเป็นส่วนตัว
                  ระบบจะแสดงภาพพรีวิวหลังผลการค้นหา
                </div>
                <div className="text-[#000000] opacity-60 text-center text-[11px] px-10">
                  {" "}
                  *Due to the privacy & policy, a preview image will be
                  displayed after the search results.
                </div>
              </div>
            </div>

            <div className="bg-white py-6">
              <div className="px-8">
                <div className="grid grid-cols-12 mb-5">
                  <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start text-[19px] ">
                    <div className="font-extrabold">Pricing</div>
                  </div>
                </div>

                <div className="px-2">
                  <div className="grid grid-cols-12 mb-2">
                    <div className="grid  col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-center ">
                      <div className="mb-1 text-[10px] text-[#000000] opacity-50">
                        ขนาดรูป
                      </div>
                      <div className="pl-1">
                        <div className="flex items-center ">
                          <div className="flex  items-center rounded-full bg-[#2679FA]  drop-shadow-md rounded-full px-[11.5px] py-[5.5px] ">
                            <span className="text-white text-[14px]">L</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid justify-center col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center ">
                      <div className="grid grid-cols-12">
                        <div className="grid justify-end col-span-8  sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-center ">
                          <div className="text-base mt-3 text-[#000000] opacity-60">
                            {" "}
                            2560x3840
                          </div>
                          <div className="grid justify-end text-[10px] text-[#000000] opacity-60">
                            Picxels
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid justify-end col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-center ">
                      <div className="grid justify-center content-center bg-[#0062FA19] rounded  h-[37px] w-20 text-[#2679FA] font-bold border-2 border-[#2679FA] mt-3">
                        <span>
                          <span className="text-[13px]">฿ </span>
                          <span className="text-[16px]">199</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 mb-2">
                    <div className="grid  col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-center ">
                      <div className="mb-1 text-[10px] text-[#000000] opacity-50">
                        ขนาดรูป
                      </div>
                      <div className="pl-1">
                        <div className="flex items-center ">
                          <div className="flex  items-center rounded-full bg-[#2679FA]  drop-shadow-md rounded-full px-[10.5px] py-[5.5px]  ">
                            <span className="text-white text-[14px]">M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid justify-center col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center ">
                      <div className="grid grid-cols-12">
                        <div className="grid justify-end col-span-8  sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-center ">
                          <div className="text-base  mt-3 text-[#000000] opacity-60">
                            1920x1080{" "}
                          </div>
                          <div className="grid justify-end text-[10px] text-[#000000] opacity-60">
                            Picxels
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid justify-end col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-center ">
                      <div className="grid justify-center content-center bg-[#0062FA19] rounded  h-[37px] w-20 text-[#2679FA] font-bold border-2 border-[#2679FA] mt-3">
                        <span>
                          <span className="text-[13px]">฿ </span>
                          <span className="text-[16px]">149</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 mb-8">
                    <div className="grid  col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-center ">
                      <div className="mb-1 text-[10px] text-[#000000] opacity-50">
                        ขนาดรูป
                      </div>
                      <div className="pl-1">
                        <div className="flex items-center ">
                          <div className="flex  items-center rounded-full bg-[#2679FA]  drop-shadow-md rounded-full px-[11.5px] py-[5.5px] ">
                            <span className="text-white text-[14px]">S</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid justify-center col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center ">
                      <div className="grid grid-cols-12">
                        <div className="grid justify-end col-span-9  sm:col-span-9 md:col-span-9 lg:col-span-9 xl:col-span-9 content-center ">
                          <div className="text-base  mt-3 text-[#000000] opacity-60">
                            720x480
                          </div>
                          <div className="grid justify-end text-[10px] text-[#000000] opacity-60">
                            Picxels
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid justify-end col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-center ">
                      <div className="grid justify-center content-center bg-[#0062FA19] rounded h-[37px] w-20 text-[#2679FA] font-bold border-2 border-[#2679FA]  mt-3">
                        <span className="">
                          <span className="text-[13px]">฿ </span>
                          <span className="text-[16px]">99</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start text-[14px] text-[#000000] opacity-60">
                  *รูปของท่านจะหมดอายุภายใน 3 วัน หลังจากการเดินทาง
                </div>
              </div>
            </div>
            <section className="mt-5">
              <div className="grid grid-cols-12 gap-3 mt-2 mb-2">
                <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-4 font-bold text-[#000000] opacity-60">
                  Trusted by the most famous tourism companies
                </div>
              </div>

              <div className="grid grid-cols-12 gap-3">
                <div className="grid col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start ">
                  <Loveandman className="inline h-[auto] w-[100px] " />
                </div>

                <div className="grid justify-center col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start ">
                  <Rai className="inline h-[auto] w-[100px]" />
                </div>

                <div className="grid justify-end col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start ">
                  <Passion className="inline h-[auto] w-[100px]" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
