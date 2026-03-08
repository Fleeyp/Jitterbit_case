const AppError = require("./AppError");

function errorHandler(err, req, res, next) {

    if (err instanceof AppError) {

        return res.status(err.statusCode).json({
            error: err.message
        });

    }

    console.error(err);

    return res.status(500).json({
        error: "Internal server error"
    });

}

module.exports = errorHandler;

