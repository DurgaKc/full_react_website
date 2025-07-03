import Routing from './Routes/Routing';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Box } from '@mui/material';

// Create a separate component for themed layout
const ThemedLayout = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <Box
      sx={{
        background: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
         minHeight: '100vh',
      }}>
      {children}
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedLayout>
        <ToastContainer />
        <Routing />
      </ThemedLayout>
    </ThemeProvider>
  );
}

export default App;