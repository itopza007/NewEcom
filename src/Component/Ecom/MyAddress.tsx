import {
  DataGrid,
  DropDownBox,
  ScrollView,
  TextArea,
  TextBox,
} from "devextreme-react";
import {
  FilterRow,
  LoadPanel,
  Paging,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import ArrayStore from "devextreme/data/array_store";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MsgOK, MsgOKCancel } from "../../MainCall/dialog";
import { GetdataAPI } from "../../MainCall/MainCall";

//--------------------------------------------DevStore/interface ------------------------------------------
const Datas = [];
const gridDataSource = new ArrayStore({
  data: Datas,
  key: "a1",
});

export default function MyAddress() {
  //------------------------------------------- useRef ------------------------------------------
  const name = useRef(null);
  const tel = useRef(null);
  const address = useRef(null);
  const addresstext = useRef(null);
  //------------------------------------------- ตัวแปร ------------------------------------------
  const js = {
    Showaddress: [
      {
        id: 1,
        name: "วัชรพล พร้อมกระโทก",
        tel: "0883630631",
        area: "151/1 ม.3 ต.โชคชัย อ.โชคชัย",
        county: "นครราชสีมา",
        zip: "30190",
        district: "อำเภอโชคชัย",
      },
    ],
    address: [
      {
        id: "1",
        name: "วัชรพล พร้อมกระโทก",
        tel: "0883630631",
        area: "151/1 ม.3 ต.โชคชัย อ.โชคชัย",
        county: "นครราชสีมา",
        zip: "30190",
        district: "อำเภอโชคชัย",
      },
      {
        id: "2",
        name: "วัชรพล พร้อมกระโทก",
        tel: "0883630631",
        area: "151/1 ม.3 ต.โชคชัย อ.โชคชัย",
        county: "นครราชสีมา",
        zip: "30190",
        district: "อำเภอโชคชัย",
      },
    ],
  };
  const [btnAddress, setbtnAddress] = useState<string>("1");
  const navigate = useNavigate();
  const [isPopupAddress, setPopupAddress] = useState<boolean>(false);
  const [addressPage, setaddressPage] = useState<boolean>(false);
  const [gridBoxValue, setgridBoxValue] = useState([0]);
  const [isGridBoxOpened, setisGridBoxOpened] = useState<boolean>(false);
  const [isGridBoxAddressOpened, setisGridBoxAddressOpened] =
    useState<boolean>(false);
  const [gridBoxValueAddress, setgridBoxValueAddress] = useState([]);
  const [DataAddress, setDataAddress] = useState([]);

  //------------------------------------------- funtion ------------------------------------------
  useEffect(() => {}, []);

  const togglePopupAddress = () => {
    setPopupAddress(!isPopupAddress);
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
  const saveAddress = async () => {
    setaddressPage(false);
    {
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
          RecieverName: name.current.instance.option("value"),
          RecieverTel: tel.current.instance.option("value"),
          AddressId: AdressId,
          AddressText1: addresstext.current.instance.option("value"),
        }).then(async (res) => {
          MsgOKCancel("แจ้งเตือน", "บันทึกสำเร็จ", "ตกลง").then((res) => {
            if (res) {
              navigate("../MyProfile");
            }
          });
        });
      }
    }
  };

  //---dropdownAddress
  const LoadDataAddress = async () => {
    GetdataAPI("/api/Main/SelectAddress", {}).then((res) => {
      if (res.Status === "Success") {
        setDataAddress(res.Data);
      }
    });
  };
  const syncDataGridAddressSelection = (e) => {
    setgridBoxValueAddress(e.value);
  };
  const dataGridAddressOnSelectionChanged = (e) => {
    setgridBoxValueAddress(e.selectedRowKeys);
    setisGridBoxAddressOpened(false);
  };
  const onGridBoxAddressOpened = (e) => {
    if (e.name === "opened") {
      setisGridBoxAddressOpened(e.value);
      LoadDataAddress();
    }
  };
  const dataGridAddressRender = () => {
    return (
      <DataGrid
        dataSource={DataAddress}
        columns={[{ dataField: "a6", caption: "เลือกพื้นที่" }]}
        hoverStateEnabled={true}
        selectedRowKeys={gridBoxValueAddress}
        onSelectionChanged={dataGridAddressOnSelectionChanged}
        height="100%"
        noDataText="..."
      >
        <LoadPanel enabled={true} />
        <Selection mode="single" />
        <Scrolling mode="virtual" />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  };
  //---dropdownShipping

  //------------------------------------------- HTML------------------------------------------
  return (
    <div className="grid grid-cols-12 p-5">
      <div className="grid col-span-12">
        {!addressPage ? (
          <>
            <ScrollView>
              <div className="grid grid-cols-12 gap-3 py-3 px-2">
                <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                  {js.address.map((item, i) => (
                    <div key={item.id}>
                      <div className="grid grid-cols-12 content-center shadow-md shadow-gray-300 py-3 rounded-md hover:bg-slate-50 active:bg-slate-100 cursor-pointer px-3">
                        <div className="grid col-span-1 content-start text-md justify-self-start">
                          {btnAddress === item.id ? (
                            <i
                              className="far fa-dot-circle text-red-500 text-2xl"
                              onClick={() => {
                                setbtnAddress(item.id);
                              }}
                            ></i>
                          ) : (
                            <i
                              className="far fa-circle text-2xl text-gray-400"
                              onClick={() => {
                                setbtnAddress(item.id);
                                togglePopupAddress();
                              }}
                            ></i>
                          )}
                        </div>
                        <div className="grid col-span-10 content-center text-md ml-2">
                          ที่อยู่จัดส่ง
                          <>
                            <div className="flex">
                              <div>{item.name}</div>
                              <div className="mx-1">|</div>
                              <div>{item.tel}</div>
                            </div>
                            <div className="">{item.area}</div>
                            <div className="flex">
                              <div>{item.district},</div>
                              <div>{item.county},</div>
                              <div>{item.zip}</div>
                            </div>
                          </>
                        </div>
                        <div className="grid justify-end  col-span-1 content-start text-red-500">
                          แก้ไข
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5">
                  <button
                    className="w-full border rounded-lg bg-red-500 text-white p-3"
                    onClick={() => {
                      setaddressPage(true);
                    }}
                  >
                    <div className="flex justify-center text-base">
                      <div className="mr-1">
                        <i className="far fa-plus-circle"></i>
                      </div>
                      <div>เพิ่มที่อยู่ใหม่</div>
                    </div>
                  </button>
                </div>
              </div>
            </ScrollView>
          </>
        ) : (
          <>
            <ScrollView>
              <div className="grid grid-cols-12 gap-3 py-3 px-2">
                <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="grid col-span-12 mb-2">
                      <div className="text-2xl font-semibold">Shipping</div>
                    </div>
                    <div className="grid col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                      <label className="block mb-2 text-sm text-gray-700  font-semibold">
                        ชื่อลูกค้า
                      </label>
                      <TextBox
                        ref={name}
                        className=""
                        placeholder="ระบุชื่อลูกค้า"
                      />
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
                    <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                      <label className="block mb-2 text-sm text-gray-700  font-semibold">
                        ที่อยู่จัดส่ง(ตำบล/อำเภอ/จังหวัด)
                      </label>
                      <DropDownBox
                        value={gridBoxValueAddress}
                        opened={isGridBoxAddressOpened}
                        valueExpr=""
                        deferRendering={false}
                        displayExpr={"a6"}
                        placeholder="กรุณาเลือก"
                        showClearButton={true}
                        dataSource={DataAddress}
                        onValueChanged={syncDataGridAddressSelection}
                        onOptionChanged={onGridBoxAddressOpened}
                        contentRender={dataGridAddressRender}
                        ref={address}
                        className=""
                        focusStateEnabled={false}
                      />
                    </div>
                    <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                      <label className="block mb-2 text-sm text-gray-700  font-semibold">
                        ที่อยู่จัดส่งรายละเอียด
                      </label>
                      <TextArea height={113} ref={addresstext} />
                    </div>
                    <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5 justify-self-center">
                      <button
                        className="border bg-red-500 text-white w-56 h-14 px-3 rounded-full"
                        onClick={saveAddress}
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollView>
          </>
        )}
      </div>
    </div>
  );
}
