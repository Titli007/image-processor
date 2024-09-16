import sharp from 'sharp';
import fs from 'fs';

export async function processImage(data: any) {
  const {
    filePath,
    brightness = 1,
    saturation = 1,
    contrast = 1,
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
    format = 'jpeg', // Output format (JPEG by default)
    initialQuality = 50, // Initial quality for resizing
    finalQuality = 90, // Final quality for output
  } = data;

  try {
    // Step 1: Ensure the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    // Step 2: Load and reduce the image quality initially
    let image = sharp(filePath)
      .resize({
        width: width || 300, // Lower resolution if not provided (default 800px width)
        height: height || 300, // Maintain aspect ratio if height is null
        fit: sharp.fit.inside,
        withoutEnlargement: true, // Prevent enlargement if image is smaller than target size
      })
      .jpeg({ quality: initialQuality }); // Initial quality reduction (50%)

    // Step 3: Apply transformations
    image = image
      .modulate({
        brightness,
        saturation,
      })
      .rotate(rotation);

    if (contrast !== 1) {
      const clampedContrast = Math.max(0.5, Math.min(2.0, contrast));
      const slope = clampedContrast;
      const intercept = -(128 * (clampedContrast - 1));
      image = image.linear(slope, intercept); // Apply contrast
    }

    if (blur > 0) {
      image = image.blur(blur); // Apply blur
    }

    if (tint) {
      image = image.tint(tint); // Apply tint
    }

    if (flop) {
      image = image.flop(); // Flip horizontally
    }

    if (flip) {
      image = image.flip(); // Flip vertically
    }

    if (grayscale) {
      image = image.grayscale(); // Apply grayscale
    }

    if (sharpen > 0) {
      image = image.sharpen(sharpen); // Apply sharpening
    }

    if (threshold !== null) {
      image = image.threshold(threshold); // Apply threshold effect
    }

    if (crop) {
      image = image.extract({
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height,
      }); // Crop the image
    }

    // Step 4: Re-convert the image to the final high-quality format
    if (format === 'png') {
      image = image.png({ compressionLevel: 9 }); // High-quality PNG
    } else {
      image = image.jpeg({ quality: finalQuality }); // High-quality JPEG (default 90%)
    }

    // Generate the processed image buffer
    const buffer = await image.toBuffer();

    // Step 5: Log image size after all transformations (optional)
    const { size, width: imageWidth, height: imageHeight } = await sharp(buffer).metadata();
    console.log(`Image size: ${size} bytes, Width: ${imageWidth}px, Height: ${imageHeight}px`);

    return buffer;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Image processing failed');
  }
}
