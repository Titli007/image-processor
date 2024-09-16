import React, { createContext, useState, ReactNode } from 'react';

interface Crop {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface ImageContextType {
  image: string | null;
  filePath: string | null;
  brightness: number;
  saturation: number;
  contrast: number; // New state for contrast
  rotation: number;
  blur: number;
  tint: string | null;
  flop: boolean;
  flip: boolean;
  grayscale: boolean;
  sharpen: number;
  threshold: number | null;
  crop: Crop | null;
  width: number | null;
  height: number | null;
  setImage: (image: string | null) => void;
  setFilePath: (path: string | null) => void;
  setBrightness: (value: number) => void;
  setSaturation: (value: number) => void;
  setContrast: (value: number) => void; // New setter for contrast
  setRotation: (value: number) => void;
  setBlur: (value: number) => void;
  setTint: (value: string) => void;
  setFlop: (value: boolean) => void;
  setFlip: (value: boolean) => void;
  setGrayscale: (value: boolean) => void;
  setSharpen: (value: number) => void;
  setThreshold: (value: number | null) => void;
  setCrop: (value: Crop | null) => void;
  setWidth: (value: number | null) => void;
  setHeight: (value: number | null) => void;
}

export const ImageContext = createContext<ImageContextType>({} as ImageContextType);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(1);
  const [saturation, setSaturation] = useState<number>(1);
  const [contrast, setContrast] = useState<number>(1); // New state for contrast
  const [rotation, setRotation] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);
  const [tint, setTint] = useState<string>(null);; // Default to white tint
  const [flop, setFlop] = useState<boolean>(false);
  const [flip, setFlip] = useState<boolean>(false);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [sharpen, setSharpen] = useState<number>(0);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  return (
    <ImageContext.Provider
      value={{
        image,
        filePath,
        brightness,
        saturation,
        contrast, // Include contrast in context
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
        setImage,
        setFilePath,
        setBrightness,
        setSaturation,
        setContrast, // Include setContrast in context
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
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
