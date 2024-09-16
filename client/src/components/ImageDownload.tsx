import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

const ImageDownload: React.FC = () => {
  const { image } = useContext(ImageContext);

  const handleDownload = (type: 'jpeg' | 'png') => {
    if (!image) return;

    // Convert the base64/URL to a Blob
    fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `edited-image.${type}`;
        link.click();

        // Clean up URL.createObjectURL to avoid memory leaks
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div>
      {image && (
        <>
          <button onClick={() => handleDownload('jpeg')} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Download JPG</button>
          <button onClick={() => handleDownload('png')} className="bg-green-500 text-white px-4 py-2 rounded">Download PNG</button>
        </>
      )}
    </div>
  );
};

export default ImageDownload;
