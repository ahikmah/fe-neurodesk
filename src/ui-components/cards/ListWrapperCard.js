import { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography, Tooltip, Fab } from '@mui/material';

// project imports
import MainCard from 'ui-components/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconSearch } from '@tabler/icons';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddIcon from '@mui/icons-material/AddTwoTone';

const ListWrapperCard = ({
  title,
  placeholder,
  children,
  footer = true,
  creatable = false,
  createTooltip,
  sx,
  onCreate,
  onChangeSearch,
  searchValue,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Typography variant="title">{title}</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={gridSpacing}>
              <Grid item>
                <OutlinedInput
                  id="input-search"
                  placeholder={placeholder || 'Search'}
                  onChange={onChangeSearch}
                  value={searchValue}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconSearch stroke={1.5} size="16px" />
                    </InputAdornment>
                  }
                  size="small"
                />
              </Grid>
              {creatable && (
                <Grid item>
                  <Tooltip title={createTooltip || 'Tambah'}>
                    <Fab color="primary" size="small" onClick={onCreate} sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
                      <AddIcon fontSize="small" />
                    </Fab>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      }
      content={false}
      border={false}
      sx={sx}
    >
      <Grid container>{children}</Grid>

      {footer && (
        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={10} color="primary" />
            </Grid>
            <Grid item>
              <Button
                size="medium"
                sx={{ color: theme.palette.grey[900] }}
                color="secondary"
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={handleClick}
              >
                10 Baris
              </Button>
              <Menu
                id="menu-user-list-style1"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant="selectedMenu"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleClose}> 10 Baris</MenuItem>
                <MenuItem onClick={handleClose}> 20 Baris</MenuItem>
                <MenuItem onClick={handleClose}> 30 Baris </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
};

ListWrapperCard.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  footer: PropTypes.bool,
  creatable: PropTypes.bool,
  createTooltip: PropTypes.string,
  onCreate: PropTypes.func,
  children: PropTypes.node,
};

export default ListWrapperCard;
