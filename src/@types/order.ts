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

export const OrderStatusLabel: { [keyof in OrderStatus]: string } = {
  [OrderStatus.Pending]: '주문 대기 중',
  [OrderStatus.Confirmed]: '주문 확인',
  [OrderStatus.Delivering]: '배달 중',
  [OrderStatus.Completed]: '완료',
  [OrderStatus.Cancelled]: '주문 취소',
} as const;

export type OrderProduct = {
  name: string;
  basePrice: number;
  discount: number;
  totalPrice: number;
  quantity: number;
  imageUrl: string;
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
