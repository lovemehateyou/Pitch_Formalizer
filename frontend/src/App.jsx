import { useState } from 'react';
import './App.css';
import LanguageSelector from './components/LanguageSelector';
import TextInput from './components/TextInput';
import AudioInput from './components/AudioInput';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleFormalize = async (pitchText) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/formalize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pitch_text: pitchText,
          language: language
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || 'An error occurred while processing your pitch');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎯 Pitch Formalizer</h1>
          <p className="tagline">Transform your ideas into professional, investor-ready pitches</p>
        </header>

        <main className="main">
          {!results ? (
            <div className="input-section">
              <h2>Submit Your Pitch</h2>
              
              <LanguageSelector 
                language={language} 
                onChange={setLanguage} 
              />

              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
                  onClick={() => setActiveTab('text')}
                  data-tab="text"
                >
                  📝 Text Input
                </button>
                <button
                  className={`tab-button ${activeTab === 'audio' ? 'active' : ''}`}
                  onClick={() => setActiveTab('audio')}
                  data-tab="audio"
                >
                  🎤 Audio Recording
                </button>
              </div>

              {activeTab === 'text' ? (
                <TextInput 
                  onSubmit={handleFormalize}
                  disabled={loading}
                />
              ) : (
                <AudioInput 
                  onSubmit={handleFormalize}
                  language={language}
                  disabled={loading}
                />
              )}

              {loading && <LoadingSpinner />}
              {error && <ErrorMessage message={error} onClose={() => setError('')} />}
            </div>
          ) : (
            <Results 
              original={results.original}
              formalized={results.formalized}
              onReset={handleReset}
            />
          )}
        </main>

        <footer className="footer">
          <p>Powered by Google Gemini AI | Supporting English and Amharic languages</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
