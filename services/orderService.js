const repository = require("../repositories/orderRepository");
const { mapOrderRequest } = require("../utils/mapper");
const AppError = require("../middlewares/AppError");

class OrderService {

    async createOrder(data) {

        const order = mapOrderRequest(data);

        await repository.createOrder(order);

        return order;
    }

    async getOrder(orderId) {

        const order = await repository.getOrder(orderId);

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        return order;
    }

    async listOrders() {

        return await repository.listOrders();
    }

    async deleteOrder(orderId) {

        const deleted = await repository.deleteOrder(orderId);

        if (!deleted) {
            throw new AppError("Order not found", 404);
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