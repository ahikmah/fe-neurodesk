import PropTypes from 'prop-types';

// project imports
import MainCard from './cards/MainCard';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';

// assets
import voidImg from 'assets/images/illustration/noData.png';

const EmptyData = ({ loading, error }) => {
  return (
    <MainCard sx={{ mt: 3, textAlign: 'center' }} boxShadow>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">
          <strong>Error: </strong>
          {error}
        </Alert>
      ) : (
        <>
          <Box component="img" src={voidImg} sx={{ height: 100 }} /> <br />
          <Typography variant="caption1">No Data Available</Typography>
        </>
      )}
    </MainCard>
  );
};
EmptyData.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
};
export default EmptyData;
