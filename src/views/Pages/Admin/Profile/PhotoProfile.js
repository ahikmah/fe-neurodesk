import { useRef } from 'react';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, Divider, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Avatar from 'ui-components/extended/Avatar';
import MainCard from 'ui-components/cards/MainCard';
import useAuth from 'hooks/useAuth';
import { updatePhotoProfile } from 'store/slices/user';
import { useDispatch } from 'store';

// third party
import { useFormik, FormikProvider } from 'formik';

const PhotoProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { getUserInfo } = useAuth();

  const filePhoto = useRef();
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: null,
    },
    onSubmit: async (values, { resetForm }) => {
      await dispatch(updatePhotoProfile(values));
      await getUserInfo();
      resetForm();
    },
  });

  return (
    <MainCard sx={{ borderColor: theme.palette.grey[300] }}>
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h4">USER PHOTO</Typography>
        <Typography variant="body2">Add photo you want</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Photo Preview</Typography>
            </Grid>
            <Grid item xs={12}>
              <MainCard sx={{ display: 'flex', justifyContent: 'center' }}>
                {formik.values.image ? (
                  <Avatar
                    src={URL.createObjectURL(formik.values.image)}
                    sx={{
                      width: '20rem',
                      height: '20rem',
                      transition: 'all .2s ease-in-out',
                      textAlign: 'center',
                      background: theme.palette.background.default,
                      color: theme.palette.primary.dark,
                      '&[aria-controls="menu-list-grow"],&:hover': {
                        background: theme.palette.primary.dark,
                        color: theme.palette.background.default,
                      },
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: '20rem',
                      height: '20rem',
                      transition: 'all .2s ease-in-out',
                      textAlign: 'center',
                      background: theme.palette.background.default,
                      color: theme.palette.primary.dark,
                      '&[aria-controls="menu-list-grow"],&:hover': {
                        background: theme.palette.primary.dark,
                        color: theme.palette.background.default,
                      },
                    }}
                  />
                )}
              </MainCard>
            </Grid>

            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Change Photo</Typography>
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                id="image"
                name="image"
                style={{
                  display: 'none',
                }}
                accept=".png, .jpg, .jpeg"
                ref={filePhoto}
                onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
              />
              <TextField
                name="image"
                fullWidth
                value={formik.values.image?.name || 'No file selected'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button variant="outlined" color="secondary" onClick={() => filePhoto.current.click()}>
                        Upload
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <LoadingButton loading={formik.isSubmitting} disabled={formik.isSubmitting} variant="contained" type="submit" size="small">
                  Save
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </MainCard>
  );
};

export default PhotoProfile;
