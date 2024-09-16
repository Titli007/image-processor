import React, { useContext, useEffect, useCallback } from 'react';
import { ImageContext } from './ImageContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const ImageControls: React.FC = () => {
  const {
    brightness,
    saturation,
    contrast, 
    rotation,
    blur,
    tint,
    flop,
    flip,
    grayscale,
    sharpen,
    threshold,
    crop,
    width,
    height,
    image,
    filePath,
    setImage,
    setBrightness,
    setSaturation,
    setContrast, // New setter for contrast
    setRotation,
    setBlur,
    setTint,
    setFlop,
    setFlip,
    setGrayscale,
    setSharpen,
    setThreshold,
    setCrop,
    setWidth,
    setHeight,
  } = useContext(ImageContext);

  useEffect(() => {
    socket.on('image_processed', (processedImage: string) => {
      setImage(processedImage);
    });

    return () => {
      socket.off('image_processed');
    };
  }, []);

  const debounce = (func: Function, delay: number) => {
    let debounceTimer: number; // Change to number
    return function (...args: any) {
        clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(() => func(...args), delay); // Use window.setTimeout explicitly
    };
};

  const emitChanges = useCallback(
    debounce(() => {
      if (!filePath) return;

      socket.emit('process_image', {
        filePath,
        brightness,
        saturation,
        contrast, // Send contrast value
        rotation,
        blur,
        tint,
        flop,
        flip,
        grayscale,
        sharpen,
        threshold,
        crop,
        format: 'jpeg',
      });
    }, 300),
    [brightness, saturation, contrast, rotation, blur, tint, flop, flip, grayscale, sharpen, threshold, crop, width, height, filePath]
  );

  useEffect(() => {
    emitChanges();
  }, [brightness, saturation, contrast, rotation, blur, tint, flop, flip, grayscale, sharpen, threshold, crop, width, height, emitChanges]);

  const handleDownload = (format: 'jpeg' | 'png') => {
    if (!image) return;

    // Convert the data URL to a Blob
    fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `edited-image.${format}`;
        link.click();
      });
  };

  return (
    <div className="flex w-full shadow-lg shadow-black">
      {/* Settings Panel */}
      <div className="p-4 h-full overflow-y-auto w-full">
        <h2 className="text-2xl border-b-2 border-black font-bold mb-4">Adjust Image Settings</h2>
        <div className="flex flex-col space-y-4">
          {/* Existing controls */}
          <div>
            <label className="block font-medium">Brightness ({brightness})</label>
            <input type="range" min="0" max="2" step="0.1" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Saturation ({saturation})</label>
            <input type="range" min="0" max="2" step="0.1" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Contrast ({contrast})</label>
            <input type="range" min="0" max="2" step="0.1" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Rotation ({rotation}°)</label>
            <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full" />
          </div>

          {/* New controls */}
          <div>
            <label className="block font-medium">Blur ({blur})</label>
            <input type="range" min="0" max="10" step="0.1" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Tint Color</label>
            <input type="color" value={tint} onChange={(e) => setTint(e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Flip Horizontal</label>
            <input type="checkbox" checked={flop} onChange={(e) => setFlop(e.target.checked)} />
          </div>
          <div>
            <label className="block font-medium">Flip Vertical</label>
            <input type="checkbox" checked={flip} onChange={(e) => setFlip(e.target.checked)} />
          </div>
          <div>
            <label className="block font-medium">Grayscale</label>
            <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} />
          </div>
          <div>
            <label className="block font-medium">Sharpen ({sharpen})</label>
            <input type="range" min="0" max="5" step="0.1" value={sharpen} onChange={(e) => setSharpen(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Threshold ({threshold})</label>
            <input
            type="range"
            min="0"
            max="255"
            step="1"
            value={threshold ?? 0} // Use 0 as a fallback value if threshold is null
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full"
          />

          </div>
          {/* <div>
            <label className="block font-medium">Crop (left, top, width, height)</label>
            <div className="flex space-x-2">
              <input type="number" placeholder="Left" onChange={(e) => setCrop({...crop, left: Number(e.target.value)})} />
              <input type="number" placeholder="Top" onChange={(e) => setCrop({...crop, top: Number(e.target.value)})} />
              <input type="number" placeholder="Width" onChange={(e) => setCrop({...crop, width: Number(e.target.value)})} />
              <input type="number" placeholder="Height" onChange={(e) => setCrop({...crop, height: Number(e.target.value)})} />
            </div>
          </div>
          <div>
            <label className="block font-medium">Width ({width})</label>
            <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block font-medium">Height ({height})</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full" />
          </div> */}
        </div>
      </div>

      {/* Image View and Download Button */}
      {/* <div className="flex flex-col items-center justify-center w-2/3 p-4">
        <div className="mb-4">
          <button onClick={() => handleDownload('jpeg')} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Download JPG</button>
          <button onClick={() => handleDownload('png')} className="bg-green-500 text-white px-4 py-2 rounded">Download PNG</button>
        </div>
        <div className="border border-gray-300 rounded-lg shadow-md">
          {!image &&
            <p className="text-gray-600">No image uploaded</p>
          } 
        </div>
      </div> */}
    </div>
  );
};

export default ImageControls;
