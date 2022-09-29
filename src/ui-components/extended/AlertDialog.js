import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from '@mui/material';

// ===============================|| UI DIALOG - SWEET ALERT ||=============================== //

export default function AlertDialog({ title, severity, body, btnCancel, btnConfirm, open, onClose, onConfirm, loading }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Dialog fullWidth={true} fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        {loading ? (
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          open && (
            <>
              <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography variant="body2" component="span">
                    {body}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ pr: 2.5 }}>
                <Button
                  sx={{ color: severity === 'danger' ? theme.palette.primary.dark : theme.palette.error.dark }}
                  autoFocus
                  onClick={onClose}
                  color="secondary"
                >
                  {btnCancel || 'Tidak'}
                </Button>
                <Button variant="contained" size="small" onClick={onConfirm} autoFocus color={severity === 'danger' ? 'error' : 'primary'}>
                  {btnConfirm || 'Ya'}
                </Button>
              </DialogActions>
            </>
          )
        )}
      </Dialog>
    </>
  );
}

AlertDialog.propTypes = {
  title: PropTypes.string,
  severity: PropTypes.string,
  body: PropTypes.string,
  btnCancel: PropTypes.string,
  btnConfirm: PropTypes.string,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
