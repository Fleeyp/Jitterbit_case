const express = require("express");
const controller = require("../controllers/orderController");

const router = express.Router();

router.post("/", controller.create);

router.get("/list", controller.list);

router.get("/:id", controller.get);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

module.exports = router;