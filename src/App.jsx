import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import './App.css';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, Poppins, Segoe UI, sans-serif',
});

function App() {
  const [exibirNeve, setExibirNeve] = useState(true);

  return (
    <ThemeProvider>
      <MantineProvider theme={theme} forceColorScheme="light">
        <BrowserRouter>
          <AppRoutes exibirNeve={exibirNeve} setExibirNeve={setExibirNeve} />
        </BrowserRouter>
      </MantineProvider>
    </ThemeProvider>
  );
}

export default App;
