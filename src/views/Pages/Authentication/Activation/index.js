import { useState, useEffect } from 'react';

// material-ui
import { Box, CssBaseline, Button, Grid, Typography, CircularProgress } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';

// Assets
import DangerousIcon from '@mui/icons-material/Dangerous';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Activation = () => {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const search = window.location.search;
  let params = new URLSearchParams(search);
  const otp = params.get('otp');
  const id = params.get('id');

  const { submitActivation, getUserInfo } = useAuth();

  const activationHandler = async () => {
    await submitActivation(otp, id).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setIsSuccess(true);
      } else {
        setLoading(false);
        setIsSuccess(false);
      }
    });
  };

  useEffect(() => {
    activationHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container className="App">
        <CssBaseline />
        <Grid item xs={12}>
          {loading ? (
            <CircularProgress />
          ) : isSuccess ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TaskAltIcon color="primary" sx={{ fontSize: 50 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="title">Hi, Welcome!</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle">Your account has been successfully activated</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setLoading(true);
                    getUserInfo();
                  }}
                  color="secondary"
                >
                  Continue the registration process
                </Button>
              </Grid>
            </Grid>
          ) : (
            !isSuccess && (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <DangerousIcon color="error" sx={{ fontSize: 50 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="title" color="error">
                    Activation Failed!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle">Invalid data. If you think this is an error, please contact our administrator</Typography>
                </Grid>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Activation;
