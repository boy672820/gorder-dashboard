import { createSlice } from '@reduxjs/toolkit';
import { Order, OrderState } from '../../@types/order';
import { dispatch } from '../store';
import { OrderApi } from '../../apis/order';
import { Enumerable } from '../../@types';

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
  initialized: false,
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
    getAll(state, action) {
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

      state.initialized = true;
    },

    /**
     * 주문 확인처리
     * @param action 확인된 주문의 인덱스
     */
    confirm(state, action) {
      const { index } = action.payload;
      const pending = state.pendingOrders;

      // 상태를 주문대기로 변경
      pending[index].status = Enumerable.OrderStatus.Confirmed;

      // 주문대기 목록의 총 개수 감소
      state.pendingOrderTotalCount -= 1;

      // 주문확인 목록의 맨 앞으로 이동, 총 개수 증가
      state.confirmedOrders.unshift(pending[index]);
      state.confirmedOrderTotalCount += 1;

      // 로딩상태 해제
      state.isLoading = false;
    },

    /**
     * 주문 완료처리
     * @param state
     * @param action
     */
    complete(state, action) {
      const { index, orderId } = action.payload;
      const confirmed = state.confirmedOrders;

      // 상태를 주문대기로 변경
      confirmed[index].status = Enumerable.OrderStatus.Completed;

      // 주문확인 목록의 총 개수 감소
      state.confirmedOrderTotalCount -= 1;

      // 주문확인 목록에서 제거, 완료 목록의 맨 앞으로 이동
      const pendingIndex = state.pendingOrders.findIndex((order) => order.orderId === orderId);

      if (pendingIndex >= 0) {
        state.pendingOrders.splice(pendingIndex, 1);
      }

      state.completedOrders.unshift(confirmed[index]);

      // 총 개수 증가
      state.completedOrderTotalCount += 1;

      // 로딩상태 해제
      state.isLoading = false;
    },

    //

    cancelByPending(state, action) {
      const { index } = action.payload;
      const pending = state.pendingOrders;

      if (pending[index].status === Enumerable.OrderStatus.Pending) {
        pending[index].status = Enumerable.OrderStatus.Cancelled;
        state.pendingOrderTotalCount -= 1;
      }

      state.isLoading = false;
    },

    cancelByConfirmed(state, action) {
      const { index } = action.payload;
      const confirmed = state.confirmedOrders;

      if (confirmed[index].status === Enumerable.OrderStatus.Confirmed) {
        confirmed[index].status = Enumerable.OrderStatus.Cancelled;
        state.confirmedOrderTotalCount -= 1;
      }

      const pending = state.pendingOrders;

      const pendingIndex = pending.findIndex((order) => order.orderId === confirmed[index].orderId);

      if (pendingIndex >= 0) {
        pending.splice(pendingIndex, 1);
      }

      state.isLoading = false;
    },
  },
});

export default slice.reducer;

export const getOrders = () => async () => {
  dispatch(slice.actions.startLoading());

  try {
    const data = await OrderApi.getOrders();

    dispatch(slice.actions.getAll(data));
  } catch (e) {
    dispatch(slice.actions.hasError(e.message));
  }
};

export const confirmOrder = (orderId: Order['orderId'], index: number) => async () => {
  dispatch(slice.actions.startLoading());

  try {
    await OrderApi.updateStatus(orderId, Enumerable.OrderStatus.Confirmed);

    dispatch(slice.actions.confirm({ index }));
  } catch (e) {
    dispatch(slice.actions.hasError(e.message));
  }
};

export const completeOrder = (orderId: Order['orderId'], index: number) => async () => {
  dispatch(slice.actions.startLoading());

  try {
    await OrderApi.updateStatus(orderId, Enumerable.OrderStatus.Completed);

    dispatch(slice.actions.complete({ orderId, index }));
  } catch (e) {
    dispatch(slice.actions.hasError(e));
  }
};

/**
 * 주문 취소(주문대기 상태)
 * @param orderId
 * @param index
 * @returns
 */
export const cancelOrderByPending = (orderId: Order['orderId'], index: number) => async () => {
  dispatch(slice.actions.startLoading());

  try {
    await OrderApi.updateStatus(orderId, Enumerable.OrderStatus.Cancelled);

    dispatch(slice.actions.cancelByPending({ index }));
  } catch (e) {
    dispatch(slice.actions.hasError(e));
  }
};

/**
 * 주문 취소(주문확인 상태)
 * @param orderId
 * @param index
 * @returns
 */
export const cancelOrderByConfirmed = (orderId: Order['orderId'], index: number) => async () => {
  dispatch(slice.actions.startLoading());

  try {
    await OrderApi.updateStatus(orderId, Enumerable.OrderStatus.Cancelled);

    dispatch(slice.actions.cancelByConfirmed({ index }));
  } catch (e) {
    dispatch(slice.actions.hasError(e));
  }
};
