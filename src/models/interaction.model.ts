import { Schema, model, Document } from "mongoose";

export interface IInteraction extends Document {
  userId: Schema.Types.ObjectId;
  articleId: Schema.Types.ObjectId;
  interactionType: "view" | "like";
}

const InteractionSchema = new Schema<IInteraction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true },
    interactionType: { type: String, enum: ["view", "like"], required: true },
  },
  { timestamps: true }
);

export const Interaction = model<IInteraction>(
  "Interaction",
  InteractionSchema
);
