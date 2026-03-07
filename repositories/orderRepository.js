import { run, prepare, get, all } from "../config/database";

class OrderRepository {

    createOrder(order) {

        return new Promise((resolve, reject) => {

            run(
                `INSERT INTO "Order"(orderId, value, creationDate) VALUES (?, ?, ?)`,
                [order.orderId, order.value, order.creationDate],
                (err) => {

                    if (err) return reject(err);

                    const stmt = prepare(
                        `INSERT INTO Items(orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`
                    );

                    order.items.forEach(item => {
                        stmt.run(order.orderId, item.productId, item.quantity, item.price);
                    });

                    stmt.finalize();

                    resolve();
                }
            );
        });
    }

    getOrder(orderId) {

        return new Promise((resolve, reject) => {

            get(
                `SELECT * FROM "Order" WHERE orderId = ?`,
                [orderId],
                (err, order) => {

                    if (err) return reject(err);
                    if (!order) return resolve(null);

                    all(
                        `SELECT productId, quantity, price FROM Items WHERE orderId = ?`,
                        [orderId],
                        (err, items) => {

                            if (err) return reject(err);

                            order.items = items;

                            resolve(order);
                        }
                    );

                }
            );
        });

    }

    listOrders() {

        return new Promise((resolve, reject) => {

            all(`SELECT * FROM "Order"`, [], (err, orders) => {

                if (err) return reject(err);

                resolve(orders);
            });

        });

    }

    deleteOrder(orderId) {

        return new Promise((resolve, reject) => {

            run(`DELETE FROM Items WHERE orderId = ?`, [orderId]);

            run(
                `DELETE FROM "Order" WHERE orderId = ?`,
                [orderId],
                function (err) {

                    if (err) return reject(err);

                    resolve(this.changes);
                }
            );

        });

    }

    updateOrder(order) {

        return new Promise((resolve, reject) => {

            run(
                `UPDATE "Order" SET value = ?, creationDate = ? WHERE orderId = ?`,
                [order.value, order.creationDate, order.orderId],
                (err) => {

                    if (err) return reject(err);

                    run(`DELETE FROM Items WHERE orderId = ?`, [order.orderId]);

                    const stmt = prepare(
                        `INSERT INTO Items(orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`
                    );

                    order.items.forEach(item => {
                        stmt.run(order.orderId, item.productId, item.quantity, item.price);
                    });

                    stmt.finalize();

                    resolve();
                }
            );

        });

    }

}

export default new OrderRepository();