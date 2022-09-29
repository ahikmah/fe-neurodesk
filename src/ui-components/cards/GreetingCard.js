import PropTypes from 'prop-types';

// material ui
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// project import
import MainCard from './MainCard';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 220,
    height: 220,
    background: `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    bottom: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 220,
    height: 220,
    background: `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    bottom: -160,
    right: -130,
  },
}));

const IconWrapper = styled('div')({
  position: 'absolute',
  right: '-45px',
  bottom: '-90px',
  color: '#fff',
  '&> svg': {
    width: '200px',
    height: '200px',
    opacity: '0.35',
  },
});

const GreetingCard = ({ icon, title, caption, children }) => {
  return (
    <CardWrapper border={false}>
      <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 0.7, xl: 2 } }}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={10}>
            <Grid item sx={{ mb: 1 }}>
              <Typography variant="title">{title}</Typography>
            </Grid>
            <Grid item sx={{ mb: 3 }}>
              <Typography variant="caption">{caption}</Typography>
            </Grid>
            <Grid>{children && children}</Grid>
          </Grid>
          <Grid item md={2} sx={{ position: 'relative', display: { xs: 'none', sm: 'block', md: 'block' } }}>
            <IconWrapper>
              <img src={icon} alt="admin illustrator"></img>
            </IconWrapper>
          </Grid>
        </Grid>
      </Box>
    </CardWrapper>
  );
};

GreetingCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  title: PropTypes.string,
  caption: PropTypes.string,
};

export default GreetingCard;
