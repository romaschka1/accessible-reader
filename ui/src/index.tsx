import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import reportWebVitals from './reportWebVitals';
import App from './app';
import { init } from './lib/TabNavigation/Index';

init(window);

const initialColorMode = localStorage.getItem('theme') || 'light';
const theme = extendTheme({
  initialColorMode: initialColorMode,
  useSystemColorMode: true
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ChakraProvider>
);

reportWebVitals();
