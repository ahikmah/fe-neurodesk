import { useState } from 'react';

// material-ui
import { Box, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'ui-components/cards/MainCard';
import Avatar from 'ui-components/extended/Avatar';
import useAuth from 'hooks/useAuth';
import BasicInfo from './BasicInfo';
import PhotoProfile from './PhotoProfile';
import Account from './Account';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import FaceIcon from '@mui/icons-material/Face';

const Profile = () => {
  const theme = useTheme();

  const [selectedMenu, setSelectedMenu] = useState(0);

  const { user } = useAuth();

  return (
    <Box sx={{ pr: 2 }}>
      <MainCard sx={{ borderColor: theme.palette.grey[300] }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <MainCard sx={{ borderColor: theme.palette.grey[300], height: 'calc(100vh - 150px)' }}>
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={user.photo}
                  sx={{
                    ...theme.typography.extraLargeAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.background.default,
                    color: theme.palette.primary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.primary.dark,
                      color: theme.palette.background.default,
                    },
                  }}
                  aria-haspopup="true"
                  color="inherit"
                />
                <Typography variant="h4">{user.full_name}</Typography>
                <MenuList sx={{ width: '100%' }}>
                  <MenuItem onClick={() => setSelectedMenu(0)} selected={selectedMenu === 0}>
                    <ListItemIcon>
                      <BadgeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle1">Basic Information</Typography>
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => setSelectedMenu(1)} selected={selectedMenu === 1}>
                    <ListItemIcon>
                      <FaceIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle1">Photo Profile</Typography>
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => setSelectedMenu(2)} selected={selectedMenu === 2}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle1">Account Security</Typography>
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Stack>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={9}>
            <PerfectScrollbar
              component="div"
              style={{
                height: 'calc(100vh - 150px)',
                paddingBottom: '16px',
                paddingRight: '16px',
              }}
            >
              {selectedMenu === 0 && <BasicInfo />}
              {selectedMenu === 1 && <PhotoProfile />}
              {selectedMenu === 2 && <Account />}
            </PerfectScrollbar>
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
};

export default Profile;
