import { Router } from "express";
import { createInteraction } from "../controllers/interaction.controller";

const router = Router();

router.post("/", createInteraction);

export default router;
