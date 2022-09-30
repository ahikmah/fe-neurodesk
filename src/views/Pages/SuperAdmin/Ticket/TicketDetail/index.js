/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// project import
import { useSelector, useDispatch } from 'store';
import { getDetailTicket } from 'store/slices/ticket';
import MainCard from 'ui-components/cards/MainCard';
import timeSince from 'utils/timeSince';

const TicketDetail = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ticket);
  const { id } = useParams();
  const [modeEdit, setModeEdit] = useState(false);

  const [loading, setLoading] = useState(state.loading || false);
  useEffect(() => {
    setLoading(state.loading);
  }, [state.loading]);

  const [detail, setDetail] = useState(state.detailTicket);
  useEffect(() => {
    setDetail(state.detailTicket);
  }, [state.detailTicket]);

  useEffect(() => {
    dispatch(getDetailTicket(id));
  }, []);

  return (
    <MainCard
      title={
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Detail Ticket</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button size="small" variant="outlined" onClick={() => setModeEdit((prev) => !prev)}>
              {modeEdit ? 'Cancel' : 'Edit'}
            </Button>
            {modeEdit && (
              <Button size="small" variant="contained">
                Save
              </Button>
            )}
          </Stack>
        </Stack>
      }
    >
      {loading ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        detail && (
          <Stack>
            <Grid container spacing={2} rowSpacing={3}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Tikcet ID</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>{id}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Status</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>{detail[0]?.ticket_status}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Title</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>{detail[0]?.title}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Category</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>{detail[0]?.category}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="start">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Submitter</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>
                      {detail[0]?.submitter_name} <br /> ({detail[0]?.submitter_email}){' '}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="start">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Assigned To</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>
                      {detail[0]?.assignee_name} <br /> ({detail[0]?.assignee_email}){' '}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Created</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>
                      {new Date(detail[0]?.created).toDateString()}, {timeSince(new Date(detail[0]?.created))} ago
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle1">Priority</Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography>{detail[0]?.ticket_priority}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        )
      )}
    </MainCard>
  );
};

export default TicketDetail;
