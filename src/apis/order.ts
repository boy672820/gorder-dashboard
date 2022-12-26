import axios from '../utils/axios';
import { Order, OrderList } from '../@types/order';
import { Enumerable } from '../@types';

const orderUrl = (path?: string) => `/order${path || ''}`;

class ApiBase {
  static async get<T>(url: string, params?: any): Promise<T> {
    const response = await axios.get<T>(url, { params });

    return response.data;
  }

  static async patch<T>(url: string, data?: any): Promise<T> {
    const response = await axios.patch<T>(url, data);

    return response.data;
  }
}

export class OrderApi extends ApiBase {
  static async getOrders(): Promise<OrderList> {
    const params = { type: Enumerable.OrderType.Order, orderBy: 'asc' };
    const data = await this.get<OrderList>(orderUrl(), params);

    return data;
  }

  static async updateStatus(
    orderId: Order['orderId'],
    _status: Enumerable.OrderStatus
  ): Promise<Order> {
    const status = _status.toLowerCase();
    const data = await this.patch<Order>(orderUrl(`/${orderId}/status/${status}`));

    return data;
  }
}
