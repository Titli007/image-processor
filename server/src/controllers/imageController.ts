import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log("Image upload handler called");

  // Define the path for the uploads directory
  const uploadsDir = path.join(__dirname, '../uploads');

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Define the path for the uploaded file
  const uploadPath = path.join(uploadsDir, req.file.filename);

  // Move the file to the uploads directory
  fs.rename(req.file.path, uploadPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error saving the file' });
    }
    
    // Return the file path to the client
    res.status(200).json({ filePath: uploadPath });
  });
};
