import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { init } from './lib/TabNavigation/Index';

init(window);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ChakraProvider>
);

reportWebVitals();
