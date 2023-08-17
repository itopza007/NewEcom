import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";

export default function ForgotNewPass() {
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  //------------------------function--------------------------
  const Toconfirm = () => {
    alert("บันทึกเรียบร้อย");
    navigate("/Authen");
  };
  //------------------------HTML------------------------------
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 ">
        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 text-xl font-bold mb-3">
          ระบุรหัสผ่านใหม่
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mb-2">
          <label className="block  text-sm font-medium text-gray-900  mb-2">
            กรอกรหัสผ่านใหม่
          </label>
          <TextBox mode="password" defaultValue="" placeholder="" />
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mb-4">
          <label className="block  text-sm font-medium text-gray-900  mb-2">
            กรอกรหัสผ่านใหม่อีกครั้ง
          </label>
          <TextBox mode="password" defaultValue="" placeholder="" />
        </div>
      </div>
      <div className="grid grid-cols-12 ">
        <div className="grid col-span-12 sm:col-span-4 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
          <button type="button" className="btn-save" onClick={Toconfirm}>
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
