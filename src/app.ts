import express from "express";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.use(errorHandler);

export default app;
