/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material ui
import { Alert, Button, Chip, CircularProgress, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import {
  LoadingButton,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';

// project import
import { useSelector, useDispatch } from 'store';
import { getDetailTicket } from 'store/slices/ticket';
import MainCard from 'ui-components/cards/MainCard';
import timeSince from 'utils/timeSince';
import FilePreviewDialog from 'ui-components/FilePreviewDialog';
import { replyTicket } from 'store/slices/ticket';

// assets
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const TicketDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.ticket);
  const { id } = useParams();
  const [openFile, setOpenFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  // ================= REPLY/COMMENT FIELD ======================== //
  const file = useRef();
  const [reply, setReply] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loadingReply, setLoadingReply] = useState(false);

  const sendReplyHandler = async () => {
    setLoadingReply(true);
    const body = {
      id_ticket: id,
      description: reply,
      attachment: attachment,
    };
    await dispatch(replyTicket(body));
    setReply('');
    setAttachment('');
    setLoadingReply(false);
  };

  return (
    <>
      <Button size="small" onClick={() => navigate(-1)} color="error" variant="contained" sx={{ mb: 2 }} startIcon={<ChevronLeftIcon />}>
        Back
      </Button>
      <MainCard
        title={
          <Stack spacing={1}>
            <Typography variant="h3">Detail Ticket</Typography>
            <Alert severity="warning">
              You cannot edit or delete tickets that are currently being submitted. If there is additional information that you want to convey, please
              write it via the reply feature
            </Alert>
          </Stack>
        }
        sx={{ height: '95%', position: 'relative' }}
      >
        {loading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          detail && (
            <>
              <Stack>
                <Grid container spacing={2} rowSpacing={3}>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Tikcet ID</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>{id}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Status</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>{detail[0]?.ticket_status}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Title</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>{detail[0]?.title}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Category</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>{detail[0]?.category}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="start">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Submitter</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>
                          {detail[0]?.submitter_name} <br /> ({detail[0]?.submitter_email}){' '}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="start">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Assigned To</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>
                          {detail[0]?.assignee_name} <br /> ({detail[0]?.assignee_email}){' '}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Created</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>
                          {new Date(detail[0]?.created).toDateString()}, {timeSince(new Date(detail[0]?.created))} ago
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1.5} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">Priority</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Typography>{detail[0]?.ticket_priority}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1} alignItems="flex-start">
                <Typography variant="title">Description</Typography>
                <Typography>{detail[0]?.description}</Typography>
                {detail[0]?.attachment && (
                  <Chip
                    label={'View Attachment'}
                    color="info"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedFile(detail[0]?.attachment);
                      setOpenFile(true);
                    }}
                  />
                )}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  style={{
                    display: 'none',
                  }}
                  accept=".png, .jpg, .jpeg, .docx, .pdf"
                  ref={file}
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
                <Grid item xs={12}>
                  <Typography variant="title">Leave a Reply</Typography>
                </Grid>
                <Grid item xs={12}>
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<CloudUploadOutlinedIcon />}
                      onClick={() => file.current.click()}
                    >
                      {attachment?.name ? attachment?.name : 'Add Attachment'}
                    </Button>
                    {attachment?.name && (
                      <IconButton variant="outlined" size="small" color="error" onClick={() => setAttachment('')}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Your comment"
                    multiline
                    rows={2}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  ></TextField>
                </Grid>
                <Grid item xs={1}>
                  <LoadingButton loading={loadingReply} onClick={sendReplyHandler} variant="contained" size="small">
                    Send
                  </LoadingButton>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Stack>
                <Typography variant="title">Update History</Typography>
              </Stack>
              <Stack alignItems="center">
                {detail[0]?.replies?.length > 0 ? (
                  <>
                    <Timeline position="alternate">
                      {detail[0]?.replies.map((item, key) => (
                        <TimelineItem key={key}>
                          <TimelineOppositeContent width="100%" color="text.secondary">
                            {new Date(item.created).toLocaleString()}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent width="100%">
                            <Stack>
                              <Typography sx={{ width: '100%' }}>{item.name}</Typography>
                              <Typography variant="caption">{item.reply}</Typography>
                              {item.attachment && (
                                <Chip
                                  label={'View Attachment'}
                                  color="info"
                                  sx={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setSelectedFile(item.attachment);
                                    setOpenFile(true);
                                  }}
                                />
                              )}
                            </Stack>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </>
                ) : (
                  <Typography variant="caption">No Data Available</Typography>
                )}
              </Stack>
            </>
          )
        )}
        {openFile && (
          <FilePreviewDialog
            data={{
              file_ext: selectedFile.split('.').pop(),
              path: selectedFile,
            }}
            open={openFile}
            onClose={() => {
              setOpenFile(false);
              setSelectedFile('');
            }}
          />
        )}
      </MainCard>
    </>
  );
};

export default TicketDetail;
