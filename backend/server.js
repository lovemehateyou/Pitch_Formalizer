import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';

// ES Module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let isDatabaseReady = false;

const pitchHistorySchema = new mongoose.Schema(
  {
    pitchText: { type: String, required: true, trim: true },
    formalizedText: { type: String, required: true },
    language: { type: String, enum: ['en', 'am'], default: 'en' },
    inputType: { type: String, enum: ['text', 'audio'], default: 'text' }
  },
  {
    timestamps: true
  }
);

const PitchHistory = mongoose.model('PitchHistory', pitchHistorySchema);

async function connectDatabase() {
  if (!MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI is not set. History feature will be disabled until MongoDB Atlas URI is provided.');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isDatabaseReady = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    isDatabaseReady = false;
  }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB limit
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /wav|mp3|ogg|flac|m4a|webm/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype) || file.mimetype.startsWith('audio/');
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files are allowed.'));
    }
  }
});

/**
 * Formalize pitch using Gemini AI
 */
async function formalizePitch(pitchText, language = 'en') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    let prompt;
    if (language === 'am') {
      prompt = `You are a professional pitch consultant. The following is a pitch in Amharic language. 
Please formalize and improve this pitch to make it more professional, compelling, and investor-ready.
Maintain the Amharic language in your response, but make it more formal and structured.

Original Pitch:
${pitchText}

Please provide:
1. A formalized version of the pitch
2. Key improvements made
3. Suggestions for delivery

Keep your response in Amharic language.`;
    } else {
      prompt = `You are a professional pitch consultant. The following is a pitch from an entrepreneur.
Please formalize and improve this pitch to make it more professional, compelling, and investor-ready.

Original Pitch:
${pitchText}

Please provide:
1. A formalized version of the pitch
2. Key improvements made
3. Suggestions for delivery`;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error formalizing pitch:', error);
    throw new Error(`Error formalizing pitch: ${error.message}`);
  }
}

/**
 * Note: Server-side audio transcription is not implemented.
 * The frontend uses browser-based Web Speech API for speech recognition,
 * which is more efficient and doesn't require additional API credentials.
 */

// Routes

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pitch Formalizer API is running' });
});

/**
 * Formalize text pitch endpoint
 */
app.post('/api/formalize', async (req, res) => {
  try {
    const { pitch_text, language = 'en', input_type = 'text' } = req.body;
    
    if (!pitch_text) {
      return res.status(400).json({ error: 'No pitch text provided' });
    }
    
    const formalized = await formalizePitch(pitch_text, language);

    let historyId = null;
    if (isDatabaseReady) {
      const historyRecord = await PitchHistory.create({
        pitchText: pitch_text,
        formalizedText: formalized,
        language,
        inputType: input_type
      });
      historyId = historyRecord._id;
    }
    
    res.json({
      original: pitch_text,
      formalized: formalized,
      language: language,
      history_id: historyId
    });
  } catch (error) {
    console.error('Error in /api/formalize:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get formalization history
 */
app.get('/api/history', async (req, res) => {
  try {
    if (!isDatabaseReady) {
      return res.status(503).json({
        error: 'History feature is unavailable because MongoDB is not connected yet. Add MONGODB_URI and restart the backend.'
      });
    }

    const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10), 1), 100);
    const historyItems = await PitchHistory.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({ history: historyItems });
  } catch (error) {
    console.error('Error in /api/history:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete one history item
 */
app.delete('/api/history/:id', async (req, res) => {
  try {
    if (!isDatabaseReady) {
      return res.status(503).json({
        error: 'History feature is unavailable because MongoDB is not connected yet. Add MONGODB_URI and restart the backend.'
      });
    }

    const deleted = await PitchHistory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'History item not found' });
    }

    res.json({ message: 'History item deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/history/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Formalize audio pitch endpoint
 */
app.post('/api/formalize-audio', upload.single('audio'), async (req, res) => {
  let filePath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }
    
    filePath = req.file.path;
    const language = req.body.language || 'en';
    
    // Note: Browser-side speech recognition is preferred for this use case
    // as it doesn't require additional API credentials
    return res.status(501).json({ 
      error: 'Server-side audio transcription is not implemented. Please use browser-based speech recognition (Web Speech API) for audio transcription.',
      suggestion: 'The frontend should handle audio recording and transcription using the browser\'s built-in Web Speech API, then send the transcribed text to /api/formalize endpoint.'
    });
    
  } catch (error) {
    console.error('Error in /api/formalize-audio:', error);
    res.status(500).json({ error: error.message });
  } finally {
    // Clean up uploaded file
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API Health Check: http://localhost:${PORT}/health`);
  connectDatabase();
});

export default app;
