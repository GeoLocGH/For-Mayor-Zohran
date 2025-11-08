import { GoogleGenAI, Modality } from "@google/genai";

export async function editImageWithPrompt(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  // Do not create the GoogleGenAI instance at the module level.
  // Create it here to ensure it uses the most up-to-date API key from the dialog.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        // The responseModalities values are mutually exclusive. 
        // The array MUST contain exactly one modality, which must be Modality.IMAGE.
        responseModalities: [Modality.IMAGE],
      },
    });

    // Check for blocked responses or empty candidates array
    if (!response.candidates || response.candidates.length === 0) {
      if (response.promptFeedback?.blockReason) {
        throw new Error(`Request was refused due to safety policies: ${response.promptFeedback.blockReason}`);
      }
      throw new Error("The API response was empty. Please try again.");
    }


    // Extract the image data from the response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data was found in the API response.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    // Re-throw the original error to be handled by the component's more specific error handler.
    // This preserves the full error context for better diagnostics.
    throw error;
  }
}
