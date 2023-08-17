import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import List from "devextreme-react/list.js";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useRecoilValue } from "recoil";
import { userdata, UserState } from "../../Recoil/MainRecoil";
import Auth from "../../MainCall/Auth";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import MenuBottom from "./MenuBottom";
import { GetdataAPI, timeout } from "../../MainCall/MainCall";
import { ReactComponent as Icon_grey } from "../../image/SVG_Memorybox/Navbar Top/Nav icon_grey.svg";
export default function Menu_index(props) {
  //-----------------ตัวแปร-------------------------------------------
  const UserStateData = useRecoilValue<userdata>(UserState);
  const { pageshow, Title } = props;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const navigation = [
    { id: 1, text: "Home", icon: "far fa-home" },
    { id: 2, text: "Price", icon: "far fa-dollar-sign" },
    { id: 6, text: "LogOut", icon: "far fa-sign-out " },
  ];
  const [opened, setopened] = useState<boolean>(false);
  const [count, setcount] = useState<number>(0);
  //-----------------onload-------------------------------------------

  //-----------------function-------------------------------------------
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
    }
  };
  const iconMenu = () => {
    return <UpimgIcon className="inline h-[auto] w-[40px] ml-2" />;
  };
  const btnMenu = () => {
    return (
      <button type="button" className="hover:bg-slate-100 p-2">
        <Icon_grey
          className="inline h-[auto] w-[30px] "
          onClick={() => setopened(!opened)}
        />
        {/*  <i
          className="fas fa-grip-vertical"
          onClick={() => setopened(!opened)}
        ></i> */}
      </button>
    );
  };

  const onOutsideClick = () => {
    setopened(false);
    return false;
  };
  function drawerComponentList() {
    return (
      <div className="list relative">
        <div
          className="list absolute top-[60px] shadow"
          style={{ width: "100vw" }}
        >
          <List
            dataSource={navigation}
            className=""
            onItemClick={(e) => {
              menucilck(e);
            }}
          />
        </div>
      </div>
    );
  }
  //-----------------html-------------------------------------------
  return (
    <>
      <section
        id="bottom-navigation"
        className=" fixed inset-x-0 top-0 z-20 bg-white shadow"
      >
        <Toolbar>
          <Item location="center" render={iconMenu} />
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
      <div id="content" className="">
        <div className="grid grid-cols-12 bg-[#F6F9FF] pt-[60px] pb-[62px]">
          <div className="grid  col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white">
            {pageshow}
          </div>
        </div>
      </div>
      <MenuBottom />
    </>
  );
}
