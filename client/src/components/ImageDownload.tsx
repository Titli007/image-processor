import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

const ImageDownload: React.FC = () => {
  const { image } = useContext(ImageContext);

  const handleDownload = (type : string) => {
    // Logic to download the image
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
