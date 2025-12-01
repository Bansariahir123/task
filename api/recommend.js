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
      apiKey: process.env.GEMINI_API_KEY, // Make sure this is set in Vercel
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a product recommendation engine.
User prompt: "${prompt}"
Products: ${JSON.stringify(products)}

Your task:
- Select the MOST relevant products from the list.
- ONLY return a JSON object in this exact format: {"recommended":[list of product IDs]}
- Do NOT return explanations, markdown, or any text outside the JSON.
      `,
      config: {
        temperature: 0.4,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    // Extract AI output text
    const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("Gemini Raw Output:", aiText); // Logs output in Vercel

    // Extract JSON from AI output
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res
        .status(500)
        .json({ error: "Gemini did not return valid JSON" });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Return recommended IDs
    return res.status(200).json({ recommended: parsed.recommended || [] });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res
      .status(500)
      .json({ error: "Failed to get response from Gemini", details: error.message });
  }
}

