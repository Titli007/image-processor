import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import imageRoutes from './routes/image';
import cors from "cors"
import sharp from 'sharp';
import path from 'path';
import { processImage } from '../image_process';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use('/api/image', imageRoutes);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('process_image', async (data) => {
    try {
      // Handle image processing using Sharp here
      // Replace with actual image processing logic
      const processedImageBuffer = await processImage(data);
      const base64Image = processedImageBuffer.toString('base64');
      
      // Emit the processed image back to the client
      socket.emit('image_processed', `data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      socket.emit('error', 'Error processing image');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

