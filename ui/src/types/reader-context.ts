export interface IReaderContext {
  page: number;
  pageData: string[];
  pageSize: number;
  bookmarks: number[];
  fontSize: number;

  changePage: (value: number) => void;
  changeBookmarks: (operation: 'ADD' | 'REMOVE') => void;
  changeFontSize: (value: number) => void;
}
