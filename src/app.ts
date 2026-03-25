import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
//routes
import { authMiddleware } from "./middlewares/auth.middleware";
import propertiesRoutes from "./modules/properties/properties.routes";
import leadsRoutes from "./modules/leads/leads.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/auth", authRoutes);
app.use(authMiddleware);
//protected routes
app.use("/properties", propertiesRoutes);
app.use("/leads", leadsRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(errorHandler);

export default app;
