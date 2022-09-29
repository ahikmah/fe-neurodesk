import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Grid } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

const MainContentWrapper = ({ children }) => {
  return (
    <Grid item xs={12} sm={12} md={8} xl={8} sx={{ mb: 2 }}>
      <PerfectScrollbar
        component="div"
        style={{
          height: 'calc(100vh - 100px)',
          paddingBottom: '16px',
          paddingRight: '16px',
        }}
      >
        {children}
      </PerfectScrollbar>
    </Grid>
  );
};

MainContentWrapper.propTypes = {
  children: PropTypes.node,
};

export default MainContentWrapper;
