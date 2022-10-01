/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material ui
import { useTheme } from '@mui/material/styles';
import { Grid, Button, Stack, Typography, Divider, Chip, Pagination, Avatar, CircularProgress } from '@mui/material';

// project import
import GreetingCard from 'ui-components/cards/GreetingCard';
import StatisticCard from 'ui-components/cards/StatisticCard';
import UserActivity from './UserActivity';
import useAuth from 'hooks/useAuth';
import { gridSpacing } from 'store/constant';
import Welcome from '../Welcome';
import { getCategory, getAllUser, getDataDashboard } from 'store/slices/dashboard';
import { useDispatch, useSelector } from 'store';

// assets
import AdminImg from 'assets/images/admin.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import MainCard from 'ui-components/cards/MainCard';

function AdminDashboard() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const state = useSelector((state) => state.dashboard);
  const [loading, setLoading] = useState(state.loading || true);
  const [listCategory, setListCategory] = useState(state.listCategory || []);
  const [counter, setCounter] = useState(state.summary || []);
  const [logs, setLogs] = useState(state.log || []);
  const [listUser, setListUser] = useState(state.listUser || []);
  const [page, setPage] = useState({ page: 1, totalPage: 1, totalData: 1 });

  const handleChangePage = (e, v) => {
    setPage((prevState) => ({ ...prevState, page: v }));
  };

  useEffect(() => {
    setLoading(state.loading);
  }, [state.loading]);
  useEffect(() => {
    setListCategory(state.listCategory);
  }, [state.listCategory]);
  useEffect(() => {
    setCounter(state.summary);
  }, [state.summary]);
  useEffect(() => {
    setLogs(state.log);
  }, [state.log]);

  useEffect(() => {
    setListUser(state.listUser);
    setPage(state.pagination);
  }, [state.listUser]);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllUser('role=ADM'));
    dispatch(getDataDashboard());
  }, []);

  return loading ? (
    <Stack alignItems="center">
      <CircularProgress />
    </Stack>
  ) : listCategory?.length === 0 ? (
    <Welcome />
  ) : (
    <>
      <Grid container spacing={gridSpacing}>
        {/* row 1 */}
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {/* col 1 */}
            <Grid item xs={12}>
              <GreetingCard
                icon={AdminImg}
                title={`Hello, ${user?.full_name} 👋🏻`}
                caption="Welcome to NeuroDesk, an AI-powered helpdesk routing system that saves you time, money and frustrations when it comes to handling tickets"
              >
                <Button variant="contained" onClick={() => navigate('/super-admin/manage-team')} size="small">
                  Manage Your Team
                </Button>
              </GreetingCard>
            </Grid>
          </Grid>
        </Grid>

        {/* row 2 */}
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={12} md={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} lg={6}>
                  <StatisticCard
                    primary="Total Open Ticket"
                    secondary={counter[0]?.count_open || 0}
                    iconPrimary={PendingActionsIcon}
                    color={theme.palette.warning.dark}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StatisticCard
                    primary="Total Resolved Ticket"
                    secondary={counter[0]?.count_resolved || 0}
                    iconPrimary={PublishedWithChangesIcon}
                    color={theme.palette.secondary.main}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StatisticCard
                    primary="Total Closed Ticket"
                    secondary={counter[0]?.count_closed || 0}
                    iconPrimary={RuleFolderIcon}
                    color={theme.palette.error.main}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StatisticCard
                    primary="Total Duplicate Ticket"
                    secondary={counter[0]?.count_duplicate || 0}
                    iconPrimary={ContentCopyIcon}
                    color={theme.palette.info.main}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <UserActivity title="Log Activity" data={logs} />
            </Grid>

            <Grid item lg={8} md={12} sm={12} xs={12}>
              <MainCard title="Team Member">
                <Grid container alignItems="center" sx={{ mb: 1 }}>
                  <Grid item xs={5}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1">Role</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Division</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle1">Status</Typography>
                  </Grid>
                </Grid>
                <Divider />
                {listUser &&
                  listUser.map((item, key) => (
                    <Stack key={key} sx={{ mt: 1 }}>
                      <MainCard border={false}>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item xs={5}>
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

                          <Grid item xs={3}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography variant="subtitle">{item.division || '-'}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={1}>
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
                        </Grid>
                      </MainCard>
                      <Divider />
                    </Stack>
                  ))}

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
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminDashboard;
