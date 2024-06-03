import axios from "axios";
import { IReaderEntity, IReaderUpdateBody } from "../types/readerData";
import { IBook } from "../types/book";

const API = 'http://localhost:9090';
const URL = 'books';

export const getBooks = (): Promise<IBook[]> => {
  return axios({
    method: 'get',
    url: `${API}/${URL}`,
  }).then(res => res.data);
}

export const getBook = (id: number): Promise<IReaderEntity> => {
  return axios({
    method: 'get',
    url: `${API}/${URL}/${id}`,
  }).then(res => res.data);
}

export const addBook = (fileData: any): Promise<string> => {
  return axios({
    method: 'post',
    url: `${API}/${URL}`,
    data: fileData
  }).then(res => res.data);
}

export const updateBookData = (id: string, data: IReaderUpdateBody): Promise<IReaderEntity> => {
  return axios({
    method: 'put',
    url: `${API}/${URL}/${id}`,
    responseType: 'text',
    params: {
      entry: data
    }
  }).then(res => res.data);
}
