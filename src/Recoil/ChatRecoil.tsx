import { atom } from "recoil";
export interface data {
  cate: number;
  img: string;
}
export const countchat = atom<number>({
  key: "countchat",
  default: 0,
});
