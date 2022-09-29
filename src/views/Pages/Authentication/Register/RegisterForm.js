import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  AlertTitle,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Markup } from 'interweave';

// project imports
import AnimateButton from 'ui-components/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const RegisterForm = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState();
  const { submitRegister } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicatorNumFunc(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}></Grid>
      </Grid>

      <Formik
        initialValues={{
          full_name: '',
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          full_name: Yup.string().min(2, 'Full Name must be at least 2 characters').required('Full Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          await submitRegister(values.full_name, values.email, values.password).then((res) => {
            try {
              if (res && res.status !== 201) {
                setStatus({ success: false });
                setErrors({ code: res.status, submit: res.data.message });
                setSubmitting(false);
              } else {
                resetForm();
                setStatus({ success: true });
                navigation('/register/success');
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, status, touched, values }) => {
          return (
            <>
              {status && status.success && (
                <Alert severity="info">
                  <AlertTitle>
                    <strong>Registration Success</strong>
                  </AlertTitle>
                  <>Please check your email for activation</>
                </Alert>
              )}
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

              <form noValidate onSubmit={handleSubmit} {...others}>
                <FormControl fullWidth error={Boolean(touched.full_name && errors.full_name)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-full_name-register">Full Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-full_name-register"
                    type="full_name"
                    value={values.full_name}
                    name="full_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.full_name && errors.full_name && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.full_name}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                {strength !== 0 && (
                  <FormControl fullWidth>
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </FormControl>
                )}

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
                      color="secondary"
                    >
                      Sign Up
                    </LoadingButton>
                  </AnimateButton>
                </Box>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterForm;
