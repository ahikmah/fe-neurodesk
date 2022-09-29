import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  selectedItem: ['dashboard'],
  drawerOpen: false,
  menuOpen: true,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },

    openMenu(state, action) {
      state.menuOpen = action.payload;
    },
  },
});

export default menu.reducer;

export const { activeItem, openDrawer, openMenu } = menu.actions;
