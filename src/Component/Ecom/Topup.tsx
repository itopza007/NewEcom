import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "devextreme-react/popup";
import TextBox from "devextreme-react/text-box";

import { NumberBox } from "devextreme-react/number-box";

import { GetdataAPI } from "../../MainCall/MainCall";
import pic1 from "../../image/with.png";

import { useTranslation } from "react-i18next";

import { userWebdata, userdata, UserState } from "../../Recoil/MainRecoil";
import { useRecoilState, useRecoilValue } from "recoil";

import Image_a from "../../image/american.png";
import Image_j from "../../image/jcb.png";
import Image_v from "../../image/visa.png";
import Image_m from "../../image/mastercard.png";
import Image_c from "../../image/card.png";

import qr from "../../image/qr.jpg";

import { Confrim } from "./Confrim";
import { Pincode } from "./Pincode";

export function Topup(prop) {
  const { t } = useTranslation();

  let navigate = useNavigate();

  const User = useRecoilValue<userdata>(UserState);
  const { username, ud } = User;

  const popup_config = {
    hide: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: { my: "center" as const, at: "center" as const, of: window },
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
        position: { my: "center" as const, at: "center" as const, of: window },
      },
    },
  };
  interface FromValues {
    cardnumber: string;
    expiration: string;
    securityCode: string;
    holdername: string;
  }
  interface ParameterApi {
    rememberCard: boolean;
    card: Cards;
  }

  interface Cards {
    number: string;
    expirationMonth: string;
    expirationYear: string;
    securityCode: string;
    name: string;
  }

  const [FromCard, setFromCard] = useState<FromValues>({
    cardnumber: "",
    expiration: "",
    securityCode: "",
    holdername: "",
  });
  const cardnumber = useRef(null);
  const expiration = useRef(null);
  const securityCode = useRef(null);
  const holdername = useRef(null);

  const Amount = useRef(null);

  const [isPopupTopup, setPopupTopup] = useState<boolean>(false);
  const [isPopupTopupQr, setPopupTopupQr] = useState<boolean>(false);

  const [mark, setmark] = useState<string>("");
  const [imgCard, setimgCard] = useState<string>(Image_c);
  const [step1, setstep1] = useState<boolean>(false);
  const [step2, setstep2] = useState<boolean>(false);

  const [labelshow, setlabelshow] = useState(true);

  ///////pin
  const [TopupBy, setTopupBy] = useState<string>("");

  const [isPopupVisiblePin, setPopupVisibilityPin] = useState<boolean>(false);
  const TogglePinPopup = () => {
    setPopupVisibilityPin(!isPopupVisiblePin);
  };

  const [isPopupConfirm, setPopupConfirm] = useState<boolean>(false);
  const PinPopupResult = (result) => {
    if (result === "OK") {
      setPopupConfirm(!isPopupConfirm);
    } else if (result === "Cancel") {
      setPopupVisibilityPin(false);
    } else {
    }
  };
  const ConfrimPopupResult = (result) => {
    if (result === "OK") {
      save();
    } else if (result === "Cancel") {
      setPopupConfirm(false);
    } else {
    }
  };
  ///////End pin

  const togglePopupTopup = () => {
    setstep1(false);
    setPopupTopup(!isPopupTopup);
  };
  const togglePopupTopupQr = () => {
    setstep2(false);
    setPopupTopupQr(!isPopupTopupQr);
  };
  const save = () => {
    GetdataAPI("/api/Main/saveEmail", {
      userweb_id: 4058,
      //email: email.current.instance.option("value"),
    }).then(async (res) => {
      await console.log(GetdataAPI);
      if (res[0].status === "failure") {
        alert("failure");
      } else if (res[0].status.trim() === "Success") {
        alert("Success");
      }
    });
  };
  const creditCardType = (T: string) => {
    console.log(T);
    let visa = /^4\d{0,15}/;
    let mastercard = /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/;
    let jbc = /^(?:35\d{0,2})\d{0,12}/;
    let american = /^(?:35\d{0,2})\d{0,12}/;

    console.log("visa: " + visa.test(T));
    console.log("mastercard: " + mastercard.test(T));
    console.log("jbc: " + mastercard.test(T));

    if (visa.test(T)) {
      return "visa";
    }
    if (mastercard.test(T)) {
      return "mastercard";
    }
    if (jbc.test(T)) {
      return "jbc";
    }
    if (american.test(T)) {
      return "american";
    }
    return undefined;
  };
  const onInputchange = async (e) => {
    const enteredvalue = e.value;
    const enteredName = e.id;
    // console.log(enteredName + "  " + enteredvalue);

    let CardType = await creditCardType(enteredvalue);
    console.log(CardType);
    if (CardType === "mastercard") {
      setmark("0000 0000 0000 0000");
      setimgCard(Image_m);
      return;
    }
    if (CardType === "visa") {
      setmark("0000 0000 0000 0000");
      setimgCard(Image_v);
      return;
    }
    if (CardType === "jbc") {
      setmark("0000 0000 0000 0000");
      setimgCard(Image_j);
      return;
    }
    if (CardType === "american") {
      setmark("0000 000000 00000");
      setimgCard(Image_a);
      return;
    }
    if (CardType === undefined) {
      setmark("");
      setimgCard(Image_c);
      return;
    }
    setFromCard({
      ...FromCard,
      [enteredName]: enteredvalue,
    });
  };
  const chkTopup = () => {
    if (Amount.current.instance.option("text") === "") {
      setlabelshow(false);
    } else {
      if (Amount.current.instance.option("value") === 0 || TopupBy === "") {
        return;
      }
      if (TopupBy === "Qrcode") {
        navigate("../TopupQrcode/", {
          state: {
            rate_id: prop.rate_id,
            num: Amount.current.instance.option("value"),
          },
        });

        //navigate("TopupQrcode/"+ prop.rate_id +"/"+Amount.current.instance.option('value'))
      }
      if (TopupBy === "Cradit card") {
        navigate("../TopupCreditcard/", {
          state: {
            rate_id: prop.rate_id,
            num: Amount.current.instance.option("value"),
          },
        });
      }
    }
  };

  const [count, setCount] = useState(0);
  const [countInTimeout, setCountInTimeout] = useState(0);

  useEffect(() => {}, []);

  const ContentTopup = () => {
    return (
      <>
        {!step1 ? (
          <form>
            <div className="grid grid-cols-12 gap-6">
              <div className=" grid col-span-10 content-center">
                <label className="block  text-sm font-medium text-gray-900  ">
                  หมายเลขบัตร
                </label>

                <TextBox
                  mask={mark}
                  defaultValue=""
                  placeholder=""
                  ref={cardnumber}
                  onValueChanged={onInputchange}
                />
              </div>
              <div className=" grid col-span-2 content-center">
                <img
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                  src={imgCard}
                />
              </div>
              <div className=" grid col-span-6 content-center">
                <label className="block  text-sm font-medium text-gray-900 ">
                  วันหมดอายุ (ดด/ปป)
                </label>
                <TextBox
                  mask="00/00"
                  defaultValue=""
                  placeholder=""
                  ref={expiration}
                />
              </div>

              <div className=" grid col-span-6 content-center">
                <label className="block  text-sm font-medium text-gray-900 ">
                  CVV
                </label>
                <TextBox
                  mode="password"
                  maxLength={3}
                  defaultValue=""
                  placeholder=""
                  ref={securityCode}
                />
              </div>

              <div className=" grid col-span-12 content-center">
                <label className="block  text-sm font-medium text-gray-900 ">
                  ชื่อเจ้าของบัตร
                </label>
                <TextBox defaultValue="" placeholder="" ref={holdername} />
              </div>
              <div className="grid col-span-12 content-center">
                <button
                  type="button"
                  className="btn-save"
                  onClick={(e) => setstep1(!step1)}
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form>
            <div className="grid grid-cols-12 gap-6">
              <div className=" grid col-span-12 content-center">
                <label className="block  text-sm font-medium text-gray-900 ">
                  เลขที่อ้างอิง
                </label>
                <TextBox
                  disabled={true}
                  value="456782534723"
                  placeholder=""
                  ref={holdername}
                />
              </div>

              <div className=" grid col-span-6 content-center">
                <h3>จำนวนเงิน</h3>
              </div>
              <div className=" grid col-span-6 content-center">
                <h3 className="text-end">
                  <NumberBox
                    rtlEnabled={true}
                    defaultValue={Amount.current.instance.option("value")}
                    placeholder=""
                  />
                </h3>
              </div>
              <div className="grid grid-cols-12 gap-6 absolute inset-x-0 bottom-5 mx-5">
                <div className="grid col-span-6 content-center">
                  <button
                    type="button"
                    className="btn-save"
                    onClick={(e) => setstep1(!step1)}
                  >
                    Back
                  </button>
                </div>
                <div className="grid col-span-6 content-center">
                  <button
                    type="button"
                    className="btn-save"
                    onClick={TogglePinPopup}
                  >
                    Confrim
                  </button>

                  <Pincode
                    data={isPopupVisiblePin}
                    fnToggle={TogglePinPopup}
                    fnReturn={PinPopupResult}
                  />
                  <Confrim
                    data={isPopupConfirm}
                    fnReturn={ConfrimPopupResult}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </>
    );
  };

  const ContentTopupQr = () => {
    return (
      <>
        <div className="grid grid-cols-12 gap-6">
          <div className=" grid col-span-12 content-center">
            <label className="block  text-sm font-medium text-gray-900 ">
              {t("Reference number")}
            </label>
            <TextBox
              disabled={true}
              value="456782534723"
              placeholder=""
              ref={holdername}
            />
          </div>

          <div className=" grid col-span-12 items-center justify-center content-center">
            <img className="h-64" src={qr} />
          </div>

          <div className="grid col-span-12 content-center">
            <button
              type="button"
              className="btn-save"
              onClick={(e) => setstep2(!step2)}
            >
              Back
            </button>
          </div>
        </div>
      </>
    );
  };

  const ContentSelectTopup = () => {
    return (
      <>
        <div className="grid grid-cols-12 gap-6">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <div className="text-center text-lg">{t("Choose Payment")}</div>
          </div>
          <div
            className={
              TopupBy === "Qrcode"
                ? "grid bg-slate-100 justify-items-center col-span-6 content-center  border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50"
                : "grid justify-items-center col-span-6 content-center  rounded-md border border-[color:var(--main-bg-color)] hover:bg-slate-50"
            }
            onClick={(e) => setTopupBy("Qrcode")}
          >
            <div className="grid justify-items-center">
              <img
                className="w-10 h-8"
                src="https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
              />
              <div className="text-center">{t("Qrcode")}</div>
            </div>
          </div>
          <div
            className={
              TopupBy === "Cradit card"
                ? "grid bg-slate-100 justify-items-center col-span-6 content-center border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50"
                : "grid justify-items-center col-span-6 content-center border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50"
            }
            onClick={(e) => setTopupBy("Cradit card")}
          >
            <div className="grid justify-items-center">
              <img
                className="w-16 h-8"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Lm_3eYqIhoTyY8M7UCxBZW2ADD5rameJ2lnLYXqYi45p8WQEsoRi6DjOGK7dEWRacK8&usqp=CAU"
              />
              <div className="text-center">{t("Cradit card")}</div>
            </div>
          </div>
          <div className=" grid col-span-12 content-center">
            <label className="block  text-sm font-medium text-gray-900  ">
              {t("Amount")}
            </label>
            <NumberBox
              placeholder=""
              ref={Amount}
              defaultValue=""
              valueChangeEvent="keyup"
              onValueChanged={() => {
                if (Amount.current.instance.option("text") !== "") {
                  setlabelshow(true);
                } else {
                  setlabelshow(false);
                }
              }}
            />
            {!labelshow ? (
              <label className="block  text-sm font-medium text-red-500 ">
                {t("Please Enter Amount")}
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <button type="button" className="btn-save" onClick={chkTopup}>
              {t("Next")}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Popup
        onShowing={() => setTopupBy("")}
        position="bottom"
        animation={popup_config}
        visible={prop.data}
        closeOnOutsideClick={true}
        onHiding={prop.fnToggle}
        contentRender={ContentSelectTopup}
        title={t("Select Topup to") + prop.rate_name}
        height="auto"
        width="100%"
      />
      <Popup
        position="bottom"
        animation={popup_config}
        visible={isPopupTopupQr}
        closeOnOutsideClick={true}
        onHiding={togglePopupTopupQr}
        contentRender={ContentTopupQr}
        title="Topup by Qrcode"
        height="auto"
        width="100%"
      />
      <Popup
        position="bottom"
        animation={popup_config}
        visible={isPopupTopup}
        closeOnOutsideClick={true}
        onHiding={togglePopupTopup}
        contentRender={ContentTopup}
        title="Topup by Cradit card"
        height={395}
        width="100%"
      />
    </>
  );
}

export function TopupVal() {
  return <div>Topup</div>;
}
