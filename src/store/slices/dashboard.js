// third-party
import { createSlice } from '@reduxjs/toolkit';

// project import
import AxiosInstance from 'utils/axios';
// import formData from 'utils/formData';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';
// ------------------------------------------------------------
const initialState = {
  error: null,
  loading: false,
  listCategory: null,
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    loading(state, action) {
      state.loading = action.payload;
    },

    listCategory(state, action) {
      state.listCategory = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// --------------------------------------------------------------------------------
export function getCategory(param) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/category?${param ? param : ''}`);
      dispatch(slice.actions.listCategory(res.data.data));
      dispatch(slice.actions.loading(false));
      dispatch(slice.actions.hasError(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
    }
  };
}

export function createCategory(body) {
  return async () => {
    try {
      await AxiosInstance.post('/ticket/category', body);
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/category`);
      dispatch(slice.actions.listCategory(res.data.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Create New Category ',
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: true,
        })
      );
      dispatch(slice.actions.loading(false));
      dispatch(slice.actions.hasError(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Failed - Create New Category',
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

export function deleteCategory(id) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      await AxiosInstance.delete(`/ticket/category/${id}`);
      const res = await AxiosInstance.get(`/ticket/category`);
      dispatch(slice.actions.listCategory(res.data.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Delete Category ',
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: false,
        })
      );
      dispatch(slice.actions.loading(false));
      dispatch(slice.actions.hasError(null));
    } catch (error) {
      dispatch(slice.actions.loading(true));
      dispatch(slice.actions.hasError(error.response.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Failed - Delete Category',
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
