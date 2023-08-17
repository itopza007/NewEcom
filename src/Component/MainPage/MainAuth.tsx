import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../MainCall/Auth";
import liff from "@line/liff/dist/lib";
import { GetdataAPI_Outside } from "../../MainCall/MainCall";

export default function MainAuth() {
  /*   interface LocationState {
    UserId: string;
    uri: string;
  }
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany; */
  const navigate = useNavigate();
  const [islogin, setislogin] = useState(true);
  useEffect(() => {
    if (liff.isInClient() === false) {
      Auth.CurrentUser().then((res) => {
        if (res === "") {
          setislogin(false);
        } else {
          navigate("/");
        }
      });
    } else {
      Auth.LogOut();
      setislogin(false);
    }
  }, []);
  if (islogin) return;
  return (
    <>
      <div className="max-h-screen">
        <Outlet />
      </div>
    </>
  );
}
