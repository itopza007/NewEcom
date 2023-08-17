import { useNavigate } from "react-router-dom";

export default function ConfirmPhone() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  let navigate = useNavigate();
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-3">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start"></div>
      </div>
    </div>
  );
}
