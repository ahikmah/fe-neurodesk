import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';

// project imports
import AlertDialog from 'ui-components/extended/AlertDialog';
import MainCard from 'ui-components/cards/MainCard';
import Transitions from 'ui-components/extended/Transitions';
import useAuth from 'hooks/useAuth';
// import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';
import useConfig from 'hooks/useConfig';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const navigate = useNavigate();

  // const [sdm, setSdm] = useState(true);
  // const [value, setValue] = useState('');
  // const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await logout();
      setOpenLogoutDialog(false);
      setLoadingLogout(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={user?.photo}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="24px" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Box sx={{ p: 2, pb: 0 }}>
                      <Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="h4">Hi,</Typography>
                          <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                            {user?.full_name}
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle2">
                          {user.role === '01' ? 'Super Admin' : user.role === '02' ? 'Team Member' : 'Basic User'}
                        </Typography>
                      </Stack>
                      <Divider />
                    </Box>

                    <Box sx={{ p: 2, pt: 0 }}>
                      <Divider />

                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{ borderRadius: `${borderRadius}px` }}
                          selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0, '/admin/profile')}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="20px" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={() => setOpenLogoutDialog(true)}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="20px" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
      <AlertDialog
        title="Confirmation"
        body="Are you sure want to logout now?"
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={handleLogout}
        loading={loadingLogout}
      />
    </>
  );
};

export default ProfileSection;
