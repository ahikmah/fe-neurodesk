import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

const RighSideWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Grid item xs sm md={4} xl={4} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <Box container sx={{ p: 1.5, background: theme.palette.background.paper, maxHeight: 'calc(100vh - 100px)', borderRadius: 5 }}>
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
      </Box>
    </Grid>
  );
};

RighSideWrapper.propTypes = {
  children: PropTypes.node,
};

export default RighSideWrapper;
