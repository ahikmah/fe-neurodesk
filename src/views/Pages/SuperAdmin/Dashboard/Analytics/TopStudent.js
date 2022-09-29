import React from 'react';

// material-ui

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import Avatar from 'ui-components/extended/Avatar';
import users from './DummyStudent';

// ==============================|| USER LIST 1 ||============================== //

const TopStudent = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Angkatan</TableCell>
            <TableCell>IPK</TableCell>
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
                      <Typography align="left" variant="caption2" component="div">
                        {row.name}
                      </Typography>
                      <Typography align="left" variant="subtitle2" noWrap>
                        {row.nim}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{row.angkatan}</TableCell>
                <TableCell>{row.ipk}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopStudent;
