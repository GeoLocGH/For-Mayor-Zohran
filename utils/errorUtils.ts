/**
 * Generates a user-friendly error message for the Visual Report submission process.
 * @param error The error object caught.
 * @returns A string containing a clear, actionable error message for the user.
 */
export const getVisualReportErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Specific check for Gemini safety/policy issues
    if (message.includes('safety') || message.includes('refused')) {
        return "Your report couldn't be processed due to safety policies. Please try rephrasing your description or using a different image.";
    }
    
    // Network-related errors
    if (message.includes('network') || message.includes('fetch failed')) {
      return "Unable to connect to the server. Please check your internet connection and try again.";
    }
    
    // API and server-side errors
    if (message.includes('api key not valid')) {
      // Avoid exposing API key details to the user, as per security best practices.
      return "There's an issue with the application's configuration. Please contact support.";
    }
    if (message.includes('429') || message.includes('rate limit')) {
      return "The service is currently busy due to high traffic. Please try again in a few moments.";
    }
    if (message.includes('500') || message.includes('internal server error')) {
      return "A temporary issue occurred on our end. Please try your request again shortly.";
    }
    
    // File processing errors
    if (message.includes('failed to read base64')) {
        return "There was an issue reading your uploaded image. Please try uploading it again.";
    }
    
    // Custom check for empty API responses
    if (message.includes('api response was empty')) {
      return "The model did not return an image. Please try adjusting your description and try again.";
    }

    // If the error message is already user-friendly (e.g., from geminiService), use it directly.
    if (message.includes('no image data was found')) {
        return "The image generation was successful, but no image data was returned. Please try again.";
    }

    // A more generic fallback for other errors from the API.
    return 'An unexpected error occurred while communicating with the service. Please try again.';
  }
  
  // Fallback for non-Error objects.
  return 'An unknown error occurred while submitting the report. Please try again.';
};
