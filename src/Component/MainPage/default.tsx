import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
export default function Default() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [viewWidth, setviewWidth] = useState<number>(null);
  const resize = () => {
    if (window.innerWidth < 576) {
      setviewWidth(576);
    }
    if (window.innerWidth >= 576) {
    }
    if (window.innerWidth >= 768) {
    }
    if (window.innerWidth >= 992) {
      setviewWidth(992);
    }
    if (window.innerWidth >= 1200) {
    }
    if (window.innerWidth >= 1400) {
    }
  };
  React.useEffect(() => {
    resize();
  }, [viewWidth]);
  //------------------------------------------- HTML ------------------------------------------
  return (
    <div className="App-header">
      <h5>Default</h5>
    </div>
  );
}
