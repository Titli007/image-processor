import React from 'react';
import ImageUpload from './components/ImageUpload';
import ImagePreview from './components/ImagePreview';
import ImageControls from './components/ImageControls';
import ImageDownload from './components/ImageDownload';
import { ImageProvider } from './components/ImageContext';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className='w-screen flex justify-around items-center my-6 border-b-2 shadow-md shadow-gray-400'>
          <h1 className="text-3xl font-bold mb-4">Image Processing App</h1>
          <ImageUpload />
          <ImageDownload />
        </div>
        <div className="w-full flex h-full mx-4">
          <ImageControls />
          <ImagePreview />
        </div>
      </div>
    </ImageProvider>
  );
};

export default App;
