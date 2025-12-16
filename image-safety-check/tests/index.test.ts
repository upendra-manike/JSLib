import { describe, it, expect, beforeAll } from 'vitest';
import { loadModel, checkImage, isImageSafe, containsNudity, getModel } from '../src/index';

describe('Image Safety Check', () => {
  beforeAll(async () => {
    // Load model before tests
    await loadModel();
  }, 30000); // 30 second timeout for model loading

  it('should load the model', () => {
    const model = getModel();
    expect(model).not.toBeNull();
  });

  it('should export checkImage function', () => {
    expect(typeof checkImage).toBe('function');
  });

  it('should export isImageSafe function', () => {
    expect(typeof isImageSafe).toBe('function');
  });

  it('should export containsNudity function', () => {
    expect(typeof containsNudity).toBe('function');
  });

  it('should handle checkImage with valid image', async () => {
    // Create a simple test image (1x1 pixel)
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1, 1);
    }

    const result = await checkImage(canvas);
    
    expect(result).toHaveProperty('isSafe');
    expect(result).toHaveProperty('isNude');
    expect(result).toHaveProperty('isExplicit');
    expect(result).toHaveProperty('confidence');
    expect(result).toHaveProperty('categories');
    expect(typeof result.isSafe).toBe('boolean');
    expect(typeof result.isNude).toBe('boolean');
    expect(typeof result.isExplicit).toBe('boolean');
    expect(typeof result.confidence).toBe('number');
    expect(result.categories).toHaveProperty('drawing');
    expect(result.categories).toHaveProperty('hentai');
    expect(result.categories).toHaveProperty('neutral');
    expect(result.categories).toHaveProperty('porn');
    expect(result.categories).toHaveProperty('sexy');
  });

  it('should return boolean from isImageSafe', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1, 1);
    }

    const safe = await isImageSafe(canvas);
    expect(typeof safe).toBe('boolean');
  });

  it('should return boolean from containsNudity', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1, 1);
    }

    const hasNudity = await containsNudity(canvas);
    expect(typeof hasNudity).toBe('boolean');
  });

  it('should respect custom threshold', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1, 1);
    }

    const resultStrict = await checkImage(canvas, { threshold: 0.9 });
    const resultLenient = await checkImage(canvas, { threshold: 0.1 });
    
    expect(typeof resultStrict.isSafe).toBe('boolean');
    expect(typeof resultLenient.isSafe).toBe('boolean');
  });
});


