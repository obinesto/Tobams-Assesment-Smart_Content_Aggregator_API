import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
} from "../controllers/article.controller";

const router = Router();

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);

export default router;
