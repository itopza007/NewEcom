import { atom } from "recoil";

export const isAppOrNot = atom<boolean>({
    key: "isAppOrNot",
    default: false,
  });