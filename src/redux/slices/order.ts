import { createSlice } from '@reduxjs/toolkit';
import { OrderState } from '../../@types/order';
import { dispatch } from '../store';
import { OrderApi } from '../../apis/order';

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //

    getOrders(state, action) {
      state.isLoading = false;
      state.orders = action.payload;
    },
  },
});

export default slice.reducer;

export const getOrders = () => async () => {
  dispatch(slice.actions.startLoading());

  try {
    const data = await OrderApi.getOrders();

    dispatch(slice.actions.getOrders(data));
  } catch (e) {
    dispatch(slice.actions.hasError(e.message));
  }
};
