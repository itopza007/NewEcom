import TextBox from "devextreme-react/text-box";
import React, { useRef, useState, useEffect } from "react";
import { PinInput } from "react-input-pin-code";
import { useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupFailed from "../MainPage/PopupFailed";
import PopupSuccess from "../MainPage/PopupSuccess";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { DataGrid, DropDownBox, TextArea } from "devextreme-react";
import ArrayStore from "devextreme/data/array_store";
import {
  FilterRow,
  Paging,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import { MsgOK, MsgOKCancel } from "../../MainCall/dialog";

//--------------------------------------------DevStore/interface ------------------------------------------
const Datas = [];
const gridDataSource = new ArrayStore({
  data: Datas,
  key: "a1",
});

export default function DeliveryAddress(props) {
  //------------------------------------------- useRef ------------------------------------------
  const name = useRef(null);
  const tel = useRef(null);
  const address = useRef(null);
  const addresstext = useRef(null);
  //------------------------------------------- ตัวแปร ------------------------------------------
  const navigate = useNavigate();
  const [gridBoxValue, setgridBoxValue] = useState([0]);
  const [isGridBoxOpened, setisGridBoxOpened] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [resize, setresize] = useState(false);
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 900) {
        setresize(true);
      } else {
        setresize(false);
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);
  //------------------------------------------- funtion ------------------------------------------
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
  const save = async () => {
    if (name.current.instance.option("value") === "") {
      MsgOK("แจ้งเตือน", "กรุณากรอกชื่อลูกค้า");
    } else if (tel.current.instance.option("value") === "") {
      MsgOK("แจ้งเตือน", "กรุณากรอกเบอร์โทรลูกค้า");
    } else if (address.current.instance.option("text") === "") {
      MsgOK("แจ้งเตือน", "กรุณาเลือกที่อยู่จัดส่ง(ตำบล/อำเภอ/จังหวัด)");
    } else if (addresstext.current.instance.option("value") === "") {
      MsgOK("แจ้งเตือน", "กรุณากรอกที่อยู่จัดส่งรายละเอียด");
    } else {
      let AdressId = address.current.instance
        .option("value")
        .map((e) => e.a1)
        .join("");
      GetdataAPI("/api/Main/SaveDataDeliveryAddressUserWeb", {
        reciever_name: name.current.instance.option("value"),
        phonenumber: tel.current.instance.option("value"),
        districts_id: AdressId,
        de_address: addresstext.current.instance.option("value"),
      }).then(async (res) => {
        MsgOKCancel("แจ้งเตือน", "บันทึกสำเร็จ", "ตกลง").then((res) => {
          if (res) {
            navigate("../MyProfile");
          }
        });
      });
    }
  };
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="grid grid-cols-12 gap-3 py-3 px-5">
      <div className="grid col-span-12">
        <div className="grid grid-cols-12 gap-3 content-center h-20">
          <div className="grid justify-center col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-start">
            <div className="grid justify-center">
              {currentStep === 1 ? (
                <i className="far fa-map-marker-alt text-2xl text-gray-500"></i>
              ) : (
                <i className="far fa-map-marker-alt text-2xl text-gray-400"></i>
              )}
            </div>
          </div>
          <div className="grid justify-center col-span-1  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 content-start ">
            <div className="text-xl">.....................</div>
          </div>
          <div className="grid justify-center col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start ">
            <div className="grid justify-center">
              {currentStep === 2 ? (
                <i className="fal fa-wallet text-2xl text-gray-500"></i>
              ) : (
                <i className="fal fa-wallet text-2xl text-gray-400"></i>
              )}
            </div>
          </div>
          <div className="grid justify-center col-span-1  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 content-start ">
            <div className="text-xl">.....................</div>
          </div>
          <div className="grid justify-center col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-start">
            <div className="grid justify-center">
              {currentStep === 3 ? (
                <i className="fal fa-check-circle text-2xl text-gray-500"></i>
              ) : (
                <i className="fal fa-check-circle text-2xl text-gray-400"></i>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
        {currentStep === 1 ? (
          <div className="grid grid-cols-12 gap-3">
            <div className="grid col-span-12 mb-2">
              <div className="text-gray-500">Step 1</div>
              <div className="text-2xl font-semibold">Shipping</div>
            </div>
            <div className="grid col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
              <label className="block mb-2 text-sm text-gray-700  font-semibold">
                ชื่อลูกค้า
              </label>
              <TextBox ref={name} className="" placeholder="ระบุชื่อลูกค้า" />
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
            <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
              <label className="block mb-2 text-sm text-gray-700  font-semibold">
                Email
              </label>
              <TextBox ref={tel} className="" placeholder="ระบุ Email" />
            </div>
            <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
              <label className="block mb-2 text-sm text-gray-700  font-semibold">
                Fax
              </label>
              <TextBox ref={tel} className="" placeholder="ระบุ Fax" />
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
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-10 justify-self-center">
              <button
                className="border bg-red-500 text-white w-56 h-14 px-3 rounded-full"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Continue To Payment
              </button>
            </div>
          </div>
        ) : currentStep === 2 ? (
          <div className="grid grid-cols-12 gap-3"></div>
        ) : (
          2
        )}
      </div>
    </div>
  );
}
