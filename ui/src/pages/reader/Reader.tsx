import './Reader.scss';

import { useLocation } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { getBook, updateBookData } from '../../shared/book-service';
import { INote, IReaderEntity } from '../../types/readerData';
import Header from './components/header/Header';
import Bookmarks from './components/bookmarks-list/Bookmarks';
import Notes from './components/notes-list/Notes';
import Page from './components/page/Page';
import { IReaderContext } from '../../types/reader-context';

export const ReaderContext = createContext<IReaderContext>({} as IReaderContext);

function Reader() {
  const { state } = useLocation();

  const [rawData, setRawData] = useState<IReaderEntity>({
    text: 'empty text',
    bookmarks: [],
    notes: []
  });

  const defaultPage = Number(localStorage.getItem(`${state.id}-page`) || 1);
  const defaultFontSize = Number(localStorage.getItem('fontSize') || 15);
  const defaultPageSize = Math.round(800 / defaultFontSize * 20);

  const [page, setPage] = useState<number>(defaultPage);
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  useEffect(() => {
    getBook(state.id).then(res => {
      setRawData(res);
      setBookmarks(res.bookmarks);
      setReaderData(res.text);
      setIsLoading(false);
    });
  }, [state.id]);

  const setReaderData = (text: string) => {
    const pagesArray = [];
    let splitIndex = 0;

    while (true) {
      if ((splitIndex + pageSize) > text.length) {
        pagesArray.push(text.substring(splitIndex, text.length));
        break;
      } else {
        pagesArray.push(text.substring(splitIndex, splitIndex + pageSize));
      }
  
      splitIndex += pageSize;
    }
 
    setPageData(pagesArray);
  }

  const changePage = (value: number) => {
    if (value > 0 && value < pageData.length) {
      localStorage.setItem(`${state.id}-page`, value.toString());
      setPage(value);
    } 
  }

  const changeBookmarks = (operation: 'ADD' | 'REMOVE') => {
    let newBookmarks = bookmarks.slice();

    if (operation === 'ADD') {
      newBookmarks.push(Number(pageSize * (page-1) + 1));
      newBookmarks.sort((x, y) => x - y);
    } else if (operation === 'REMOVE') {
      newBookmarks = [];

      for (const bookmark of bookmarks) {
        if (bookmark >= (pageSize * (page-1)) && bookmark <= (pageSize * (page))) {
        } else {
          newBookmarks.push(bookmark);
        }
      }
    }

    setBookmarks(newBookmarks);
    updateBookData(state.id, { bookmarks: newBookmarks, notes: null });
  }

  const changeFontSize = (value: number) => {
    setFontSize(value);
    localStorage.setItem('fontSize', value.toString());

    // Recalculate book pages every time when font size changes
    setPageSize(Math.round(800/value*20));
    setReaderData(rawData.text);
  }

  return (
    <ReaderContext.Provider
      value = {{ 
        page,
        pageData,
        pageSize,
        bookmarks,
        fontSize,

        changePage,
        changeBookmarks,
        changeFontSize
      }}
    >{
      isLoading ? <div className="loading-wrapper">Loading...</div> :
      <>
        <Header></Header>

        <div className="reader-wrapper">
          <Bookmarks></Bookmarks>
          <Page></Page>
          <Notes></Notes>
        </div>
      </>
    }
    </ReaderContext.Provider>
  );
}

export default Reader;
