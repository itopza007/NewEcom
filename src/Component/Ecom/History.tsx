import TabPanel, { Item } from "devextreme-react/tab-panel";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PendingPay from "./PendingPay";
import { GetdataAPI } from "../../MainCall/MainCall";
import liff from "@line/liff/dist/lib";
import ToDeliver from "./ToDeliver";
import MustGet from "./MustGet";
import Success from "./Success";
import Canceled from "./Canceled";
import Refund_Return from "./Refund_Return";
import { useRecoilState } from "recoil";
import { active } from "../../Recoil/MenuRecoil";

export default function History() {
  //------------------------ตัวแปร-----------------------------
  const [SOitem, setSOitem] = useState([]);
  const [SOheader, setSOheader] = useState([]);
  const [SOcount, setSOcount] = useState("");
  const [isSOLoading, setSOIsLoading] = useState(true);
  const [INVitem, setINVitem] = useState([]);
  const [INVcount, setINVcount] = useState(0);
  const [isINVLoading, setINVIsLoading] = useState(true);
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [menuactive, setmenuactive] = useRecoilState(active);
  //--------------------------------------------onload ------------------------------------------
  useEffect(() => {
    setmenuactive(3);
    GetSOdata();
    GetINVdata();
  }, []);
  //--------------------------------------------function ------------------------------------------
  const GetSOdata = () => {
    GetdataAPI("/api/MainSale/SelectOrderItemNotInv", { order_id: "" }).then(
      (res) => {
        console.log(res);
        if (res.Status === "Success") {
          let header = [];
          const so = res.Data;
          so.forEach((item, index) => {
            const chk = header.filter((e) => {
              return e.order_id === item.order_id;
            });

            if (chk.length === 0) {
              const newdata = {
                order_id: item.order_id,
                order_no: item.order_no,
                grand_total: item.grand_total,
              };
              header.push(newdata);
            }
          });
          setSOheader(header);
          setSOitem(so);
          if (header.length === 0) {
            setSOcount("");
          } else {
            setSOcount(String(header.length));
          }
        }
      }
    );
    setSOIsLoading(false);
  };

  const GetINVdata = () => {
    GetdataAPI("/api/MainSale/SelectOrderInv", {}).then((res) => {
      if (res.Status === "Success") {
        setINVitem(res.Data);
        setINVcount(res.Data.length);
      }
      setINVIsLoading(false);
    });
  };
  //------------------------HTML------------------------------
  return (
    <div className="grid grid-cols-12">
      <div className="grid cols-span-12">
        <TabPanel
          className=" bg-white "
          height={"100%"}
          focusStateEnabled={false}
          deferRendering={false}
          swipeEnabled={false}
          animationEnabled={true}
          width={"100vw"}
          scrollingEnabled={true}
          selectedIndex={parseInt(tab)}
        >
          <Item title="ที่ต้องชำระ" badge={SOcount}>
            <PendingPay
              SOheader={SOheader}
              SOitem={SOitem}
              isLoading={isSOLoading}
              fn_refreshSO={GetSOdata}
            />
          </Item>
          <Item title="ที่ต้องจัดส่ง">
            <ToDeliver />
          </Item>
          <Item title="ที่ต้องได้รับ">
            <MustGet />
          </Item>
          <Item title="สำเร็จ">
            <Success />
          </Item>
          <Item title="ยกเลิกแล้ว">
            <Canceled />
          </Item>
          <Item title="การคืนเงิน/คืนสินค้า">
            <Refund_Return />
          </Item>
        </TabPanel>
      </div>
    </div>
  );
}
