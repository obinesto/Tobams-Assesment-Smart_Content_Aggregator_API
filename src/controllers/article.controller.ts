import { Request, Response } from "express";
import { Article } from "../models/article.model";
import { generateSummary } from "../services/summary.service";

export const createArticle = async (req: Request, res: Response) => {
  try {
    let { title, content, author, summary, tags } = req.body;

    // Generate summary if not provided
    if (!summary && content) {
      const generatedSummary = await generateSummary(content);
      if (generatedSummary) {
        summary = generatedSummary;
      }
    }

    const article = new Article({ title, content, author, summary, tags });
    await article.save();
    res.status(201).json(article);
  } catch (error: any) {
    console.error("Error in createArticle:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", details: error.message });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const articles = await Article.find()
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    const total = await Article.countDocuments();

    res.status(200).json({
      data: articles,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error("Error in getArticles:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error: any) {
    console.error("Error in getArticleById:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
