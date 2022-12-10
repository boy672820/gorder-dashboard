import { createSlice } from '@reduxjs/toolkit';
import { OrderState } from '../../@types/order';
import { dispatch } from '../store';
import { OrderApi } from '../../apis/order';

const initialState: OrderState = {
  pendingOrders: [],
  confirmedOrders: [],
  deliveringOrders: [],
  completedOrders: [],
  cancelledOrders: [],
  //
  pendingOrderTotalCount: 0,
  confirmedOrderTotalCount: 0,
  deliveringOrderTotalCount: 0,
  completedOrderTotalCount: 0,
  cancelledOrderTotalCount: 0,
  //
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

    getAllOrders(state, action) {
      state.isLoading = false;

      state.pendingOrders = action.payload.pendingOrders;
      state.confirmedOrders = action.payload.confirmedOrders;
      state.deliveringOrders = action.payload.deliveringOrders;
      state.completedOrders = action.payload.completedOrders;
      state.cancelledOrders = action.payload.cancelledOrders;

      state.pendingOrderTotalCount = action.payload.pendingOrders.length;
      state.confirmedOrderTotalCount = action.payload.confirmedOrders.length;
      state.deliveringOrderTotalCount = action.payload.deliveringOrders.length;
      state.completedOrderTotalCount = action.payload.completedOrders.length;
      state.cancelledOrderTotalCount = action.payload.cancelledOrders.length;
    },
  },
});

export default slice.reducer;

export const getOrders = () => async () => {
  dispatch(slice.actions.startLoading());

  try {
    const data = await OrderApi.getOrders();

    dispatch(slice.actions.getAllOrders(data));
  } catch (e) {
    dispatch(slice.actions.hasError(e.message));
  }
};
