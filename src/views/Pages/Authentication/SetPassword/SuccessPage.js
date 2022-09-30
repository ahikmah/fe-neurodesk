// material-ui
import { Box, CssBaseline, Button, Grid, Typography } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';

// Assets
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const SuccessPage = () => {
  const { getUserInfo } = useAuth();
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container className="App">
        <CssBaseline />
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TaskAltIcon color="primary" sx={{ fontSize: 50 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="title">Yeay, Congrats!</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">Your new password has been saved successfully</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => {
                  getUserInfo();
                }}
                color="secondary"
              >
                Continue to NeuroDesk
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuccessPage;
