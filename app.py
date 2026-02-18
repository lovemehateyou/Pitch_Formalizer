import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import speech_recognition as sr
from werkzeug.utils import secure_filename
import tempfile

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = tempfile.gettempdir()

# Allowed audio file extensions
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'flac', 'm4a'}

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def formalize_pitch(pitch_text, language='en'):
    """
    Use Gemini AI to formalize the pitch
    
    Args:
        pitch_text: The raw pitch text
        language: The language code ('en' for English, 'am' for Amharic)
    
    Returns:
        Formalized pitch text
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Create a prompt that handles both English and Amharic
        if language == 'am':
            prompt = f"""You are a professional pitch consultant. The following is a pitch in Amharic language. 
Please formalize and improve this pitch to make it more professional, compelling, and investor-ready.
Maintain the Amharic language in your response, but make it more formal and structured.

Original Pitch:
{pitch_text}

Please provide:
1. A formalized version of the pitch
2. Key improvements made
3. Suggestions for delivery

Keep your response in Amharic language."""
        else:
            prompt = f"""You are a professional pitch consultant. The following is a pitch from an entrepreneur.
Please formalize and improve this pitch to make it more professional, compelling, and investor-ready.

Original Pitch:
{pitch_text}

Please provide:
1. A formalized version of the pitch
2. Key improvements made
3. Suggestions for delivery"""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error formalizing pitch: {str(e)}"

def transcribe_audio(audio_file_path, language='en'):
    """
    Transcribe audio file to text
    
    Args:
        audio_file_path: Path to the audio file
        language: Language code for speech recognition
    
    Returns:
        tuple: (success: bool, result: str) where result is either transcribed text or error message
    """
    recognizer = sr.Recognizer()
    
    try:
        with sr.AudioFile(audio_file_path) as source:
            audio_data = recognizer.record(source)
            
            # Map language codes
            lang_code = 'am-ET' if language == 'am' else 'en-US'
            
            # Use Google Speech Recognition
            text = recognizer.recognize_google(audio_data, language=lang_code)
            return (True, text)
    except sr.UnknownValueError:
        return (False, "Could not understand the audio")
    except sr.RequestError as e:
        return (False, f"Could not request results; {e}")
    except Exception as e:
        return (False, f"Error transcribing audio: {str(e)}")

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/formalize', methods=['POST'])
def formalize():
    """Handle pitch formalization from text input"""
    try:
        data = request.get_json()
        pitch_text = data.get('pitch_text', '')
        language = data.get('language', 'en')
        
        if not pitch_text:
            return jsonify({'error': 'No pitch text provided'}), 400
        
        formalized = formalize_pitch(pitch_text, language)
        
        return jsonify({
            'original': pitch_text,
            'formalized': formalized,
            'language': language
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/formalize-audio', methods=['POST'])
def formalize_audio():
    """Handle pitch formalization from audio input"""
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        audio_file = request.files['audio']
        language = request.form.get('language', 'en')
        
        if audio_file.filename == '':
            return jsonify({'error': 'No audio file selected'}), 400
        
        if audio_file and allowed_file(audio_file.filename):
            filename = secure_filename(audio_file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            audio_file.save(filepath)
            
            # Transcribe audio
            success, result = transcribe_audio(filepath, language)
            
            # Clean up the file
            try:
                os.remove(filepath)
            except Exception as e:
                # Log the error but don't fail the request
                print(f"Warning: Could not remove temporary file {filepath}: {e}")
            
            if not success:
                return jsonify({'error': result}), 400
            
            # Formalize the transcribed text
            formalized = formalize_pitch(result, language)
            
            return jsonify({
                'original': result,
                'formalized': formalized,
                'language': language
            })
        else:
            return jsonify({'error': 'Invalid file type'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
