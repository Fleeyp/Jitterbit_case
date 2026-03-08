const service = require("../services/orderService");

class OrderController {

    async create(req, res, next) {

        try {

            const order = await service.createOrder(req.body);

            res.status(201).json(order);

        } catch (error) {

            next(error);

        }
    }

    async get(req, res, next) {

        try {

            const order = await service.getOrder(req.params.id);

            res.status(200).json(order);

        } catch (error) {

            next(error);

        }

    }

    async list(req, res, next) {

        try {

            const orders = await service.listOrders();

            res.status(200).json(orders);

        } catch (error) {

            next(error);

        }

    }

    async update(req, res, next) {

        try {

            const order = await service.updateOrder(req.params.id, req.body);

            res.status(200).json(order);

        } catch (error) {

            next(error);

        }

    }

    async delete(req, res, next) {

        try {

            await service.deleteOrder(req.params.id);

            res.status(204).send();

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new OrderController();