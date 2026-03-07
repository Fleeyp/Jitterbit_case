import { createOrder as _createOrder, getOrder as _getOrder, listOrders as _listOrders, deleteOrder as _deleteOrder, updateOrder as _updateOrder } from "../repositories/orderRepository";
import { mapOrderRequest } from "../utils/mapper";

class OrderService {

    async createOrder(data) {

        const order = mapOrderRequest(data);

        await _createOrder(order);

        return order;
    }

    async getOrder(orderId) {

        const order = await _getOrder(orderId);

        if (!order) {
            throw new Error("Order not found.");
        }

        return order;
    }

    async listOrders() {

        return await _listOrders();
    }

    async deleteOrder(orderId) {

        const deleted = await _deleteOrder(orderId);

        if (!deleted) {
            throw new Error("Order not found.");
        }

    }

    async updateOrder(orderId, data) {

        const order = mapOrderRequest(data);

        order.orderId = orderId;

        await _updateOrder(order);

        return order;
    }

}

export default new OrderService();