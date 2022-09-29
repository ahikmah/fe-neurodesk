// material-ui
import { Box, CssBaseline, Grid, Typography } from '@mui/material';

// Assets

import HowToRegIcon from '@mui/icons-material/HowToReg';

const SuccessPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container className="App">
        <CssBaseline />
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <HowToRegIcon color="info" sx={{ fontSize: 50 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="title">Registration Success</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">Please check your email for activation</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuccessPage;
