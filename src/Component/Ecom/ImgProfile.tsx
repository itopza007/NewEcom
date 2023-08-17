import { useRef, useState, useEffect } from "react";
import ImgProfile from "./ImgProfile.png";

export default function HomImgProfile() {
  //------------------------useRef-----------------------------
  const fileInputRef = useRef<HTMLInputElement>();
  //------------------------ตัวแปร-----------------------------
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  //------------------------onload----------------------------
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  //------------------------function--------------------------
  const Prevvent = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const SetImg = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  //------------------------HTML------------------------------
  return (
    <div className="flex items-center justify-center space-x-8">
      {preview ? (
        <img
          className="w-24 h-24 rounded-full cursor-pointer"
          src={preview}
          style={{ objectFit: "cover" }}
          onClick={Prevvent}
        />
      ) : (
        <button
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.click();
          }}
        >
          <img className="w-24 h-24 rounded-full" src={ImgProfile} alt="Logo" />
        </button>
      )}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/*"
        onChange={SetImg}
      />
    </div>
  );
}
