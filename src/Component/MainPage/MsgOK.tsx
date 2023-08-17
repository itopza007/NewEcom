import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import React from "react";

export default function MsgOK(props) {
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
  return (
    <>
      <Popup
        position="center"
        fullScreen={false}
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
        <ToolbarItem text="Title" location="before">
          <div className="text-blue">ตกลง</div>
        </ToolbarItem>
        <ToolbarItem
          widget="dxButton"
          location="after"
          options={this.buttonOptions}
        >
          {" "}
          <div className="text-red">ยกเลิก</div>
        </ToolbarItem>
      </Popup>
    </>
  );
}
