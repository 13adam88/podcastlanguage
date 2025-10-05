import { GoogleGenAI, Type } from "@google/genai";
import type { PodcastApiResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const podcastListSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "The official name of the podcast."
        },
        youtubeUrl: {
          type: Type.STRING,
          description: "The full URL to the podcast's main YouTube channel."
        }
      },
      required: ['name', 'youtubeUrl']
    }
};


export const fetchPodcastsByLanguage = async (language: string): Promise<PodcastApiResponse[]> => {
    try {
        const prompt = `Generate a list of 8 popular podcasts primarily in the ${language} language. For each podcast, provide its name and the full URL to its main YouTube channel. Ensure the names and URLs are accurate and directly link to the channel page.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: podcastListSchema,
            },
        });

        const jsonText = response.text.trim();
        const podcastData = JSON.parse(jsonText);

        if (!Array.isArray(podcastData)) {
            throw new Error("Invalid data format received from API.");
        }

        return podcastData as PodcastApiResponse[];

    } catch (error) {
        console.error(`Error fetching podcasts for ${language}:`, error);
        throw new Error(`Could not fetch podcasts for ${language}.`);
    }
};