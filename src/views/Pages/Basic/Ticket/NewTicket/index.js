import { useState, useRef } from 'react';
import MainCard from 'ui-components/cards/MainCard';

import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';

// third-party
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { submitTicket } from 'store/slices/ticket';
import FilePreviewDialog from 'ui-components/FilePreviewDialog';

// assets
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const NewTicket = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const file = useRef();
  const [openFile, setOpenFile] = useState(false);
  // ================== ADD TICKET ========================
  const validationSchema = yup.object({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
  });

  let formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      attachment: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(submitTicket(values));
      resetForm();
    },
  });
  return (
    <MainCard title="Submit New Ticket">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between" height="100%">
            <Grid item xs={12} md={6}>
              <TextField fullWidth id="full_name" name="full_name" label="Full Name" value={user.full_name} disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth id="email" name="email" label="Email" value={user.email} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title *"
                placeholder="Your Ticket Summary"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description *"
                multiline
                rows={3}
                placeholder="describe your problem in as much detail as possible"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12} height="100%">
              <input
                type="file"
                id="attachment"
                name="attachment"
                style={{
                  display: 'none',
                }}
                accept=".png, .jpg, .jpeg, .docx, .pdf"
                ref={file}
                onChange={(e) => formik.setFieldValue('attachment', e.target.files[0])}
              />
              <Box border={'dotted'} sx={{ p: 2, textAlign: 'center' }}>
                <Stack spacing={1}>
                  <Typography variant="caption">Upload Attachment from your Computer</Typography>
                  <Typography variant="caption">Format Accepted: .png, .jpg, .jpeg, .docx, .pdf </Typography>
                  <Stack spacing={1}>
                    {formik.values.attachment?.name && (
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button variant="outlined" size="small" color="secondary" onClick={() => setOpenFile(true)}>
                          {formik.values.attachment?.name}
                        </Button>
                        <IconButton variant="outlined" size="small" color="error" onClick={(e) => formik.setFieldValue('attachment', '')}>
                          <ClearIcon />
                        </IconButton>
                      </Stack>
                    )}
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<CloudUploadOutlinedIcon />}
                      onClick={() => file.current.click()}
                    >
                      Choose File
                    </Button>
                  </Stack>
                </Stack>
                {openFile && (
                  <FilePreviewDialog
                    data={{
                      file_ext: formik.values.attachment?.type?.split('/')[1],
                      path: URL.createObjectURL(formik.values.attachment),
                    }}
                    open={openFile}
                    onClose={() => setOpenFile(false)}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} height="100%">
              <LoadingButton loading={formik.isSubmitting} variant="contained" fullWidth type="submit">
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </MainCard>
  );
};

export default NewTicket;
