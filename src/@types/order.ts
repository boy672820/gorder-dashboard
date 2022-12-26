import { Enumerable } from './enum';

export const OrderStatusLabel: { [keyof in Enumerable.OrderStatus]: string } = {
  [Enumerable.OrderStatus.Pending]: '대기 중',
  [Enumerable.OrderStatus.Confirmed]: '조리 중',
  [Enumerable.OrderStatus.Delivering]: '배달 중',
  [Enumerable.OrderStatus.Completed]: '조리 완료',
  [Enumerable.OrderStatus.Cancelled]: '주문 취소',
} as const;

export type OrderProduct = {
  name: string;
  basePrice: number;
  discountPrice: number;
  discountPercent: number;
  totalPrice: number;
  quantity: number;
  imageUrl: string;
};

export type Order = {
  orderId: string;
  basePrice: number;
  discountPrice: number;
  totalPrice: number;
  type: Enumerable.OrderType;
  status: Enumerable.OrderStatus;
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
  initialized: boolean;
  isLoading: boolean;
  error: string | null;
} & OrderList;
