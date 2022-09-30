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
  listTicket: [],
  detailTicket: [],
  pagination: { page: 1, totalPage: 1, totalData: 1 },
};

const slice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    loading(state, action) {
      state.loading = action.payload;
    },

    listTicket(state, action) {
      state.listTicket = action.payload;
    },

    detailTicket(state, action) {
      state.detailTicket = action.payload;
    },

    // pagination for user
    pagiantion(state, action) {
      state.pagination = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// --------------------------------------------------------------------------------
export function getTicket(param) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/all?${param ? param : ''}`);
      dispatch(slice.actions.listTicket(res.data.data));
      dispatch(slice.actions.loading(false));
      dispatch(slice.actions.hasError(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
    }
  };
}
export function getDetailTicket(id) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/detail/${id}`);
      dispatch(slice.actions.detailTicket(res.data.data));
      dispatch(slice.actions.loading(false));
      dispatch(slice.actions.hasError(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
    }
  };
}
export function submitTicket(body) {
  return async () => {
    try {
      const payload = await formData(body);
      await AxiosInstance.post('/ticket/submit', payload);
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/all`);
      dispatch(slice.actions.listTicket(res.data.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Submit Ticket ',
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
          message: 'Failed - Submit Ticket',
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

export function updateTicket(body) {
  return async () => {
    try {
      await AxiosInstance.patch('/ticket/update', body);
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/all`);
      dispatch(slice.actions.listTicket(res.data.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Update Ticket ',
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
          message: 'Failed - Update Ticket',
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
export function replyTicket(body) {
  return async () => {
    try {
      const payload = await formData(body);
      await AxiosInstance.post('/ticket/reply', payload);
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/all`);
      dispatch(slice.actions.listTicket(res.data.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Reply Ticket ',
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
          message: 'Failed - Reply Ticket',
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
