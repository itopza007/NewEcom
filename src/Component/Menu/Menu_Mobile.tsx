import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import List from "devextreme-react/list.js";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useRecoilState, useRecoilValue } from "recoil";
import { userdata, UserState } from "../../Recoil/MainRecoil";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { ReactComponent as Icon_grey } from "../../image/SVG_Memorybox/Navbar Top/Nav icon_grey.svg";
import Auth from "../../MainCall/Auth";
import { countchat } from "../../Recoil/ChatRecoil";
import MenuBottom from "./MenuBottom";
import { GetdataAPI, timeout } from "../../MainCall/MainCall";
export default function Menu_Mobile(props) {
  //---------------------ตัวแปร-----------------------------
  const UserStateData = useRecoilValue<userdata>(UserState);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const navigation = [
    { id: 1, text: "Home", icon: "far fa-home" },
    { id: 2, text: "Price", icon: "far fa-dollar-sign" },
    { id: 6, text: "LogOut", icon: "far fa-sign-out " },
  ];
  const { pageshow, Title } = props;
  const [opened, setopened] = useState<boolean>(false);
  const [count, setcount] = useState<number>(0);
  const [nummessage, numsetmessage] = useRecoilState(countchat)

  const toolbarItems = [
    {
      widget: "dxButton",
      location: "after",
      options: {
        icon: "fas fa-grip-vertical",
        onClick: () => setopened(!opened),
      },
    },
    { location: "center", text: Title },
    {
      widget: "dxButton",
      location: "before",
      options: {
        icon: "back",
        onClick: () => navigate(-1),
      },
    },
  ];

  //---------------------onload-----------------------------
  useEffect(() => {
    Auth.CurrentUser().then((res) => {
      if (res === "") {
        numsetmessage(0);
      } else {
        window.addEventListener('message', receiveMessage);
      }
    });
  }, []);

  //---------------------function-----------------------------
  const menucilck = (e) => {
    if (e.itemData.id === 1) {
      navigate("../");
      onOutsideClick();
    } else if (e.itemData.id === 2) {
      navigate("../Price");
      onOutsideClick();
    } else if (e.itemData.id === 6) {
      Auth.LogOut();
      onOutsideClick();
      window.parent.postMessage('AppLogout');
    }
  };

  const receiveMessage = (event: any) => {
    if (event.data === 'addMessage') {
      numsetmessage(prevNum => prevNum + 1);
    }
    console.log(event.data);
  }

  const checkBrowser = () => {

  }

  const messageClick = () => {
    numsetmessage(0)
    // console.log('getClick')
    window.parent.postMessage('getClick');
  }



  const btnMenu = () => {
    return (
      <div className="grid grid-cols-2 ">

        <div className="grid col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 content-center px-5 py-2 ">
          <button className="relative border rounded-full w-10 h-10"
            onClick={() => messageClick()}
          >
            <i className="relative far fa-comments text-xl"></i>

            <span
              className={
                nummessage !== 0
                  ? "absolute bottom-5 left-5  text-[13px] inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#FF4A4A] text-white rounded-full w-[22px]"
                  : "absolute invisible "
              }
            >
              {nummessage}
            </span>
          </button>
        </div>
      </div>
    );
  };
  const btnBack = () => {
    return (
      <button type="button" className="hover:bg-slate-100 pl-5 pr-5 py-4">
        <i
          className="far fa-arrow-left text-xl hover:text-blue-500"
          onClick={() => navigate(-1)}
        ></i>
      </button>
    );
  };
  const onOutsideClick = () => {
    setopened(false);
    return false;
  };
  //---------------------html----------------------------
  function drawerComponentList() {
    return (
      <div className="list relative">
        <div
          className="list absolute top-[60px] shadow"
          style={{ width: "100vw" }}
        >
          <List
            dataSource={navigation}
            className="panel-list dx-theme-accent-as-background-color"
            onItemClick={(e) => {
              menucilck(e);
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <section
        id="bottom-navigation"
        className=" fixed inset-x-0 top-0 z-20 bg-white shadow"
      >
        <Toolbar>
          <Item location="before" render={btnBack} />
          <Item location="center" text={Title} />
          <Item location="after" render={btnMenu} />
        </Toolbar>
      </section>
      <Drawer
        className="fixed inset-x-0 top-0 z-10"
        opened={opened}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode="shrink"
        position="top"
        component={drawerComponentList}
        revealMode="expand"
        height={"auto"}
        maxSize={200}
      ></Drawer>
      <div id="content" className="dx-theme-background-color">
        <div className="grid grid-cols-12 bg-[#F6F9FF] mb-16 mt-[60px]">
          <div className="grid  col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white">
            {pageshow}
          </div>
        </div>
      </div>

      <MenuBottom />
    </>
  );
}
