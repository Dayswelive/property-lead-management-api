import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import propertiesRoutes from "./modules/properties/properties.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/auth", authRoutes);
app.use(authMiddleware);
app.use("/properties", propertiesRoutes);

// error handler LAST
app.use(errorHandler);

export default app;
