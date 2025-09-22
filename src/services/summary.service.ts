import { VertexAI, GenerativeModel } from "@google-cloud/vertexai";
import config from "../config";

/**
 * Initializes the Vertex AI client and the generative model.
 * This function is self-invoking and runs only once when the module is loaded,
 * ensuring the client is not re-initialized on every call.
 * @returns A configured GenerativeModel instance or null if initialization fails.
 */

const initializeModel = (): GenerativeModel | null => {
  if (!config.gcpProjectId) {
    console.warn(
      "GCP_PROJECT_ID is not set. AI summary generation will be disabled"
    );
    return null;
  }

  try {
    const vertexAI = new VertexAI({
      project: config.gcpProjectId,
      location: config.gcpLocation,
    });
    //Instatiating the model
    return vertexAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
  } catch (error) {
    console.error(
      "Failed to initialize Vertex AI. Summary generation may not work.",
      error
    );
    return null;
  }
};

const generativeModel = initializeModel();

/**
 * Generates a summary for the given text using the pre-initialized Vertex AI model.
 * @param text The text content to summarize.
 * @returns A string containing the summary, or null if generation fails.
 */
export const generateSummary = async (text: string): Promise<string | null> => {
  if (!generativeModel) {
    console.warn("Summary generation is disabled or not initialized");
    return null;
  }

  const prompt = `Summarize the following article in 3-5 sentences:\n\n${text}`;

  try {
    const result = await generativeModel.generateContent(prompt);
    const summary = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
    return summary || null;
  } catch (error) {
    console.error("Error generating summary with Vertex AI", error);
    return null;
  }
};
