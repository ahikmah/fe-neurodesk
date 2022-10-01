import PropTypes from 'prop-types';

// material-ui
import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material';
// project imports
import MainCard from 'ui-components/cards/MainCard';
import { gridSpacing } from 'store/constant';
import timeSince from 'utils/timeSince';

// assets
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';

// ===========================|| DATA WIDGET - USER ACTIVITY CARD ||=========================== //

const UserActivity = ({ title, data }) => {
  const iconSX = {
    fontSize: '0.875rem',
    marginRight: 0.2,
    verticalAlign: 'middle',
  };

  return (
    <MainCard title={title} content={false} border={false}>
      <CardContent>
        <Grid container spacing={gridSpacing} alignItems="center">
          {data &&
            data.map((item, key) => (
              <Grid item xs={12} key={key}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar alt="image" src={item.photo} />
                    </Box>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" component="div" variant="subtitle1">
                      {item.full_name}
                    </Typography>
                    <Typography align="left" component="div" variant="subtitle2">
                      {item.activity}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      <WatchLaterTwoToneIcon sx={iconSX} />
                      {timeSince(new Date(item.created))} ago
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </MainCard>
  );
};

UserActivity.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any,
};

export default UserActivity;
