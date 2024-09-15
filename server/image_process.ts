import sharp from 'sharp';
import fs from 'fs';

export async function processImage(data: any) {
  const {
    filePath,
    brightness = 1,
    saturation = 1,
    contrast = 1, // New contrast parameter
    rotation = 0,
    blur = 0,
    tint = null,
    flop = false,
    flip = false,
    grayscale = false,
    sharpen = 0,
    threshold = null,
    crop = null, // { left, top, width, height }
    width = null,
    height = null,
    format = 'jpeg',
  } = data;

  try {
    // Ensure file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    // Read and process the image
    let image = sharp(filePath)
      .modulate({
        brightness,
        saturation,
      })
      .rotate(rotation); // Rotate image
    
      if (contrast !== 1) {
        // Ensure contrast is within the range 0.5 to 2.0
        const clampedContrast = Math.max(0.5, Math.min(2.0, contrast));
        
        // Calculate slope and intercept for linear contrast adjustment
        const slope = clampedContrast;
        const intercept = -(128 * (clampedContrast - 1));
        
        image = image.linear(slope, intercept);
      }

    if (blur > 0) {
      image = image.blur(blur); // Apply blur
    }

    if (tint) {
      image = image.tint(tint); // Apply tint
    }

    if (flop) {
      image = image.flop(); // Flip the image horizontally
    }

    if (flip) {
      image = image.flip(); // Flip the image vertically
    }

    if (grayscale) {
      image = image.grayscale(); // Convert to grayscale
    }

    if (sharpen > 0) {
      image = image.sharpen(sharpen); // Apply sharpening
    }

    if (threshold !== null) {
      image = image.threshold(threshold); // Apply threshold effect
    }

    if (crop) {
      image = image.extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height }); // Crop the image
    }

    if (width || height) {
      image = image.resize(width, height); // Resize the image
    }

    // Convert image format
    if (format === 'png') {
      image = image.png();
    } else {
      image = image.jpeg();
    }

    // Generate the processed image buffer
    const buffer = await image.toBuffer();
    return buffer;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Image processing failed');
  }
}
