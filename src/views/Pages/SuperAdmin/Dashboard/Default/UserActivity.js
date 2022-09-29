import PropTypes from 'prop-types';

// material-ui
import { Avatar, Box, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-components/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';

// ===========================|| DATA WIDGET - USER ACTIVITY CARD ||=========================== //

const UserActivity = ({ title }) => {
  const iconSX = {
    fontSize: '0.875rem',
    marginRight: 0.2,
    verticalAlign: 'middle',
  };

  return (
    <MainCard title={title} content={false} border={false}>
      <CardContent>
        <Grid container spacing={gridSpacing} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Avatar alt="image" src="https://i.pravatar.cc/300?img=1" />
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" component="div" variant="subtitle1">
                  Ella Fleming
                </Typography>
                <Typography align="left" component="div" variant="subtitle2">
                  Assigned to support ticket #T43435
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Avatar alt="image" src="https://i.pravatar.cc/300?img=5" />
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Tracy Bailey
                </Typography>
                <Typography align="left" variant="subtitle2">
                  Updated ticket status #T53435 as resolved
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Avatar alt="image" src="https://i.pravatar.cc/300?img=12" />
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" component="div" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" component="div" variant="subtitle2">
                  Comment on ticket #T4882O3
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Avatar alt="image" src="https://i.pravatar.cc/300?img=60" />
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" component="div" variant="subtitle1">
                  Jorge Matthews
                </Typography>
                <Typography align="left" component="div" variant="subtitle2">
                  Comment on ticket #T4882O3
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text" size="small">
          Lihat Semua
        </Button>
      </CardActions>
    </MainCard>
  );
};

UserActivity.propTypes = {
  title: PropTypes.string,
};

export default UserActivity;
