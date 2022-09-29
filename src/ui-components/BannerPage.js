import React from 'react';
import PropTypes from 'prop-types';

// material ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Typography } from '@mui/material';

const BannerPage = ({ title, description, image, children }) => {
  const theme = useTheme();

  return (
    <Card sx={{ background: theme.palette.primary.main, padding: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" sx={{ color: theme.palette.background.paper }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.background.paper, my: 2 }}>
            {description}
          </Typography>
          {children}
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <Box component="img" src={image} sx={{ width: { xs: 200, sm: 300 } }}></Box>
        </Grid>
      </Grid>
    </Card>
  );
};

BannerPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.string,
};

export default BannerPage;
