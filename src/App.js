// defaultTheme
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// default theme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'ui-components/extended/Snackbar';

// auth provider
import { AuthProvider } from 'contexts/AuthContext';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <NavigationScroll>
          <AuthProvider>
            <>
              <Routes />
              <Snackbar />
            </>
          </AuthProvider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
