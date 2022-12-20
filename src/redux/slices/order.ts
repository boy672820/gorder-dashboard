import { createSlice } from '@reduxjs/toolkit';
import { Order, OrderState, OrderStatus } from '../../@types/order';
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

    /**
     * 주문내역 전체 가져오기
     * @param action 주문대기, 주문확인, 배송중, 배송완료, 주문취소 목록
     */
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

    /**
     * 주문 확인처리
     * @param action 확인된 주문의 인덱스
     */
    confirmOrder(state, action) {
      const index = action.payload;
      const pending = state.pendingOrders;

      // 상태를 주문대기로 변경
      pending[index].status = OrderStatus.Confirmed;

      // 주문대기 목록의 총 개수 감소
      state.pendingOrderTotalCount -= 1;

      // 주문확인 목록의 맨 앞으로 이동, 총 개수 증가
      state.confirmedOrders.unshift(pending[index]);
      state.confirmedOrderTotalCount += 1;

      // 로딩상태 해제
      state.isLoading = false;
    },

    completeOrder(state, action) {
      const index = action.payload;
      const confirmed = state.confirmedOrders;

      // 상태를 주문대기로 변경
      confirmed[index].status = OrderStatus.Completed;

      // 주문확인 목록의 총 개수 감소
      state.confirmedOrderTotalCount -= 1;

      // 완료 목록의 맨 앞으로 이동, 총 개수 증가
      state.completedOrders.unshift(confirmed[index]);
      state.completedOrderTotalCount += 1;

      // 로딩상태 해제
      state.isLoading = false;
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

export const confirmOrder = (orderId: Order['orderId'], index: number) => async () => {
  dispatch(slice.actions.startLoading());

  try {
    dispatch(slice.actions.confirmOrder(index));
  } catch (e) {
    dispatch(slice.actions.hasError(e.message));
  }
};

export const completeOrder = (orderId: Order['orderId'], index: number) => async () => {
  dispatch(slice.actions.startLoading());

  try {
    dispatch(slice.actions.completeOrder(index));
  } catch (e) {
    dispatch(slice.actions.hasError(e));
  }
};
