import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

import HeadsetIcon from '@mui/icons-material/Headset';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// ===============================|| UI DIALOG - FILE PREVIEW ||=============================== //

export default function FilePreviewDialog({ title, open, onClose, loading, data, downloadOption }) {
  const [baseUrl, setBaseUrl] = useState('');
  const [type, setType] = useState('');
  useEffect(() => {
    const dataNew = { ...data };
    if (data.file_url) dataNew.path = dataNew.file_url;
    if (data.path) dataNew.file_ext = data?.file_ext || data.format;
    if (dataNew.title || dataNew.file_ext) {
      if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(dataNew.file_ext)) {
        setType('document');
        setBaseUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${dataNew.path}`);
      } else if (['pdf'].includes(data.file_ext)) {
        setType('document');
        setBaseUrl(`https://docs.google.com/viewerng/viewer?url=${dataNew.path}&embedded=true`);
      } else if (['jpg', 'png', 'jpeg', 'gif'].includes(dataNew.file_ext)) {
        setType('image');
        setBaseUrl(dataNew.path);
      } else if (['mp4'].includes(dataNew.file_ext)) {
        setType('video');
        setBaseUrl(dataNew.path);
      } else if (['mp3'].includes(dataNew.file_ext)) {
        setType('audio');
        setBaseUrl(dataNew.path);
      } else {
        setType('nope');
      }
    }
  }, [data]);
  return (
    <>
      <Dialog fullWidth={true} fullScreen={true} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        {loading ? (
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          open && (
            <>
              <Grid container justifyContent="space between" alignItems="center">
                <Grid item xs>
                  <DialogTitle id="responsive-dialog-title">{title || 'File Preview'}</DialogTitle>
                </Grid>
                <Grid item xs sx={{ textAlign: 'right', p: 1, pr: 2 }}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setType('');
                      setBaseUrl('');
                      onClose();
                    }}
                  >
                    <CloseOutlinedIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Grid>
              </Grid>
              <PerfectScrollbar>
                <DialogContent sx={{ p: 0 }}>
                  {type === 'document' ? (
                    <Grid item xs={12} textAlign="center">
                      <iframe title="file view" className="file-content-preview " src={baseUrl} frameborder="0" height="100%" width="100%"></iframe>
                    </Grid>
                  ) : type === 'video' ? (
                    <Grid item xs={12} textAlign="center">
                      <video className="file-content-preview " controls src={baseUrl}></video>
                    </Grid>
                  ) : type === 'audio' ? (
                    <Grid container className="file-content-preview" sx={{ position:'relative' }}>
                      <Grid item xs={12} textAlign="center" sx={{ height:'100%', margin:'auto' }}>
                        <HeadsetIcon sx={{ fontSize: '140px', color: '#666' }} />
                      </Grid>
                      <Grid item xs={12} textAlign="center" sx={{ position:'absolute', bottom:0, left:'50%', transform: 'translate(-50%, 0)' }}>
                        <audio controls src={baseUrl}  ></audio>
                      </Grid>
                    </Grid>
                  ) : type === 'image' ? (
                    <Grid item xs={12} textAlign="center">
                      <img alt="file" src={baseUrl} className="file-content-preview " />
                    </Grid>
                  ) : (
                    <Grid item xs={12} textAlign="center" className="file-content-preview ">
                      <FolderZipIcon sx={{ fontSize: '140px', color: '#666' }} />
                      <p className="label-md">Preview is not available for this document type. Please download to view</p>
                    </Grid>
                  )}
                </DialogContent>
              </PerfectScrollbar>

              <DialogActions sx={{ pr: 2.5 }}>
                {downloadOption && (
                  // eslint-disable-next-line react/jsx-no-target-blank
                  <a href={data.path} target="_blank" download>
                    <Button compome variant="contained" color="secondary" size="small" autoFocus>
                      Download
                    </Button>
                  </a>
                )}
              </DialogActions>
            </>
          )
        )}
      </Dialog>
    </>
  );
}

FilePreviewDialog.propTypes = {
  title: PropTypes.string,
  btnCancel: PropTypes.string,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  downloadOption: PropTypes.bool,
};
