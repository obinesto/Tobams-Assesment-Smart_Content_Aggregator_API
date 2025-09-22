import { Schema, model, Document } from "mongoose";

export interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  summary: string;
  tags: string[];
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Article = model<IArticle>("Article", ArticleSchema);
