/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

import timeSince from 'utils/timeSince';
import { getTicket } from 'store/slices/ticket';
import { useDispatch, useSelector } from 'store';

const AllTicket = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(10);
  const state = useSelector((state) => state.ticket);
  const [listTicket, setListTicket] = useState(state.listTicket || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(state.loading);
  }, [state.loading]);
  useEffect(() => {
    setListTicket(state.listTicket);
  }, [state.listTicket]);

  useEffect(() => {
    dispatch(getTicket());
  }, []);
  // Data Table
  const columns = [
    {
      field: 'no',
      headerName: 'NO.',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      maxWidth: 70,
      align: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'submitter_name',
      headerName: 'Submitter',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'assignee_name',
      headerName: 'Assigned To',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'created',
      headerName: 'Created',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => (
        <Stack alignItems="flex-start">
          <Typography>{new Date(params.row.created).toDateString()}</Typography>
          <Typography variant="caption">{timeSince(new Date(params.row.created))} ago</Typography>
        </Stack>
      ),
    },
    {
      field: 'ticket_status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      maxWidth: 120,
      align: 'center',
      renderCell: (params) => (
        <>
          {params.row.status === '00' && (
            <Chip
              label={params.row.ticket_status}
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light + 60,
                color: theme.palette.warning.dark,
              }}
            />
          )}
          {params.row.status === '01' && (
            <Chip
              label={params.row.ticket_status}
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                color: theme.palette.success.dark,
              }}
            />
          )}
          {params.row.status === '02' && (
            <Chip
              label={params.row.ticket_status}
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.error.light + 60,
                color: theme.palette.error.dark,
              }}
            />
          )}
          {params.row.status === '03' && (
            <Chip
              label={params.row.ticket_status}
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.info.light + 60,
                color: theme.palette.info.dark,
              }}
            />
          )}
        </>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      maxWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Button size="small" variant="outlined">
            Detail
          </Button>
        </Stack>
      ),
    },
  ];
  return (
    <Box>
      <DataGrid
        autoHeight
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        pagination
        rows={listTicket || []}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        sx={{ fontSize: '1.2rem', textAlign: 'center', borderRadius: '10px', cursor: 'pointer' }}
        loading={loading}
      />
    </Box>
  );
};

export default AllTicket;
