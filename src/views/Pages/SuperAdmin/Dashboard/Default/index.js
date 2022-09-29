import { useState } from 'react';

// material ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Menu, MenuItem, Grid, Button } from '@mui/material';

// project import
import AdminList from './AdminList';
import GreetingCard from 'ui-components/cards/GreetingCard';
import ListWrapperCard from 'ui-components/cards/ListWrapperCard';
import SimpleDarkCard from 'ui-components/cards/SimpleDarkCard';
import SimpleLightCard from 'ui-components/cards/SimpleLightCard';
import StatisticCard from 'ui-components/cards/StatisticCard';
import UserActivity from './UserActivity';
import useAuth from 'hooks/useAuth';
import { gridSpacing } from 'store/constant';

// assets
import AdminImg from 'assets/images/admin.svg';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
function AdminDashboard() {
  const theme = useTheme();
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container spacing={gridSpacing}>
      {/* row 1 */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* col 1 */}
          <Grid item lg={8} md={12} xs={12}>
            <GreetingCard
              icon={AdminImg}
              title={`Hello, ${user?.full_name} 👋🏻`}
              caption="Welcome to NeuroDesk, an AI-powered helpdesk routing system that saves you time, money and frustrations when it comes to handling tickets"
            >
              <Button variant="contained" href="/super-admin/manage-team" size="small">
                Manage Your Team
              </Button>
            </GreetingCard>
          </Grid>

          {/* col 2 */}
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <SimpleDarkCard title="100" caption="Open Ticket" icon={<PendingActionsIcon fontSize="inherit" />}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary[200],
                      zIndex: 1,
                    }}
                    aria-controls="menu-total-registrants"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Avatar>
                  <Menu
                    id="menu-total-registrants"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListAltIcon sx={{ mr: 1.75 }} /> View All
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                    </MenuItem>
                  </Menu>
                </SimpleDarkCard>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <SimpleLightCard title="50" caption="Resolved Ticket" icon={<MarkChatReadIcon fontSize="inherit" />}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary[200],
                      zIndex: 1,
                    }}
                    aria-controls="menu-total-registrants"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Avatar>
                  <Menu
                    id="menu-total-registrants"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListAltIcon sx={{ mr: 1.75 }} /> View All
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                    </MenuItem>
                  </Menu>
                </SimpleLightCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} md={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} lg={6}>
                <StatisticCard primary="Total ticket today" secondary="10" iconPrimary={TimelineIcon} color={theme.palette.secondary.main} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <StatisticCard primary="Total ticket all the time" secondary="486" iconPrimary={SsidChartIcon} color={theme.palette.primary.main} />
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <ListWrapperCard title="Team Member">
                  <AdminList />
                </ListWrapperCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <UserActivity title="Log Activity" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
