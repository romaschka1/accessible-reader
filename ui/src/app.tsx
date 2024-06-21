import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import './assets/app.scss';
import Reader from "./pages/reader/Reader";
import Sidebar from "./layout/Sidebar";
import { IBookContext } from "./types/book-context";
import { createContext, useEffect, useState } from "react";
import { getBooks } from "./shared/book-service";
import { IBook } from "./types/book";
import { ISettingsContext } from "./types/setting-context";

export const BooksContext = createContext<IBookContext>({} as IBookContext);
export const SettingsContext = createContext<ISettingsContext>({} as ISettingsContext);

function App () {
  const [books, setBooks] = useState<IBook[]>([]);

  const defaultFontSize = Number(localStorage.getItem('fontSize') || 15);
  const [fontSize, setFontSize] = useState<number>(defaultFontSize);

  useEffect(() => {
    getBooks().then(data => {
      setBooks(data);
    });
  }, []);

  return <SettingsContext.Provider value={{ fontSize, setFontSize }}>
    <BooksContext.Provider value={{ books }}>
      <main className='app-main'>
        <Sidebar></Sidebar>
        
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={ <Dashboard/> } />
            <Route path="/book/:id" element={ <Reader/> } />
          </Routes>
        </div>
      </main>
    </BooksContext.Provider>
  </SettingsContext.Provider>
}

export default App;