// material-ui
import { LoadingButton } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Alert, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'ui-components/cards/MainCard';
import useAuth from 'hooks/useAuth';
import { updateProfile } from 'store/slices/user';
import { useDispatch } from 'store';

// third party
import * as yup from 'yup';
import { useFormik, FormikProvider } from 'formik';

const BasicInfo = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, getUserInfo } = useAuth();

  const validationSchema = yup.object().shape({
    full_name: yup.string().min(3, 'Must be at least 5 characters').required('Required'),
  });

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: user?.full_name || null,
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(updateProfile(values));
      await getUserInfo();
    },
  });

  return (
    <MainCard sx={{ borderColor: theme.palette.grey[300] }}>
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h4">USER PROFILE</Typography>
        <Typography variant="body2">Add information about yourself</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Alert severity="warning">You can't change division and roles. Ask your administrator if you think this is a mistake</Alert>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Basic Information</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Full Name"
                  name="full_name"
                  fullWidth
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                  helperText={formik.touched.full_name && formik.errors.full_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Division" fullWidth value={user?.division || '-'} disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Role"
                  fullWidth
                  value={user?.role === '01' ? 'Super Admin' : user?.role === '02' ? 'Team Member' : 'Basic User'}
                  disabled
                />
              </Grid>

              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <LoadingButton loading={formik.isSubmitting} disabled={formik.isSubmitting} variant="contained" type="submit" size="small">
                    Save
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </LocalizationProvider>
      </FormikProvider>
    </MainCard>
  );
};

export default BasicInfo;
