import { Box, CssBaseline, Button } from '@mui/material';

function LandingPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <div className="App">
        <CssBaseline />

        <div>
          <img src="logo192.png" alt="logo" className="margin-bottom-md" />
          <p className="heading-primary">AYO KULIAH</p>
          <p className="subheading">🚧 We are currently in development stage. Please wait for us! :) 🚧</p>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            <Button variant="contained" href="/login">
              Login Page
            </Button>
            <Button variant="outlined" href="/register">
              Register Page
            </Button>
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default LandingPage;
