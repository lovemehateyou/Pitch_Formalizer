import React, { useState, useRef } from 'react';

function AudioInput({ onSubmit, language, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [transcribedText, setTranscribedText] = useState('');
  
  const recognitionRef = useRef(null);

  const startRecording = async () => {
    try {
      // Check if browser supports Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        alert('Your browser does not support speech recognition. Please try Chrome or Edge.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language === 'am' ? 'am-ET' : 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordingStatus('Recording in progress...');
        setTranscribedText('');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setTranscribedText(transcript.trim());
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setRecordingStatus('Error: ' + event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (transcribedText) {
          setRecordingStatus('Recording complete! Click "Process Transcription" to formalize.');
        } else {
          setRecordingStatus('Recording stopped.');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      alert('Could not access microphone: ' + error.message);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const processTranscription = () => {
    if (!transcribedText.trim()) {
      alert('No transcription available. Please record your pitch first.');
      return;
    }
    onSubmit(transcribedText);
  };

  return (
    <div className="tab-content">
      <div className="audio-section">
        <p className="instructions">
          Click the button below to record your pitch (browser-based speech recognition)
        </p>
        
        <div className="recording-controls">
          <button
            onClick={toggleRecording}
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            disabled={disabled}
          >
            {isRecording ? '⏹️ Stop Recording' : '🎤 Start Recording'}
          </button>
          <span className="recording-status">{recordingStatus}</span>
        </div>

        {transcribedText && (
          <div className="transcription-preview">
            <h4>Transcribed Text:</h4>
            <p>{transcribedText}</p>
            <button 
              onClick={processTranscription} 
              className="submit-btn"
              disabled={disabled}
            >
              Process Transcription
            </button>
          </div>
        )}

        <div className="file-upload">
          <p>Note: Audio file upload requires server-side implementation with Google Cloud Speech-to-Text API.</p>
          <p>For now, please use the browser-based recording feature above.</p>
        </div>
      </div>
    </div>
  );
}

export default AudioInput;
