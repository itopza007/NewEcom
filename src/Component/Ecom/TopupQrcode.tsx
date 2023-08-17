import React, { useRef, useState, useEffect } from "react";

import icon from "../../image/logo.jpg";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import PopupTopupSuccess from "../MainPage/PopupTopupSuccess";
import { useNavigate } from "react-router-dom";
import { GetdataAPI, timeout } from "../../MainCall/MainCall";
import { NumberFormat } from "../../MainCall/NumberFormat";
import Loading from "../MainPage/Loading";

//-------------------------------------------- DevStore/interface ------------------------------------------
interface LocationState {
  rate_id: number;
  num: number;
  Data: any;
}
function TopupQrcode() {
  //------------------------useRef-----------------------------
  const qrRef = React.useRef();
  //------------------------ตัวแปร-----------------------------
  let navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const [toggledone, settoggledone] = useState<boolean>(false);
  const [load, setload] = useState<boolean>(true);
  const [url, setUrl] = React.useState("");
  const [refNO, setrefNO] = React.useState("");
  const [num, setnum] = React.useState(0);
  const [chk, setchk] = React.useState(0);
  const slist = [];
  const slistData = StateInterface.Data;

  //------------------------onload----------------------------
  useEffect(() => {
    if (chk !== 0) {
      timeout(3000).then(() => {
        GetdataAPI("/api/PaymentGateway/SelectDataTrackPayment", {
          referenceno: refNO,
        }).then(async (res2) => {
          if (res2.Status === "Success") {
            if (res2.Data[0].pay_success === true) {
              togglePopupdone();
              setchk(0);
            } else {
              setchk(chk + 1);
            }
          } else {
            setchk(chk + 1);
          }
        });
      });
    }
  }, [chk]);
  React.useEffect(() => {
    if (StateInterface) {
      setnum(StateInterface.num);
      StateInterface.Data.forEach((item) => {
        slist.push({
          order_item_id: item.order_item_id,
          item_ms_id: item.ms_id,
          item_unitid: item.unitid,
          item_qty: item.qty,
          item_unitprice: item.unit_price,
          item_discount: item.item_discount,
          item_cost_id: 1,
          item_remark: item.remark,
        });
      });
      const DateNow = new Date();
      const json = {
        fn: "addrowdoc",
        data: [
          {
            inv_name: "",
            partner_id: slistData[0].partner_id,
            comp_id: slistData[0].comp_id,
            btype: "1",
            vat_using_id: "2",
            inv_date: DateNow,
            inv_duedate: DateNow,
            credit_term: "0",
            credit_term_num: "",
            doctype_id: "R-TV",
            doc_gp_id: "R-TV",
            deposit: 0,
            discount: 0,
            reference_no: slistData[0].order_no,
            dtDetail: slist,
            pay_payment_id: "1014",
            pay_pf_number: "",
            pay_pf_bank_id: "",
            pay_pf_duedate: "",
            pay_pf_bankaccount_no: "",
            pay_pf_bankaccount_branch: "",
          },
        ],
      };
      GetdataAPI("/api/GbQrCode/GetQrCode", {
        amount1: StateInterface.num,
        amount2: StateInterface.num,
        rateid1: "1",
        rateid2: StateInterface.rate_id,
        detail: "เติมเงินผ่าน QRcode",
        condition: "0",
        paymentId: 1014,
        jsonstring: JSON.stringify(json),
      }).then(async (res) => {
        if (res.Status === "Success") {
          if (res.Data.resultCode === "90") {
            alert("ลองอีกครั้ง");
          } else {
            setchk(chk + 1);
          }
          setUrl(res.Data.qrcode);
          setrefNO(res.Data.referenceNo);
        } else {
        }
        setload(false);
      });
      window.history.replaceState({}, document.title);
    } else {
      navigate("../Pay");
    }
  }, []);
  //------------------------function--------------------------
  const downloadQRCode = (e) => {
    e.preventDefault();
    // @ts-ignore
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={200}
      value={url}
      bgColor="white"
      fgColor="Black"
      level="H"
      imageSettings={{
        src: icon,
        excavate: true,
        width: 500 * 0.1,
        height: 500 * 0.1,
      }}
    />
  );
  const togglePopupdone = () => {
    settoggledone(!toggledone);
  };
  const done = () => {
    navigate("../History");
  };
  //------------------------HTML------------------------------
  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <>
          <PopupTopupSuccess
            data={toggledone}
            toggle={togglePopupdone}
            done={done}
          />

          <div className="mx-3 mt-20">
            <div className="grid grid-cols-12">
              <div className=" grid col-span-12 items-center justify-center content-center mb-2">
                <div className="text-xs text-[#000000] opacity-70 font-semibold">
                  REF NO. {refNO}
                </div>
              </div>
              <div className=" grid col-span-12 items-center justify-center content-center mb-2">
                <div className="qr-container__qr-code" ref={qrRef}>
                  {qrCode}
                </div>
              </div>
              <div className=" grid col-span-12 items-center justify-center content-center">
                <div className="text-md font-semibold text-[#000000] opacity-70">
                  {" "}
                  {t("Amount")}
                </div>
              </div>
              <div className=" grid col-span-12 items-center justify-center content-center mb-5">
                <div className="text-2xl font-semibold text-[#000000B2]">
                  ฿{NumberFormat(num)}
                </div>
              </div>
              {/* <div className=" grid col-span-12 content-start mt-4">
      <div className="grid grid-cols-12 gap-6">
        <div className=" grid col-span-6 content-start">
          <button className="btn-save">แชร์ QR</button>
        </div>
        <div className=" grid col-span-6 content-start">
          <button className="btn-save">บันทึก QR</button>
        </div>
      </div>
    </div> */}

              <div className="grid col-span-12 content-center justify-center">
                <button
                  type="button"
                  className="btn-save w-48 h-14"
                  onClick={downloadQRCode}
                >
                  <i className="fad fa-arrow-to-bottom"></i>{" "}
                  {t("Download QRCode")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TopupQrcode;
