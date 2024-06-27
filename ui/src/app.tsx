import { Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Dashboard from "./pages/dashboard/Dashboard";
import './assets/app.scss';
import Reader from "./pages/reader/Reader";
import Sidebar from "./layout/Sidebar";
import { IBookContext } from "./types/book-context";
import { createContext, useEffect, useState } from "react";
import { getBooks } from "./shared/book-service";
import { IBook } from "./types/book";
import { ISettingsContext, Theme } from "./types/setting-context";
import { DarkTheme, HighContrastTheme, LightTheme, getThemeValue } from "./assets/themes";

export const BooksContext = createContext<IBookContext>({} as IBookContext);
export const SettingsContext = createContext<ISettingsContext>({} as ISettingsContext);

const colorTheme = extendTheme({
  initialColorMode: 'light',
});

function App () {
  const [books, setBooks] = useState<IBook[]>([]);

  const initialFontSize = Number(localStorage.getItem('fontSize') || 15);
  const [fontSize, setFontSize] = useState<number>(initialFontSize);

  const initialTheme = (localStorage.getItem('theme') || 'light') as Theme;
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [themeValue, setThemeValue] = useState<any>(colorTheme);

  const setColorTheme = (theme: Theme) => {
    setTheme(theme);
    setThemeValue(getThemeValue(theme));
  }

  useEffect(() => {
    setColorTheme(initialTheme);
  }, []);
  useEffect(() => {
    getBooks().then(data => {
      setBooks(data);
    });
  }, []);

  return <ChakraProvider theme={themeValue}>
    <SettingsContext.Provider value={{ theme, fontSize, setFontSize, setColorTheme }}>
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
  </ChakraProvider>

}

export default App;