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

const SetPasswordForm = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState();
  const { submitSetPassword } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicatorNumFunc(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const search = window.location.search;
  let params = new URLSearchParams(search);
  const otp = params.get('otp');
  const id = params.get('id');

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
          password: '',
          confirmPassword: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required('Password is required'),
          confirmPassword: Yup.string().when('password', {
            is: (val) => !!(val && val.length > 0),
            then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must be match!'),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          await submitSetPassword(otp, id, values.password).then((res) => {
            try {
              if (res && res.status !== 200) {
                setStatus({ success: false });
                setErrors({ code: res.status, submit: res.data.message });
                setSubmitting(false);
              } else {
                resetForm();
                setStatus({ success: true });
                navigation('/reset-password/success');
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
                    <strong>Reset Password Success</strong>
                  </AlertTitle>
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

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-repassword-register"
                    type={showPassword2 ? 'text' : 'password'}
                    value={values.confirmPassword}
                    name="confirmPassword"
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
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                          edge="end"
                          size="large"
                        >
                          {showPassword2 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <LoadingButton
                      disableElevation
                      loading={isSubmitting}
                      disabled={isSubmitting || errors.confirmPassword || errors.password}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Set New Password
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

export default SetPasswordForm;
