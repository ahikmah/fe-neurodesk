// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
      NeuroDesk
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://ibroh99.github.io" target="_blank" underline="hover">
      Made with ❤️ &copy; by ahikmah
    </Typography>
  </Stack>
);

export default AuthFooter;
