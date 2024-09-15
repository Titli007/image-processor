import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

const ImagePreview: React.FC = () => {
  const { image } = useContext(ImageContext);

  return (
    <div className='w-full flex justify-center items-start'>
        <div className="mb-4 mt-10 w-96 h-96">
        {image ? (
            <img src={image} alt="Preview" className="max-w-full h-auto border border-gray-300 rounded-lg shadow-md" />
        ) : (
            <p className="text-gray-600">No image uploaded</p>
        )}
        </div>

    </div>
  );
};

export default ImagePreview;
