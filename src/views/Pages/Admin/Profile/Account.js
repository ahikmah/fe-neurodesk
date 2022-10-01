import { useState, useEffect } from 'react';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Alert, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'ui-components/cards/MainCard';
import useAuth from 'hooks/useAuth';
import { updateProfile, changePassword } from 'store/slices/user';
import { useDispatch, useSelector } from 'store';

// third party
import * as yup from 'yup';
import { useFormik, FormikProvider } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Account = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, getUserInfo } = useAuth();

  const userState = useSelector((state) => state.user);
  const [error, setError] = useState('');

  useEffect(() => {
    setError(userState.error?.message);
  }, [userState.error]);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

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

  const handleClickShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleMouseDownPassword3 = (event) => {
    event.preventDefault();
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email').max(255).required('Required'),
  });

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || null,
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(updateProfile(values));
      await getUserInfo();
    },
  });

  let formik2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: null,
      password: null,
      confirmPassword: null,
    },
    validationSchema: yup.object().shape({
      oldPassword: yup.string().max(255).required('Password is required').nullable(),
      password: yup.string().max(255).required('Password is required').nullable(),
      confirmPassword: yup
        .string()
        .when('password', {
          is: (val) => !!(val && val.length > 0),
          then: yup.string().oneOf([yup.ref('password')], 'Both Password must be match!'),
        })
        .nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(changePassword({ oldPassword: values.oldPassword, password: values.password }));
      await getUserInfo();
      resetForm();
    },
  });

  return (
    <MainCard sx={{ borderColor: theme.palette.grey[300] }}>
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h4">ACCOUNT SECURITY</Typography>
        <Typography variant="body2">Change your password regularly to make sure your account is safe</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {error && (
        <Alert severity="error">
          <strong>Error: </strong>
          {error}
        </Alert>
      )}
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">Email</Typography>
            </Grid>

            <Grid item xs={10}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={2}>
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <LoadingButton loading={formik.isSubmitting} disabled={formik.isSubmitting} variant="contained" type="submit">
                  Update Email
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
      <Grid container sx={{ my: 2 }}></Grid>
      <FormikProvider value={formik2}>
        <form onSubmit={formik2.handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">Password</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Current Password"
                name="oldPassword"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={formik2.values.oldPassword}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={formik2.touched.oldPassword && Boolean(formik2.errors.oldPassword)}
                helperText={formik2.touched.oldPassword && formik2.errors.oldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                name="password"
                type={showPassword2 ? 'text' : 'password'}
                fullWidth
                value={formik2.values.password}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={formik2.touched.password && Boolean(formik2.errors.password)}
                helperText={formik2.touched.password && formik2.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                        edge="end"
                        size="large"
                      >
                        {showPassword2 ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type={showPassword3 ? 'text' : 'password'}
                fullWidth
                value={formik2.values.confirmPassword}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={formik2.touched.confirmPassword && Boolean(formik2.errors.confirmPassword)}
                helperText={formik2.touched.confirmPassword && formik2.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword3}
                        onMouseDown={handleMouseDownPassword3}
                        edge="end"
                        size="large"
                      >
                        {showPassword3 ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <LoadingButton loading={formik2.isSubmitting} disabled={formik2.isSubmitting} variant="contained" type="submit">
                  Update Password
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </MainCard>
  );
};

export default Account;
