const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./orders.db", (err) => {
    if (err) {
        console.error("Error connecting to db.", err);
    } else {
        console.log("Db connected.");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS "Order" (
            orderId TEXT PRIMARY KEY,
            value REAL,
            creationDate TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Items (
            orderId TEXT,
            productId INTEGER,
            quantity INTEGER,
            price REAL,
            FOREIGN KEY(orderId) REFERENCES "Order"(orderId)
        )
    `);

});

export default db;

// Na criação da tabela order, precisei colocar entre aspas o nome da tabela,
// pois 'order' é uma palavra reservada SQL