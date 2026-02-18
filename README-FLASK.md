# 🎯 Pitch Formalizer - Flask/Python Version

A powerful web platform that helps entrepreneurs and presenters formalize their pitches to make them more professional, compelling, and investor-ready. Built with Flask and powered by Google Gemini AI.

## ✨ Features

- **Text Input**: Enter your pitch directly through a user-friendly text interface
- **Audio Recording**: Record your pitch directly in the browser using your microphone
- **Audio Upload**: Upload pre-recorded audio files for transcription and formalization
- **Multi-language Support**: Full support for both English and Amharic (አማርኛ) languages
- **AI-Powered Formalization**: Uses Google Gemini AI to analyze and improve your pitch
- **Professional Feedback**: Get detailed suggestions on how to improve your pitch delivery
- **Beautiful UI**: Clean, modern, and responsive interface that works on all devices

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- Google Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- Modern web browser with microphone access (for recording feature)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lovemehateyou/Pitch_Formalizer.git
   cd Pitch_Formalizer
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env and add your Gemini API key
   # GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5000`

## 📖 Usage

### Text Input Method

1. Select your language (English or Amharic)
2. Click on the "📝 Text Input" tab
3. Type or paste your pitch in the text area
4. Click "Formalize My Pitch"
5. View your formalized pitch with improvement suggestions

### Audio Recording Method

1. Select your language (English or Amharic)
2. Click on the "🎤 Audio Recording" tab
3. Click "Start Recording" and speak your pitch
4. Click "Stop Recording" when done
5. Click "Upload & Formalize" to process
6. View your transcribed and formalized pitch

### Audio Upload Method

1. Select your language (English or Amharic)
2. Click on the "🎤 Audio Recording" tab
3. Click "Choose File" and select your audio file
4. Supported formats: WAV, MP3, OGG, FLAC, M4A
5. Click "Upload & Formalize"
6. View your transcribed and formalized pitch

## 🌍 Language Support

### English
Full support for English pitch formalization with:
- Natural language processing
- Professional business terminology
- Investor-focused improvements

### Amharic (አማርኛ)
Native support for Amharic language including:
- Amharic text input and output
- Amharic speech recognition
- Culturally appropriate formalization
- Professional Amharic business language

## 🛠️ Technology Stack

- **Backend**: Flask (Python web framework)
- **AI Engine**: Google Gemini AI (gemini-pro model)
- **Speech Recognition**: Google Speech Recognition API
- **Frontend**: HTML5, CSS3, JavaScript
- **Audio Processing**: MediaRecorder API, SpeechRecognition library

## 📁 Project Structure

```
Pitch_Formalizer/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── README-FLASK.md       # This file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Styling
    └── js/
        └── script.js     # Frontend JavaScript
```

## 🔒 Security Notes

- Never commit your `.env` file with real API keys
- The `.env` file is already in `.gitignore`
- Keep your Gemini API key secure
- Audio files are automatically deleted after processing
- Maximum file upload size is 16MB

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- Flask community for the excellent web framework
- All contributors and users of this platform

## 💡 Tips for Best Results

1. **Be Clear**: Speak or write clearly when inputting your pitch
2. **Be Specific**: Include key details about your business, product, or service
3. **Include Numbers**: Mention metrics, market size, or financial projections
4. **State the Problem**: Clearly identify the problem you're solving
5. **Mention Your Solution**: Explain how your product/service solves the problem
6. **Highlight Uniqueness**: What makes you different from competitors?

## 🐛 Troubleshooting

### Microphone not working
- Check browser permissions for microphone access
- Try a different browser (Chrome/Edge recommended)
- Ensure no other application is using the microphone

### API errors
- Verify your Gemini API key is correct in `.env`
- Check your internet connection
- Ensure you haven't exceeded API rate limits

### Audio transcription issues
- Speak clearly and at a moderate pace
- Ensure minimal background noise
- Use a quality microphone for better results
- For Amharic, ensure proper pronunciation

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for entrepreneurs and innovators worldwide**
