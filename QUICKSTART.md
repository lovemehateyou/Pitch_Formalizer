# Quick Start Guide - Pitch Formalizer

## What is Pitch Formalizer?

Pitch Formalizer is a web application that helps entrepreneurs and presenters transform their informal pitches into professional, investor-ready presentations. It uses Google's Gemini AI to analyze and improve your pitch, supporting both text and audio input in English and Amharic languages.

## Features at a Glance

✅ **Text Input** - Type or paste your pitch directly  
✅ **Audio Recording** - Record your pitch using your device's microphone  
✅ **Audio Upload** - Upload pre-recorded audio files  
✅ **Amharic Support** - Full support for Amharic language (አማርኛ)  
✅ **AI-Powered** - Uses Google Gemini AI for professional formalization  
✅ **Instant Results** - Get immediate feedback and improved versions  

## Installation

### Quick Install (Recommended)

**On Linux/Mac:**
```bash
./setup.sh
```

**On Windows:**
```batch
setup.bat
```

### Manual Install

1. **Install Python 3.8+** (if not already installed)

2. **Clone the repository:**
   ```bash
   git clone https://github.com/lovemehateyou/Pitch_Formalizer.git
   cd Pitch_Formalizer
   ```

3. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

4. **Activate virtual environment:**
   - Linux/Mac: `source venv/bin/activate`
   - Windows: `venv\Scripts\activate`

5. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

6. **Setup API Key:**
   - Copy `.env.example` to `.env`
   - Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add the key to `.env` file:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

## Running the Application

1. **Activate virtual environment** (if not already activated)

2. **Start the server:**
   ```bash
   python app.py
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5000`

4. **Start using the app!**

## How to Use

### Method 1: Text Input

1. Select your language (English or አማርኛ)
2. Click the "📝 Text Input" tab
3. Type or paste your pitch
4. Click "Formalize My Pitch"
5. Review your formalized pitch

### Method 2: Audio Recording

1. Select your language
2. Click the "🎤 Audio Recording" tab
3. Click "Start Recording"
4. Speak your pitch clearly
5. Click "Stop Recording"
6. Click "Upload & Formalize"
7. Review your transcribed and formalized pitch

### Method 3: Audio Upload

1. Select your language
2. Click the "🎤 Audio Recording" tab
3. Click "Choose File" and select your audio file
4. Click "Upload & Formalize"
5. Review your transcribed and formalized pitch

## Supported Audio Formats

- WAV (.wav)
- MP3 (.mp3)
- OGG (.ogg)
- FLAC (.flac)
- M4A (.m4a)

## Tips for Best Results

### For Text Input:
- Be specific about your business or idea
- Include key metrics or numbers
- Mention the problem you're solving
- Explain your unique value proposition

### For Audio Input:
- Speak clearly and at a moderate pace
- Use a quiet environment
- Ensure your microphone is working properly
- For Amharic, ensure proper pronunciation

## Troubleshooting

### "Could not understand the audio"
- **Solution**: Speak more clearly, reduce background noise, or try a different microphone

### "Error formalizing pitch"
- **Solution**: Check your internet connection and verify your API key is correct in the `.env` file

### Microphone not working
- **Solution**: Check browser permissions, try a different browser (Chrome recommended), ensure no other app is using the microphone

### API rate limit exceeded
- **Solution**: Wait a few minutes before trying again, or check your API usage limits

## Browser Requirements

For the best experience, use:
- **Google Chrome** (recommended)
- **Microsoft Edge**
- **Firefox**
- **Safari**

**Note**: Microphone access is required for audio recording feature.

## Security & Privacy

- Your audio files are automatically deleted after processing
- API keys are stored securely in `.env` file (never commit this file)
- Maximum upload size: 16MB
- No data is stored permanently on the server

## Getting Help

If you encounter any issues:
1. Check this guide first
2. Review the main README.md file
3. Open an issue on GitHub
4. Contact the repository maintainer

## Next Steps

After your pitch is formalized:
1. Review the suggestions provided
2. Practice delivering the formalized version
3. Iterate and refine as needed
4. Use it to create another pitch!

---

**Ready to transform your pitch? Let's get started! 🚀**
