/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// material ui
import { Avatar, Box, Chip, Divider, Grid, IconButton, MenuItem, Pagination, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';

// project imports
import EmptyData from 'ui-components/EmptyData';
import MainCard from 'ui-components/cards/MainCard';
import TabPanel from 'ui-components/extended/TabPanel';
import { LoadingButton } from '@mui/lab';
import { createCategory, getCategory, deleteCategory, createUser, getAllUser, deleteUser } from 'store/slices/dashboard';
import { useDispatch, useSelector } from 'store';
import useAuth from 'hooks/useAuth';

// assets
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const ManageTeam = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user } = useAuth();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ============= CATEGORY & USER STATE ==============
  const state = useSelector((state) => state.dashboard);
  const [valCategory, setValCategory] = useState('');
  const [listCategory, setListCategory] = useState(state.listCategory || []);
  const [listUser, setListUser] = useState(state.listUser || []);
  const [page, setPage] = useState({ page: 1, totalPage: 1, totalData: 1 });
  const [loading, setLoading] = useState(state.loading || false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleChangePage = (e, v) => {
    setPage((prevState) => ({ ...prevState, page: v }));
  };

  const addHandler = async () => {
    setLoadingCreate(true);
    await dispatch(createCategory({ category: valCategory }));
    setValCategory('');
    setLoadingCreate(false);
  };

  useEffect(() => {
    setListCategory(state.listCategory);
  }, [state.listCategory]);

  useEffect(() => {
    setListUser(state.listUser);
    setPage(state.pagination);
  }, [state.listUser]);

  useEffect(() => {
    setLoading(state.loading);
  }, [state.loading]);

  // INIT DATA
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  useEffect(() => {
    dispatch(getAllUser(`page=${page?.page || 1}`));
  }, []);

  // ================== ADD USER ========================
  const validationSchema = yup.object({
    full_name: yup.string().required('Required'),
    email: yup.string().email().required('Required'),
    role: yup.string().nullable().required('Required'),
    division: yup.string().nullable().required('Required'),
  });

  let formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      role: null,
      division: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(createUser([{ ...values }]));
      resetForm();
    },
  });

  return (
    <MainCard title="Manage Your Helpdesk Team">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Category" {...a11yProps(0)} />
            <Tab label="Add Team Member" {...a11yProps(1)} disabled={listCategory?.length === 0} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <form>
            <Grid container spacing={3} alignItems="center" justifyContent="space-between" height="100%">
              <Grid item xs={10}>
                <TextField value={valCategory} onChange={(e) => setValCategory(e.target.value)} fullWidth placeholder="Category Name" />
              </Grid>
              <Grid item xs height="100%">
                <LoadingButton loading={loadingCreate} variant="contained" disabled={!valCategory} fullWidth onClick={addHandler} type="submit">
                  Add Category
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
          {loading || listCategory?.length === 0 ? (
            <EmptyData loading={loading} />
          ) : (
            listCategory &&
            listCategory.map((item, key) => (
              <Stack key={key} sx={{ mt: 2 }}>
                <MainCard
                  content={false}
                  sx={{
                    p: 1,
                    ':hover': {
                      cursor: 'pointer',
                      background: theme.palette.primary.light,
                    },
                  }}
                  border={false}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{item.category}</Typography>
                    <IconButton color="error" onClick={() => dispatch(deleteCategory(item.id))}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Stack>
                </MainCard>
                <Divider />
              </Stack>
            ))
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between" height="100%">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    id="full_name"
                    name="full_name"
                    label="Full Name *"
                    placeholder="Full Name"
                    value={formik.values.full_name}
                    onChange={formik.handleChange}
                    error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                    helperText={formik.touched.full_name && formik.errors.full_name}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email *"
                    placeholder="email@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    id="role"
                    name="role"
                    label="Role *"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                    select
                  >
                    <MenuItem value="00" disabled>
                      Choose Role
                    </MenuItem>
                    <MenuItem value="01">Owner</MenuItem>
                    <MenuItem value="02">Helpdesk Team</MenuItem>
                    <MenuItem value="03">Basic User</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={11} md={2}>
                  <TextField
                    fullWidth
                    id="division"
                    name="division"
                    label="Division *"
                    value={formik.values.division}
                    onChange={formik.handleChange}
                    error={formik.touched.division && Boolean(formik.errors.division)}
                    helperText={formik.touched.division && formik.errors.division}
                    select
                  >
                    <MenuItem value="00" disabled>
                      Choose Division
                    </MenuItem>
                    {listCategory &&
                      listCategory.map((item, key) => (
                        <MenuItem key={key} value={item.category}>
                          {item.category}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={1} height="100%">
                  <LoadingButton loading={formik.isSubmitting} variant="contained" fullWidth type="submit">
                    Add
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </FormikProvider>
          {loading || listCategory?.length === 0 ? (
            <EmptyData loading={loading} />
          ) : (
            <>
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 3, mb: 1 }}>
                <Grid item xs={4}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Stack>
                      <Typography variant="title">Name</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="title">Role</Typography>
                  </Stack>
                </Grid>

                <Grid item xs>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="title">Division</Typography>
                  </Stack>
                </Grid>
                <Grid item xs>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="title">Status</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="title">Action</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Divider />
              {listUser &&
                listUser.map((item, key) => (
                  <Stack key={key} sx={{ mt: 1 }}>
                    <MainCard
                      content={false}
                      sx={{
                        p: 1,
                        ':hover': {
                          cursor: 'pointer',
                          background: theme.palette.primary.light,
                        },
                      }}
                      border={false}
                    >
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={4}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar src={item.photo} />
                            <Stack>
                              <Typography variant="subtitle1">
                                {item.full_name} {user.id === item.id && '(Me)'}
                              </Typography>
                              <Typography variant="subtitle">{item.email}</Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item xs>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle">{item.user_role}</Typography>
                          </Stack>
                        </Grid>

                        <Grid item xs>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle">{item.division || '-'}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {item.status === '01' && (
                              <Chip
                                label="Active"
                                size="small"
                                sx={{
                                  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                                  color: theme.palette.success.dark,
                                }}
                              />
                            )}
                            {item.status === '99' && (
                              <Chip
                                label="Non-Active"
                                size="small"
                                sx={{
                                  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light + 80,
                                  color: theme.palette.orange.dark,
                                }}
                              />
                            )}
                            {item.status === '00' && (
                              <Chip
                                label="Waiting"
                                size="small"
                                sx={{
                                  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                                  color: theme.palette.warning.dark,
                                }}
                              />
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton color="secondary">
                            <ModeEditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => dispatch(deleteUser(item.id))}>
                            <DeleteForeverIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </MainCard>{' '}
                    <Divider />
                  </Stack>
                ))}
              {!loading && (
                <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3, mb: 1 }}>
                  <Grid item xs={12}>
                    <Stack alignItems="flex-end">
                      <Pagination
                        count={page?.totalPage}
                        page={page?.page}
                        onChange={handleChangePage}
                        shape="rounded"
                        size="small"
                        color="secondary"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </TabPanel>
      </Box>
    </MainCard>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default ManageTeam;
