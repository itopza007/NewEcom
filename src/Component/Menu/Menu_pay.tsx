import { useEffect, useState, useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import List from "devextreme-react/list.js";
import Drawer from "devextreme-react/drawer";
import Toolbar from "devextreme-react/toolbar";
import { useRecoilValue } from "recoil";
import { userdata, UserState } from "../../Recoil/MainRecoil";
import Auth from "../../MainCall/Auth";
import MenuBottom from "./MenuBottom";

export default function Menu_pay(props) {
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
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    if (UserStateData.username === "") {
      navigate("/MobileAuth");
    }
  }, []);

  //------------------------------------------- function ------------------------------------------
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

  const onOutsideClick = () => {
    setopened(false);
    return false;
  };

  function drawerComponentList() {
    return (
      <div className="list">
        <div className="list" style={{ width: "100vw" }}>
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

  //------------------------------------------- HTML ------------------------------------------
  return (
    <>
      <Toolbar items={toolbarItems} />
      <Drawer
        opened={opened}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode="overlap"
        position="top"
        component={drawerComponentList}
        revealMode="expand"
        height={"auto"}
        maxSize={200}
      >
        <div id="content" className="dx-theme-background-color ">
          <div className="grid grid-cols-12 bg-[#F6F9FF] mb-16">
            <div className="grid  col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white">
              {pageshow}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
