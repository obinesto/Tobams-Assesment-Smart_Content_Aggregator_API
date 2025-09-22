import { Request, Response } from "express";
import { User } from "../models/user.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, interests } = req.body;
    const user = new User({ username, interests });
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    console.error("Error in createUser:", error);
    // Handle duplicate username error
    if (error.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    }
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
