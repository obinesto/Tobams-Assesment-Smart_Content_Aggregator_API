import { Router } from "express";
import articleRoutes from "./article.routes";
import userRoutes from "./user.routes";
import interactionRoutes from "./interaction.routes";

const router = Router();

router.use("/articles", articleRoutes);
router.use("/users", userRoutes);
router.use("/interactions", interactionRoutes);

export default router;
