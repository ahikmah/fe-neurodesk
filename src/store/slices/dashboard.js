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
  listCategory: [],
  listUser: [],
  summary: [],
  log: [],
  pagination: { page: 1, totalPage: 1, totalData: 1 },
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

    listUser(state, action) {
      state.listUser = action.payload;
    },
    summary(state, action) {
      state.summary = action.payload;
    },
    log(state, action) {
      state.log = action.payload;
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
export function getDataDashboard() {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/ticket/summary`);
      const res2 = await AxiosInstance.get(`/user/log?page=1&offset=10`);
      dispatch(slice.actions.summary(res.data.data));
      dispatch(slice.actions.log(res2.data.data));
      dispatch(slice.actions.loading(false));
      dispatch(slice.actions.hasError(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
    }
  };
}
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

export function getAllUser(param) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/user/all?${param ? param : ''}`);
      dispatch(slice.actions.listUser(res.data.data));
      if (res.data.page) {
        dispatch(slice.actions.pagiantion({ totalPage: res.data.totalPage, page: res.data.page, totalData: res.data.totalData }));
      }
      dispatch(slice.actions.loading(false));
      dispatch(slice.actions.hasError(null));
    } catch (error) {
      dispatch(slice.actions.hasError(error.response.data));
    }
  };
}

export function createUser(body) {
  return async () => {
    try {
      await AxiosInstance.post('/user', body);
      dispatch(slice.actions.loading(true));
      const res = await AxiosInstance.get(`/user/all?page=1`);
      dispatch(slice.actions.listUser(res.data.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Create New User ',
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
          message: 'Failed - Create New User',
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
export function deleteUser(id) {
  return async () => {
    try {
      dispatch(slice.actions.loading(true));
      await AxiosInstance.delete(`/user/delete/${id}`);
      const res = await AxiosInstance.get(`/user/all?page=1`);
      dispatch(slice.actions.listUser(res.data.data));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Success - Delete User ',
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
          message: 'Failed - Delete User',
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