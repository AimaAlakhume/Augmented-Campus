import { GoogleGenAI, Type } from "@google/genai";
import { Hunt } from '../types';

// Safely initialize the AI client
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateCreativeHunts = async (topic: string): Promise<Partial<Hunt>[]> => {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning empty list.");
    return [];
  }

  try {
    const prompt = `Generate 3 unique and engaging university campus scavenger hunt ideas revolving around the theme: "${topic}". 
    Return the data in a strict JSON array format. 
    Each item should have:
    - title (string)
    - description (string, max 20 words)
    - difficulty (Enum: "Easy", "Medium", "Hard")
    - duration (number, in minutes)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
              duration: { type: Type.INTEGER },
            },
            required: ["title", "description", "difficulty", "duration"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as Partial<Hunt>[];
  } catch (error) {
    console.error("Error generating hunts:", error);
    return [];
  }
};

export const generateHuntDescription = async (title: string): Promise<string> => {
    if (!ai) return "An exciting adventure awaits on campus!";
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write a short, exciting 2-sentence description for a campus scavenger hunt titled "${title}".`
        });
        return response.text || "An exciting adventure awaits!";
    } catch (e) {
        return "An exciting adventure awaits!";
    }
}
