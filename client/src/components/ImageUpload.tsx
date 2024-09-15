import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

const ImageUpload: React.FC = () => {
  const { setImage, setFilePath } = useContext(ImageContext);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
  
      try {
        const response = await fetch('http://localhost:5000/api/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (data.filePath) {
          setFilePath(data.filePath); // Store the file path for processing

          // Directly set the uploaded image for immediate display
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result as string); // Set the image preview
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
};

export default ImageUpload;
