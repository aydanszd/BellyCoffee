import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import App from './App.tsx';
import UseQueryProvider from './Provider/UseQueryProvider.tsx';
import { theme } from './constans/theme.ts';
import store from './Redux/Store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UseQueryProvider>
          <App />
        </UseQueryProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);