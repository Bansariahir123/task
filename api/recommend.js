import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt, products } = req.body;

    if (!prompt || !products) {
      return res
        .status(400)
        .json({ error: "Prompt and products are required" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are a product recommendation engine.
        User prompt: "${prompt}"
        Products: ${JSON.stringify(products)}
        Return only recommended product IDs as: {"recommended":[1,2]}
      `,
    });

    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
}
