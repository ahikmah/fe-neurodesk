import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';

import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Markup } from 'interweave';

// project imports
import AnimateButton from 'ui-components/extended/AnimateButton';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthFooter from 'ui-components/cards/AuthFooter';
import AuthWrapper from '../AuthWrapper';
import Logo from 'ui-components/Logo';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const { submitLogin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '90vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Link to="#">
                      <Logo width={150} />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Hi, Welcome Back!
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      Sign in
                    </Typography>

                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                        submit: null,
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        password: Yup.string().max(255).required('Password is required'),
                      })}
                      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        await submitLogin(values.email, values.password).then((res) => {
                          try {
                            if (res && res.status !== 201) {
                              setStatus({ success: false });
                              setErrors({ code: res.status, submit: res.data.message });
                              setSubmitting(false);
                            }
                          } catch (error) {
                            if (scriptedRef.current) {
                              setStatus({ success: false });
                              setErrors({ submit: 'Something wrong. Please contact your Administrator' });
                              setSubmitting(false);
                            }
                          }
                        });
                      }}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                        return (
                          <>
                            {errors.submit && (
                              <Alert severity="error">
                                <AlertTitle>
                                  <strong>Error: {errors.code}</strong>
                                </AlertTitle>
                                <>
                                  <ul>
                                    <Markup content={errors.submit} />
                                  </ul>
                                </>
                              </Alert>
                            )}
                            <form noValidate onSubmit={handleSubmit}>
                              <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-email-login"
                                  type="email"
                                  value={values.email}
                                  name="email"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  label="Email Address / NIM"
                                  inputProps={{}}
                                />
                                {touched.email && errors.email && (
                                  <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                  </FormHelperText>
                                )}
                              </FormControl>

                              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-password-login"
                                  type={showPassword ? 'text' : 'password'}
                                  value={values.password}
                                  name="password"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                      >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Password"
                                  inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                  <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                  </FormHelperText>
                                )}
                              </FormControl>
                              <Stack direction="row" alignItems="center" justifyContent="end" spacing={1}>
                                <Typography
                                  component={Link}
                                  to="/forgot-password"
                                  variant="subtitle2"
                                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                >
                                  Forgot Password?
                                </Typography>
                              </Stack>

                              <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                  <LoadingButton
                                    disableElevation
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                  >
                                    Login
                                  </LoadingButton>
                                </AnimateButton>
                              </Box>
                            </form>
                          </>
                        );
                      }}
                    </Formik>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don't have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
