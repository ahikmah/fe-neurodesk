import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useSelector } from 'store';

const FullPageVisitorWrapper = ({ children, sx = {}, reference = null }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { menuOpen } = useSelector((state) => state.menu);
  return (
    <Box ref={reference} sx={{ height: matchDownMd ? 'max-content' : menuOpen ? 'calc(100vh - 120px)' : 'calc(100vh - 80px)', ...sx }}>
      {children}
    </Box>
  );
};

FullPageVisitorWrapper.propTypes = {
  children: PropTypes.node,
};

export default FullPageVisitorWrapper;
