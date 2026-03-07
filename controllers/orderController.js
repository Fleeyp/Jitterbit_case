import { createOrder, getOrder, listOrders, updateOrder, deleteOrder } from "../services/orderService";

class OrderController {

    async create(req, res) {

        try {

            const order = await createOrder(req.body);

            res.status(201).json(order);

        } catch (error) {

            res.status(500).json({ error: error.message });

        }
    }

    async get(req, res) {

        try {

            const order = await getOrder(req.params.id);

            res.status(200).json(order);

        } catch (error) {

            res.status(404).json({ error: error.message });

        }

    }

    async list(req, res) {

        try {

            const orders = await listOrders();

            res.status(200).json(orders);

        } catch (error) {

            res.status(500).json({ error: error.message });

        }

    }

    async update(req, res) {

        try {

            const order = await updateOrder(req.params.id, req.body);

            res.status(200).json(order);

        } catch (error) {

            res.status(500).json({ error: error.message });

        }

    }

    async delete(req, res) {

        try {

            await deleteOrder(req.params.id);

            res.status(204).send();

        } catch (error) {

            res.status(404).json({ error: error.message });

        }

    }

}

export default new OrderController();