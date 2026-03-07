import express, { json } from "express";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(json());

app.use("/order", orderRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});