import { useLocation, useNavigate } from "react-router-dom";

//--------------------------------------------DevStore/interface ------------------------------------------
interface LocationState {
  phoneORmail: string;
  email: string;
}
export default function ForgotEmail() {
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //------------------------HTML------------------------------
  return (
    <div className="px-5 py-10">
      <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 text-2xl font-bold mb-5">
        รีเซ็ตรหัสผ่าน
      </div>

      <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-1 ">
        <span>
          <span>ลิงค์รีเซ็ตรหัสผ่านถูกส่งไปยังอีเมลของคุณแล้ว </span>
          <span className="text-blue-600 cursor-pointer hover:text-blue-800 active:text-blue-900 font-bold">
            {StateInterface.email}
          </span>
        </span>
      </div>
      <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start  ">
        <div>ตรวจสอบอีเมลของคุณและคลิกที่ลิงค์เพื่อดำเนินการต่อ!</div>
      </div>
    </div>
  );
}
