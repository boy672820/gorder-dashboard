import axiosInstance from '../utils/axios';
import { OrderList, OrderType } from '../@types/order';

const orderUrl = (path?: string) => `/order${path || ''}`;

export class OrderApi {
  static async getOrders(): Promise<OrderList> {
    const params = { type: OrderType.Order, orderBy: 'asc' };
    const response = await axiosInstance.get<OrderList>(orderUrl(), { params });

    return response.data;
  }
}
