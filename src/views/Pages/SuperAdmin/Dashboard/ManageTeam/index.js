/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// material ui
import { Box, Grid, IconButton, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';

// project imports
import EmptyData from 'ui-components/EmptyData';
import MainCard from 'ui-components/cards/MainCard';
import TabPanel from 'ui-components/extended/TabPanel';
import { LoadingButton } from '@mui/lab';
import { createCategory, getCategory, deleteCategory } from 'store/slices/dashboard';
import { useDispatch, useSelector } from 'store';

// assets
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ManageTeam = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ============= CATEGORY STATE ==============
  const state = useSelector((state) => state.dashboard);
  const [valCategory, setValCategory] = useState('');
  const [listCategory, setListCategory] = useState(state.listCategory || []);
  const [loading, setLoading] = useState(state.loading || false);
  const [loadingCreate, setLoadingCreate] = useState(false);

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
    setLoading(state.loading);
  }, [state.loading]);

  // INIT DATA
  useEffect(() => {
    dispatch(getCategory());
  }, []);

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
          <Grid container spacing={3} alignItems="center" justifyContent="space-between" height="100%">
            <Grid item xs={10}>
              <TextField value={valCategory} onChange={(e) => setValCategory(e.target.value)} fullWidth placeholder="Category Name" />
            </Grid>
            <Grid item xs height="100%">
              <LoadingButton loading={loadingCreate} variant="contained" fullWidth onClick={addHandler}>
                Add Category
              </LoadingButton>
            </Grid>
          </Grid>
          {loading || listCategory?.length === 0 ? (
            <EmptyData loading={loading} />
          ) : (
            listCategory &&
            listCategory.map((item, key) => (
              <Stack spacing={2} key={key} sx={{ mt: 2 }}>
                <MainCard content={false} sx={{ p: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">{item.category}</Typography>
                    <IconButton color="error" onClick={() => dispatch(deleteCategory(item.id))}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Stack>
                </MainCard>
              </Stack>
            ))
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
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
