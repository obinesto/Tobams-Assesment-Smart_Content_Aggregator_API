import { Request, Response } from "express";
import { Interaction } from "../models/interaction.model";

export const createInteraction = async (req: Request, res: Response) => {
  try {
    const { userId, articleId, interactionType } = req.body;
    if (!userId || !articleId) {
      return res.status(400).json({ message: "userId or articleId missing" });
    }
    const interaction = new Interaction({ userId, articleId, interactionType });
    await interaction.save();
    res.status(201).json(interaction);
  } catch (error: any) {
    console.error("Error in createInteraction:", error);
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
