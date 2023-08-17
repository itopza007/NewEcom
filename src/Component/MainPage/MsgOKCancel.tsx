import { Popup } from "devextreme-react";
import { Position, ToolbarItem } from "devextreme-react/popup";
import React from "react";

export default function MsgOKCancel(props) {
  //------------------------------var
  const popup_config = {
    hide: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: { my: "center" as const, at: "center" as const, of: window },
      },
      to: {
        position: { my: "top" as const, at: "bottom" as const, of: window },
      },
    },
    show: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: { my: "top" as const, at: "bottom" as const, of: window },
      },
      to: {
        position: { my: "center" as const, at: "center" as const, of: window },
      },
    },
  };
  //--------------------------------function
  const renderContent = () => {
    return (
      <>
        <h3>{props.text}</h3>
      </>
    );
  };
  const OKbtn = () => {
    return (
      <>
        <h2 className="text-blue text-center">ตกลง</h2>
      </>
    );
  };
  const Cancelbtn = () => {
    return (
      <>
        <h2 className="text-blue text-center">ยกเลิก</h2>
      </>
    );
  };

  return (
    <>
      <Popup
        position="center"
        onHiding={props.done}
        visible={props.data}
        closeOnOutsideClick={true}
        contentRender={renderContent}
        resizeEnabled={false}
        height="30vh"
        width="60vh"
        animation={popup_config}
        showCloseButton={false}
        showTitle={false}
      >
        <Position></Position>
        <ToolbarItem
          toolbar="bottom"
          location="before"
          render={OKbtn}
        ></ToolbarItem>
        <ToolbarItem
          toolbar="bottom"
          location="after"
          render={Cancelbtn}
        ></ToolbarItem>
      </Popup>
    </>
  );
}
