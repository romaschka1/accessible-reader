export interface IReaderContext {
  page: number;
  pageData: string[];
  pageSize: number;
  bookmarks: number[];
  notes: Object[];
  fontSize: number;
  noteMode: boolean;

  changePage: (value: number) => void;
  changeBookmarks: (operation: 'ADD' | 'REMOVE') => void;
  changeNotes: (operation: 'ADD' | 'REMOVE') => void;
  changeFontSize: (value: number) => void;
  toggleNoteMode: () => void;
}
