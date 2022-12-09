import axiosInstance from '../utils/axios';
import { Order, OrderType } from '../@types/order';

const orderUrl = (path?: string) => `/order${path || ''}`;

export class OrderApi {
  static async getOrders(): Promise<Order[]> {
    const params = { type: OrderType.Order, orderBy: 'asc' };
    const response = await axiosInstance.get<Order[]>(orderUrl(), { params });

    return response.data;
  }
}
