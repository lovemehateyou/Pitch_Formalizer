# 🎯 Pitch Formalizer - MERN Stack Version

A powerful web platform that helps entrepreneurs and presenters formalize their pitches to make them more professional, compelling, and investor-ready. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and powered by Google Gemini AI.

## ✨ Features

- **Text Input**: Enter your pitch directly through a user-friendly text interface
- **Audio Recording**: Record your pitch directly in the browser using Web Speech API
- **Multi-language Support**: Full support for both English and Amharic (አማርኛ) languages
- **AI-Powered Formalization**: Uses Google Gemini AI to analyze and improve your pitch
- **Professional Feedback**: Get detailed suggestions on how to improve your pitch delivery
- **Beautiful UI**: Clean, modern, and responsive React interface that works on all devices

## 🏗️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Generative AI** - Gemini AI for pitch formalization
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Web Speech API** - Browser-based speech recognition
- **CSS3** - Modern styling with gradients and animations

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Google Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- Modern web browser (Chrome or Edge recommended for speech recognition)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lovemehateyou/Pitch_Formalizer.git
   cd Pitch_Formalizer
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Copy environment variables
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   Backend will run on http://localhost:5000

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:3000

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 API Endpoints

### Health Check
```
GET /health
```
Returns the API status

### Formalize Text Pitch
```
POST /api/formalize
Content-Type: application/json

{
  "pitch_text": "Your pitch text here",
  "language": "en" // or "am" for Amharic
}
```

### Formalize Audio Pitch (Not Implemented)
```
POST /api/formalize-audio
Content-Type: multipart/form-data

audio: <file>
language: "en"
```
**Note**: Server-side audio transcription is not implemented. The frontend uses browser-based Web Speech API for speech recognition.

## 📱 Usage

### Method 1: Text Input

1. Select your language (English or አማርኛ)
2. Click on the "📝 Text Input" tab
3. Type or paste your pitch in the text area
4. Click "Formalize My Pitch"
5. View your formalized pitch with improvement suggestions

### Method 2: Audio Recording

1. Select your language (English or አማርኛ)
2. Click on the "🎤 Audio Recording" tab
3. Click "Start Recording" and speak your pitch
4. Click "Stop Recording" when done
5. Review the transcribed text
6. Click "Process Transcription" to formalize
7. View your transcribed and formalized pitch

## 🌍 Language Support

### English
- Natural language processing
- Professional business terminology
- Investor-focused improvements

### Amharic (አማርኛ)
- Native Amharic text input and output
- Amharic speech recognition (browser-based)
- Culturally appropriate formalization
- Professional Amharic business language

## 📁 Project Structure

```
Pitch_Formalizer/
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment template
│   └── uploads/            # Temporary upload directory
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── TextInput.jsx
│   │   │   ├── AudioInput.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── App.jsx         # Main App component
│   │   ├── App.css         # App styles
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
├── .gitignore
└── README-MERN.md
```

## 🔒 Security Notes

- Never commit your `.env` file with real API keys
- API keys are stored in environment variables
- CORS is configured for cross-origin requests
- File upload limits are set to 16MB
- Uploaded files are automatically cleaned up

## 🎨 Browser Compatibility

For the best experience with speech recognition, use:
- **Google Chrome** (recommended)
- **Microsoft Edge**
- **Safari** (limited support)
- **Firefox** (limited support)

**Note**: The Web Speech API is required for audio recording features.

## 🐛 Troubleshooting

### "Speech recognition not supported"
- Use Chrome or Edge browser
- Ensure microphone permissions are granted
- Check that you're using HTTPS (or localhost)

### "API Error" or "Network Error"
- Verify backend server is running on port 5000
- Check your Gemini API key is correct in `.env`
- Ensure your internet connection is working

### Port already in use
- Backend: Change PORT in `.env` file
- Frontend: Change port in `vite.config.js`

## 🚧 Known Limitations

1. **Server-side Audio Transcription**: Not implemented. The application uses browser-based Web Speech API instead, which:
   - Works entirely in the browser
   - Doesn't require additional API credentials
   - Supports multiple languages including Amharic
   - Has good accuracy for clear speech

2. **Database**: This version doesn't use MongoDB as the application is stateless. All processing is done in real-time without data persistence.

## 🔄 Migration from Flask

This MERN stack version maintains feature parity with the original Flask application:

- ✅ Text pitch formalization
- ✅ Audio recording with speech recognition
- ✅ Amharic language support
- ✅ Gemini AI integration
- ✅ Modern responsive UI
- ✅ Same styling and user experience

**Key differences**:
- Frontend is now a proper React SPA (Single Page Application)
- Backend is Node.js/Express instead of Python/Flask
- Speech recognition uses Web Speech API (browser-based) instead of Python's SpeechRecognition
- No server-side audio file processing (client-side is more efficient)

## 💡 Tips for Best Results

1. **Be Clear**: Speak or write clearly when inputting your pitch
2. **Be Specific**: Include key details about your business, product, or service
3. **Include Numbers**: Mention metrics, market size, or financial projections
4. **State the Problem**: Clearly identify the problem you're solving
5. **Mention Your Solution**: Explain how your product/service solves the problem
6. **Highlight Uniqueness**: What makes you different from competitors?

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- React community for the excellent framework
- All contributors and users of this platform

---

**Made with ❤️ for entrepreneurs and innovators worldwide**
