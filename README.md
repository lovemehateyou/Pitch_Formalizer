# 🎯 Pitch Formalizer

A powerful web platform that helps entrepreneurs and presenters formalize their pitches to make them more professional, compelling, and investor-ready. Built with AI and supporting both English and Amharic languages.

## 🌟 Available Versions

This repository contains **two implementations** of the same application:

### 1. **MERN Stack Version** (Recommended) 🆕
- **Backend**: Node.js + Express.js
- **Frontend**: React with Vite
- **AI**: Google Gemini AI
- **Speech**: Web Speech API (browser-based)
- 📖 **[Read MERN Documentation](./README-MERN.md)**

### 2. **Flask/Python Version** (Legacy)
- **Backend**: Python + Flask
- **Frontend**: HTML + Vanilla JavaScript
- **AI**: Google Gemini AI
- **Speech**: Python SpeechRecognition library
- 📖 **[Read Flask Documentation](./README-FLASK.md)**

## ✨ Features (Both Versions)

- **Text Input**: Enter your pitch directly through a user-friendly text interface
- **Audio Recording**: Record your pitch directly in the browser
- **Multi-language Support**: Full support for both English and Amharic (አማርኛ) languages
- **AI-Powered Formalization**: Uses Google Gemini AI to analyze and improve your pitch
- **Professional Feedback**: Get detailed suggestions on how to improve your pitch delivery
- **Beautiful UI**: Clean, modern, and responsive interface that works on all devices

## 🚀 Quick Start

### MERN Stack Version

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm start

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

### Flask Version

```bash
# Setup
pip install -r requirements.txt
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# Run
python app.py
```

Visit http://localhost:5000

## 🎯 Which Version Should I Use?

| Feature | MERN Stack | Flask |
|---------|-----------|-------|
| Modern React UI | ✅ | ❌ |
| Single Page App | ✅ | ❌ |
| Browser-based Speech | ✅ | ❌ |
| Server-side Speech | ❌ | ✅ |
| Easy Deployment | ✅ | ✅ |
| Learning React | ✅ | ❌ |
| Learning Python | ❌ | ✅ |

**Recommendation**: Use the **MERN Stack version** for:
- Modern web development practices
- Better user experience with React
- Easier frontend development
- More scalable architecture

Use the **Flask version** if:
- You prefer Python
- You need server-side audio processing
- You're more comfortable with traditional server-rendered apps

## 📖 Documentation

- **[MERN Stack Guide](./README-MERN.md)** - Complete guide for Node.js/React version
- **[Flask Guide](./README-FLASK.md)** - Complete guide for Python/Flask version
- **[Quick Start Guide](./QUICKSTART.md)** - Quick setup for Flask version
- **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)** - Technical details

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## 🌍 Language Support

### English
- Natural language processing
- Professional business terminology
- Investor-focused improvements

### Amharic (አማርኛ)
- Native Amharic text input and output
- Amharic speech recognition
- Culturally appropriate formalization
- Professional Amharic business language

## 💡 Usage

1. **Select your language** (English or አማርኛ)
2. **Choose input method**:
   - Type your pitch in the text box, OR
   - Record your pitch using the microphone
3. **Click "Formalize"** to process
4. **Review results** - See your original pitch vs. the formalized version
5. **Get feedback** - Receive suggestions for improvement

## 🛠️ Technology Stack

### MERN Version
- **MongoDB** - (Not used, stateless app)
- **Express.js** - Backend framework
- **React** - Frontend library
- **Node.js** - Runtime environment
- **Google Gemini AI** - AI formalization
- **Vite** - Build tool
- **Web Speech API** - Speech recognition

### Flask Version
- **Flask** - Web framework
- **Python** - Programming language
- **Google Gemini AI** - AI formalization
- **SpeechRecognition** - Audio transcription
- **HTML/CSS/JS** - Frontend

## 🎨 Screenshots

*(Screenshots would go here showing the UI)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request for either version.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- Flask and React communities for excellent frameworks
- All contributors and users of this platform

---

**Made with ❤️ for entrepreneurs and innovators worldwide**
