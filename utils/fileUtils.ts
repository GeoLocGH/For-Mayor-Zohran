export interface Base64File {
  base64: string;
  mimeType: string;
}

export const fileToBase64 = (file: File): Promise<Base64File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // result is in the format "data:image/jpeg;base64,LzlqLzRBQ...""
      // We need to extract just the base64 part
      const base64 = result.split(',')[1];
      if (!base64) {
        reject(new Error("Failed to read base64 data from file."));
        return;
      }
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
