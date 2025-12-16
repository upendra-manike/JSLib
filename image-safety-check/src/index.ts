import * as nsfwjs from 'nsfwjs';

export interface SafetyCheckResult {
  isSafe: boolean;
  isNude: boolean;
  isExplicit: boolean;
  confidence: number;
  categories: {
    drawing: number;
    hentai: number;
    neutral: number;
    porn: number;
    sexy: number;
  };
}

export interface CheckOptions {
  threshold?: number;
  modelPath?: string;
}

let model: nsfwjs.NSFWJS | null = null;

/**
 * Load the NSFW detection model
 * Call this before using checkImage or checkImageFromUrl
 */
export async function loadModel(modelPath?: string): Promise<void> {
  if (model) return;
  
  try {
    model = await nsfwjs.load(modelPath || 'https://nsfwjs.com/model/', {
      size: 299,
    });
  } catch (error) {
    throw new Error(`Failed to load NSFW model: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Check if an image contains nudity or explicit content
 * @param image - HTMLImageElement, HTMLCanvasElement, ImageData, or Buffer
 * @param options - Configuration options
 * @returns Safety check result
 */
export async function checkImage(
  image: HTMLImageElement | HTMLCanvasElement | ImageData | Buffer | string,
  options: CheckOptions = {}
): Promise<SafetyCheckResult> {
  if (!model) {
    await loadModel(options.modelPath);
  }

  if (!model) {
    throw new Error('Model failed to load');
  }

  const threshold = options.threshold ?? 0.5;
  
  let predictions: nsfwjs.predictionType[];
  
  try {
    // Handle different input types
    if (typeof image === 'string') {
      // URL or base64
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image;
      });
      predictions = await model.classify(img);
    } else if (Buffer.isBuffer(image)) {
      // Node.js Buffer - convert to ImageData or use canvas
      throw new Error('Buffer input requires canvas implementation. Use HTMLImageElement or URL instead.');
    } else {
      predictions = await model.classify(image as HTMLImageElement | HTMLCanvasElement | ImageData);
    }
  } catch (error) {
    throw new Error(`Failed to classify image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  const categories = {
    drawing: 0,
    hentai: 0,
    neutral: 0,
    porn: 0,
    sexy: 0,
  };

  predictions.forEach((pred) => {
    categories[pred.className as keyof typeof categories] = pred.probability;
  });

  const explicitScore = categories.porn + categories.hentai;
  const nudeScore = categories.porn + categories.sexy;
  const isNude = nudeScore >= threshold;
  const isExplicit = explicitScore >= threshold;
  const isSafe = !isNude && !isExplicit;

  return {
    isSafe,
    isNude,
    isExplicit,
    confidence: Math.max(...Object.values(categories)),
    categories,
  };
}

/**
 * Check image from URL
 * @param imageUrl - URL of the image to check
 * @param options - Configuration options
 * @returns Safety check result
 */
export async function checkImageFromUrl(
  imageUrl: string,
  options: CheckOptions = {}
): Promise<SafetyCheckResult> {
  return checkImage(imageUrl, options);
}

/**
 * Check if image is safe (simple boolean check)
 * @param image - Image element, canvas, or URL
 * @param threshold - Confidence threshold (default: 0.5)
 * @returns true if image is safe, false otherwise
 */
export async function isImageSafe(
  image: HTMLImageElement | HTMLCanvasElement | ImageData | string,
  threshold: number = 0.5
): Promise<boolean> {
  const result = await checkImage(image, { threshold });
  return result.isSafe;
}

/**
 * Check if image contains nudity
 * @param image - Image element, canvas, or URL
 * @param threshold - Confidence threshold (default: 0.5)
 * @returns true if image contains nudity, false otherwise
 */
export async function containsNudity(
  image: HTMLImageElement | HTMLCanvasElement | ImageData | string,
  threshold: number = 0.5
): Promise<boolean> {
  const result = await checkImage(image, { threshold });
  return result.isNude;
}

/**
 * Get model instance (for advanced usage)
 */
export function getModel(): nsfwjs.NSFWJS | null {
  return model;
}


