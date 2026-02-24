
import { GoogleGenAI } from "@google/genai";
import { Language, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTIONS = (profile: UserProfile) => `
You are "Agri Bot", a friendly and expert agricultural assistant for Indian farmers.
The user is ${profile.name}, located in ${profile.location}.
They grow ${profile.cropType} in ${profile.soilType} soil.
The user prefers to communicate in ${profile.language}.

Your goal is to provide simple, practical, and voice-friendly advice.
- Use very simple language.
- Keep responses concise (max 3-4 sentences) so they are easy to listen to.
- Focus on organic and sustainable farming practices where possible.
- If asking about weather, remind them to check the weather alerts section.
- If asking about government schemes, mention the schemes section.
- Always be encouraging and respectful.
- If the language is not English, respond in that specific regional language.
`;

export async function getAgriAdvice(prompt: string, profile: UserProfile) {
  try {
    const model = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS(profile),
      },
    });

    const response = await model;
    return response.text || "I'm sorry, I couldn't understand that. Can you try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am having trouble connecting to my brain right now. Please check your internet.";
  }
}
