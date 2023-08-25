import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import List from "devextreme-react/list.js";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { userdata, UserState } from "../../Recoil/MainRecoil";
import Auth from "../../MainCall/Auth";
import { countcart } from "../../Recoil/CartRecoil";

export default function Menu_PC(prop) {
  //------------------------------------ตัวแปร---------------------------------------------
  const UserStateData = useRecoilValue<userdata>(UserState);
  const navigate = useNavigate();
  const navigation = [
    { id: 1, text: "Home" },
    { id: 2, text: "Price" },
    { id: 3, text: "My order" },
    { id: 4, text: "My Profile" },
  ];
  const { pageshow } = prop;
  const [opened, setopened] = useState<boolean>(true);
  const [txtLogin, settxtLogin] = useState("");
  const [numcount, setnumcount] = useRecoilState(countcart);
  //------------------------------------onload---------------------------------------------
  useEffect(() => {
    Auth.CurrentUser().then((res) => {
      if (res === "") {
        settxtLogin("LogIn");
      } else {
        settxtLogin("LogOut");
      }
    });
  }, []);
  //------------------------------------function---------------------------------------------

  const iconClick = () => {
    setopened(!opened);
  };
  const menucilck = (e) => {
    if (e.itemData.id === 1) {
      navigate("/");
    } else if (e.itemData.id === 2) {
      navigate("/Price");
    } else if (e.itemData.id === 3) {
      navigate("/Main/Cart", {
        state: {
          num: 1,
        },
      });
    } else if (e.itemData.id === 4) {
      navigate("/Main/MyProfile", {
        state: {
          num: 0,
        },
      });
    }
  };
  const LogInorLogOut = () => {
    if (txtLogin === "LogOut") {
      settxtLogin("LogIn");
      setnumcount(0);
      Auth.LogOut();
      navigate("/");
    } else {
      settxtLogin("LogOut");
      navigate("/Main");
    }
  };
  const MenuItem = () => {
    return (
      <button type="button" className="">
        <UpimgIcon className="inline h-[auto] w-[30px] " onClick={iconClick} />
      </button>
    );
  };
  const AboutItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8">About</div>
      </button>
    );
  };
  const TechItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("/Main/Cart")}>
          Cart
        </div>
      </button>
    );
  };
  const PriceItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("/Main/MyProfile")}>
          My Profile
        </div>
      </button>
    );
  };
  const ChatItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("/Main/Chat")}>
          Chat
        </div>
      </button>
    );
  };
  const LoginItem = () => {
    return (
      <button
        type="button"
        className={
          txtLogin === "LogOut"
            ? "btn-login px-6 "
            : "btn-login px-6 bg-red-500"
        }
        onClick={LogInorLogOut}
      >
        {txtLogin}
      </button>
    );
  };

  //------------------------------------ HTML ---------------------------------------------
  return (
    <>
      <Toolbar>
        <Item location="center" render={MenuItem} />
        <Item location="center" render={AboutItem} />
        <Item location="center" render={TechItem} />
        <Item location="center" render={PriceItem} />
        <Item location="center" render={ChatItem} />
        <Item location="center" render={LoginItem} />
      </Toolbar>
      <Drawer
        opened={opened}
        openedStateMode="shrink"
        //position='left'
        //revealMode={revealMode}
        component={drawerComponentList}
        closeOnOutsideClick={false}
        height="auto"
      >
        <div id="content" className="dx-theme-background-color">
          <div className="grid grid-cols-12 bg-[#F6F9FF] sm:mb-16 lg:mb-0">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white min-h-[90vh]">
              {pageshow}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );

  function drawerComponentList() {
    return (
      <div className="list">
        <div className="list" style={{ width: "200px" }}>
          <List
            dataSource={navigation}
            className="bg-fill"
            onItemClick={(e) => {
              menucilck(e);
            }}
          />
        </div>
      </div>
    );
  }
}
