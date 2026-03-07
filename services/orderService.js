const repository = require("../repositories/orderRepository");
const { mapOrderRequest } = require("../utils/mapper");

class OrderService {

    async createOrder(data) {

        const order = mapOrderRequest(data);

        await repository.createOrder(order);

        return order;
    }

    async getOrder(orderId) {

        const order = await repository.getOrder(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        return order;
    }

    async listOrders() {

        return await repository.listOrders();
    }

    async deleteOrder(orderId) {

        const deleted = await repository.deleteOrder(orderId);

        if (!deleted) {
            throw new Error("Order not found");
        }

    }

    async updateOrder(orderId, data) {

        const order = mapOrderRequest(data);

        order.orderId = orderId;

        await repository.updateOrder(order);

        return order;
    }

}

module.exports = new OrderService();