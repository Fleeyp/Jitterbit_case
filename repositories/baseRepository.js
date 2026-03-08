const db = require("../config/database");

class BaseRepository {

    buildWhereClause(filters) {

        if (!filters || Object.keys(filters).length === 0) {
            return {
                clause: "",
                values: []
            };
        }

        const keys = Object.keys(filters);

        const clause = keys
            .map(key => `${key} = ?`)
            .join(" AND ");

        const values = Object.values(filters);

        return {
            clause: `WHERE ${clause}`,
            values
        };
    }

    findOne(table, filters) {

        return new Promise((resolve, reject) => {

            const { clause, values } = this.buildWhereClause(filters);

            const query = `
                SELECT *
                FROM "${table}"
                ${clause}
                LIMIT 1
            `;

            db.get(query, values, (err, row) => {

                if (err) return reject(err);

                resolve(row);

            });

        });

    }

    findAll(table, options = {}) {

        return new Promise((resolve, reject) => {

            const {
                filters = null,
                orderBy = null,
                limit = null,
                offset = null
            } = options;

            const { clause, values } = this.buildWhereClause(filters);

            let query = `
                SELECT *
                FROM "${table}"
                ${clause}
            `;

            if (orderBy) {
                query += ` ORDER BY ${orderBy}`;
            }

            if (limit) {
                query += ` LIMIT ${limit}`;
            }

            if (offset) {
                query += ` OFFSET ${offset}`;
            }

            db.all(query, values, (err, rows) => {

                if (err) return reject(err);

                resolve(rows);

            });

        });

    }

    insert(table, data) {

        return new Promise((resolve, reject) => {

            const keys = Object.keys(data);
            const values = Object.values(data);

            const placeholders = keys.map(() => "?").join(",");

            const query = `
                INSERT INTO "${table}" (${keys.join(",")})
                VALUES (${placeholders})
            `;

            db.run(query, values, function (err) {

                if (err) return reject(err);

                resolve(this);

            });

        });

    }

    update(table, data, filters) {

        return new Promise((resolve, reject) => {

            const dataKeys = Object.keys(data);
            const dataValues = Object.values(data);

            const { clause, values } = this.buildWhereClause(filters);

            const setClause = dataKeys
                .map(key => `${key} = ?`)
                .join(",");

            const query = `
                UPDATE "${table}"
                SET ${setClause}
                ${clause}
            `;

            db.run(
                query,
                [...dataValues, ...values],
                function (err) {

                    if (err) return reject(err);

                    resolve(this);

                }
            );

        });

    }

    delete(table, filters) {

        return new Promise((resolve, reject) => {

            const { clause, values } = this.buildWhereClause(filters);

            const query = `
                DELETE FROM "${table}"
                ${clause}
            `;

            db.run(query, values, function (err) {

                if (err) return reject(err);

                resolve(this);

            });

        });

    }

}

module.exports = new BaseRepository();