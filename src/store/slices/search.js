// third-party
import { createSlice } from '@reduxjs/toolkit';

// ------------------------------------------------------------
const initialState = {
  search: '',
};

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

// Reducer
export default search.reducer;

export const { setSearch } = search.actions;
