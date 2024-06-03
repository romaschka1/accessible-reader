import { ColorEnum } from "./helper";

export interface IReaderEntity {
  text: string;
  bookmarks: number[];
  notes: INote[];
}

export interface IReaderUpdateBody {
  bookmarks: number[];
  notes: any;
}

export interface INote {
  startIndex: number;
  endIndex: number;
  color: ColorEnum
  text: string;
}