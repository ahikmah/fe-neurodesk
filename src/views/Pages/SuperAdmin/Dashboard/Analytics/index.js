import { useState } from 'react';

// material ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Menu, MenuItem, Grid, Typography, useMediaQuery } from '@mui/material';

// project import
import ListWrapperCard from 'ui-components/cards/ListWrapperCard';
import MainCard from 'ui-components/cards/MainCard';
import SimpleDarkCard from 'ui-components/cards/SimpleDarkCard';
import SimpleLightCard from 'ui-components/cards/SimpleLightCard';
import StudentDistribution from './StudentDistribution';
import TopStudent from './TopStudent';
import { gridSpacing } from 'store/constant';

// assets
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import SchoolIcon from '@mui/icons-material/School';

function UniversityReport() {
  const theme = useTheme();

  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const blockSX = {
    p: 2.5,
    borderLeft: '1px solid ',
    borderBottom: '1px solid ',
    borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
    borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container spacing={gridSpacing}>
      {/* row 1 */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* col 1 */}
          <Grid item lg={8} md={12} xs={12}>
            <Grid item xs={12}>
              <MainCard
                content={false}
                border={false}
                sx={{
                  '& svg': {
                    width: 50,
                    height: 50,
                    color: theme.palette.secondary.main,
                    borderRadius: '14px',
                    p: 1.25,
                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light',
                  },
                }}
              >
                <Grid container alignItems="center" spacing={0}>
                  <Grid item xs={12} sm={6} sx={blockSX}>
                    <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                      <Grid item>
                        <CollectionsBookmarkOutlinedIcon stroke={1.5} />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="h5" align="center">
                          1
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          PROGRAM STUDI
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={blockSX}>
                    <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                      <Grid item>
                        <ClassOutlinedIcon stroke={1.5} />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="h5" align="center">
                          20
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          MATA KULIAH
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={0}>
                  <Grid item xs={12} sm={6} sx={blockSX}>
                    <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                      <Grid item>
                        <MeetingRoomOutlinedIcon stroke={1.5} />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="h5" align="center">
                          15
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          RUANG KELAS
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={blockSX}>
                    <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                      <Grid item>
                        <BadgeOutlinedIcon stroke={1.5} />
                      </Grid>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="h5" align="center">
                          90
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                          STAF AKADEMIK
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>

          {/* col 2 */}
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <SimpleDarkCard title="250" caption="Mahasiswa Aktif" icon={<LocalLibraryIcon fontSize="inherit" />}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary[200],
                      zIndex: 1,
                    }}
                    aria-controls="menu-total-registrants"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Avatar>
                  <Menu
                    id="menu-total-registrants"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListAltIcon sx={{ mr: 1.75 }} /> Lihat Semua
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                    </MenuItem>
                  </Menu>
                </SimpleDarkCard>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <SimpleLightCard title="580" caption="Alumni" icon={<SchoolIcon fontSize="inherit" />}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary[200],
                      zIndex: 1,
                    }}
                    aria-controls="menu-total-registrants"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Avatar>
                  <Menu
                    id="menu-total-registrants"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListAltIcon sx={{ mr: 1.75 }} /> Lihat Semua
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                    </MenuItem>
                  </Menu>
                </SimpleLightCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <ListWrapperCard title="Mahasiswa Terbaik" placeholder="Masukkan Tahun" footer={false}>
              <TopStudent />
            </ListWrapperCard>
          </Grid>

          <Grid item lg={4} md={12} xs={12}>
            <StudentDistribution title="Distribusi Mahasiswa" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UniversityReport;
