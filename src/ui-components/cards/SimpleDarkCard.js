import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from './MainCard';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary.light} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary.light} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

// ==============================|| SIMPLE DARK CARD ||============================== //
const SimpleDarkCard = ({ title, caption, icon, children }) => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2 }}>
          <List sx={{ py: 0 }}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: theme.palette.primary[800],
                    color: '#fff',
                  }}
                >
                  {icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  py: 0,
                  mt: 0.45,
                  mb: 0.45,
                }}
                primary={
                  <Typography variant="h4" sx={{ color: '#fff' }}>
                    {title}
                  </Typography>
                }
                secondary={
                  <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                    {caption}
                  </Typography>
                }
              />
              {children && children}
            </ListItem>
          </List>
        </Box>
      </CardWrapper>
    </>
  );
};

SimpleDarkCard.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
};

export default SimpleDarkCard;
