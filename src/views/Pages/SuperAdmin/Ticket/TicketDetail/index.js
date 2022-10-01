/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material ui
import { Button, Chip, CircularProgress, Divider, Grid, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
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
import { replyTicket, silentReply, updateTicket } from 'store/slices/ticket';

// assets
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const TicketDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.ticket);
  const dashboard = useSelector((state) => state.dashboard);
  const { id } = useParams();
  const [modeEdit, setModeEdit] = useState(false);
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

  // ================ EDITABLE FIELD ==================== //
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  useEffect(() => {
    setStatus(detail[0]?.status);
  }, [detail[0]?.status]);
  useEffect(() => {
    setCategory(detail[0]?.category);
  }, [detail[0]?.category]);
  useEffect(() => {
    setAssignedTo(detail[0]?.assigned_to_id);
  }, [detail[0]?.assigned_to_id]);
  useEffect(() => {
    setPriority(detail[0]?.priority);
  }, [detail[0]?.priority]);

  const updateTicketHandler = async () => {
    setLoadingUpdate(true);
    const body = {
      id: id,
      status: status,
      category: category,
      assigned_to_id: assignedTo,
      priority: priority,
    };
    await dispatch(updateTicket(body));
    if (status !== detail[0]?.status) {
      const body = {
        id_ticket: id,
        description: `[Auto Reply] - Update Ticket Status from ${detail[0]?.ticket_status} to ${
          status === '00' ? 'Open' : status === '01' ? 'Resolved' : status === '02' ? 'Closed' : status === '03' ? 'Duplicate' : 'Undefined'
        }`,
      };
      await dispatch(silentReply(body));
    }
    if (category !== detail[0]?.category) {
      const body = {
        id_ticket: id,
        description: `[Auto Reply] - Update Ticket Category from ${detail[0]?.category} to ${category}`,
      };
      await dispatch(silentReply(body));
    }
    if (assignedTo !== detail[0]?.assigned_to_id) {
      const body = {
        id_ticket: id,
        description: '[Auto Reply] - Update Ticket Owner',
      };
      await dispatch(silentReply(body));
    }
    if (priority !== detail[0]?.priority) {
      const body = {
        id_ticket: id,
        description: `[Auto Reply] - Update Ticket Priority from ${detail[0]?.ticket_priority} to ${
          priority === '01' ? 'High' : priority === '02' ? 'Medium' : priority === '03' ? 'Low' : 'Undefined'
        }`,
      };
      await dispatch(silentReply(body));
    }

    dispatch(getDetailTicket(id));
    setLoadingUpdate(false);
    setModeEdit(false);
  };

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
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3">Detail Ticket</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button size="small" variant="outlined" onClick={() => setModeEdit((prev) => !prev)} color={modeEdit ? 'error' : 'primary'}>
                {modeEdit ? 'Cancel' : 'Edit'}
              </Button>
              {modeEdit && (
                <LoadingButton loading={loadingUpdate} onClick={updateTicketHandler} size="small" variant="contained">
                  Save
                </LoadingButton>
              )}
            </Stack>
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
                        {modeEdit ? (
                          <TextField select size="small" variant="standard" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value="00">Open</MenuItem>
                            <MenuItem value="01">Resolved</MenuItem>
                            <MenuItem value="02">Closed</MenuItem>
                            <MenuItem value="03">Duplicate</MenuItem>
                          </TextField>
                        ) : (
                          <Typography>{detail[0]?.ticket_status}</Typography>
                        )}
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
                        {modeEdit ? (
                          <TextField select size="small" variant="standard" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {dashboard.listCategory.map((item, key) => (
                              <MenuItem key={key} value={item.category}>
                                {item.category}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <Typography>{detail[0]?.category}</Typography>
                        )}
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
                        {modeEdit ? (
                          <TextField select size="small" variant="standard" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                            {dashboard.listUser.map((item, key) => (
                              <MenuItem key={key} value={item.id}>
                                {item.full_name} - {item.division}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <Typography>
                            {detail[0]?.assignee_name} <br /> ({detail[0]?.assignee_email}){' '}
                          </Typography>
                        )}
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
                        {modeEdit ? (
                          <TextField select size="small" variant="standard" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <MenuItem value="01">Hight</MenuItem>
                            <MenuItem value="02">Medium</MenuItem>
                            <MenuItem value="03">Low</MenuItem>
                          </TextField>
                        ) : (
                          <Typography>{detail[0]?.ticket_priority}</Typography>
                        )}
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
