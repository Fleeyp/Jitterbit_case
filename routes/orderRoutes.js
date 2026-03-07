import { Router } from "express";
import { create, list, get, update, delete as remove } from "../controllers/orderController";

const router = Router();

router.post("/", create);

router.get("/list", list);

router.get("/:id", get);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;