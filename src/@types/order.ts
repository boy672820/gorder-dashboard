export enum OrderType {
  Pickup = 'Pickup',
  Order = 'Order',
}

export enum OrderStatus {
  Pending = 'Pending', // 주문대기
  Confirmed = 'Confirmed', // 주문확인
  Delivering = 'Delivering', // 배송중
  Completed = 'Completed', // 주문완료
  Cancelled = 'Cancelled', // 주문취소
}

export type OrderProduct = {
  name: string;
  basePrice: number;
  discount: number;
  totalPrice: number;
  quantity: number;
};

export type Order = {
  orderId: string;
  amount: number;
  type: OrderType;
  status: OrderStatus;
  createdAt: string;
  user: {
    email: string;
  };
  orderHasProducts: Array<OrderProduct>;
  _count: { orderHasProducts: number };
};

export type OrderList = {
  pendingOrders: Order[];
  confirmedOrders: Order[];
  deliveringOrders: Order[];
  completedOrders: Order[];
  cancelledOrders: Order[];
};

export type OrderState = {
  pendingOrderTotalCount: number;
  confirmedOrderTotalCount: number;
  deliveringOrderTotalCount: number;
  completedOrderTotalCount: number;
  cancelledOrderTotalCount: number;
  //
  isLoading: boolean;
  error: string | null;
} & OrderList;