// third-party
import { createSlice } from '@reduxjs/toolkit';

// project import
import AxiosInstance from 'utils/axios';
import formData from 'utils/formData';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';
// ------------------------------------------------------------
const initialState = {
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // IS LOADING
    loading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// --------------------------------------------------------------------------------
export function updateProfile(body) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      await AxiosInstance.patch(`/user/update-profile`, body);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Edit Profile ',
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: false,
        })
      );
      dispatch(slice.actions.hasError(null));
      dispatch(slice.actions.loading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Failed - Edit Profile',
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: false,
        })
      );
      dispatch(slice.actions.loading(false));
    }
  };
}
export function changePassword(body) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      await AxiosInstance.post(`/auth/change-password`, body);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Change Password ',
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: false,
        })
      );
      dispatch(slice.actions.hasError(null));
      dispatch(slice.actions.loading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Failed - Change Password',
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: false,
        })
      );
      dispatch(slice.actions.loading(false));
    }
  };
}
export function updatePhotoProfile(body) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      const payload = await formData(body);
      await AxiosInstance.patch(`/user/upload-photo`, payload);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Update Photo Profile ',
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: false,
        })
      );
      dispatch(slice.actions.hasError(null));
      dispatch(slice.actions.loading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Failed - Update Photo Profile',
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: false,
        })
      );
      dispatch(slice.actions.loading(false));
    }
  };
}
