const baseRepository = require("./baseRepository");

class OrderRepository {

    async createOrder(order) {

        await baseRepository.insert("Order", {
            orderId: order.orderId,
            value: order.value,
            creationDate: order.creationDate
        });

        for (const item of order.items) {

            await baseRepository.insert("Items", {
                orderId: order.orderId,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            });

        }

    }

    async getOrder(orderId) {

        const order = await baseRepository.findOne(
            "Order",
            { orderId }
        );

        if (!order) return null;

        const items = await baseRepository.findAll(
            "Items",
            {
                filters: { orderId }
            }
        );

        order.items = items;

        return order;

    }

    async listOrders() {

        return await baseRepository.findAll(
            "Order",
            {
                orderBy: "creationDate DESC"
            }
        );

    }

    async deleteOrder(orderId) {

        await baseRepository.delete(
            "Items",
            { orderId }
        );

        return await baseRepository.delete(
            "Order",
            { orderId }
        );

    }

    async updateOrder(order) {

        await baseRepository.update(
            "Order",
            {
                value: order.value,
                creationDate: order.creationDate
            },
            { orderId: order.orderId }
        );

        await baseRepository.delete(
            "Items",
            { orderId: order.orderId }
        );

        for (const item of order.items) {

            await baseRepository.insert(
                "Items",
                {
                    orderId: order.orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }
            );

        }

    }

}

module.exports = new OrderRepository();