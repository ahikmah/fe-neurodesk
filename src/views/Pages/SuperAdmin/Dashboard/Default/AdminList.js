import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';

// project imports
import Avatar from 'ui-components/extended/Avatar';
import users from './DummyAdminList';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// ==============================|| USER LIST 1 ||============================== //

const AdminList = () => {
  const theme = useTheme();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Division</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                <TableCell>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar alt="User 1" src={row.avatar} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography align="left" variant="subtitle1" component="div">
                        {row.name} {row.status === 'Active' && <CheckCircleIcon sx={{ color: 'success.dark', width: 14, height: 14 }} />}
                      </Typography>
                      <Typography align="left" variant="subtitle2" noWrap>
                        {row.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{row.division}</TableCell>
                <TableCell>
                  {row.status === 'Active' && (
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                        color: theme.palette.success.dark,
                      }}
                    />
                  )}
                  {row.status === 'Non Active' && (
                    <Chip
                      label="Non Active"
                      size="small"
                      sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light + 80,
                        color: theme.palette.orange.dark,
                      }}
                    />
                  )}
                  {row.status === 'Suspended' && (
                    <Chip
                      label="Suspended"
                      size="small"
                      sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                        color: theme.palette.warning.dark,
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <Tooltip placement="top" title="Message">
                      <IconButton color="primary" aria-label="delete" size="large" href={`https://wa.me/+62${row.phone}?text=Haloo`} target="_blank">
                        <WhatsAppIcon sx={{ fontSize: '1.7rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminList;
