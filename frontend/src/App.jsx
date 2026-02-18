import { useEffect, useState } from 'react';
import './App.css';
import LanguageSelector from './components/LanguageSelector';
import TextInput from './components/TextInput';
import AudioInput from './components/AudioInput';
import History from './components/History';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');

    try {
      const response = await fetch('/api/history');
      const data = await response.json();

      if (!response.ok) {
        setHistoryError(data.error || 'Failed to load history');
        setHistory([]);
        return;
      }

      setHistory(data.history || []);
    } catch (err) {
      setHistoryError('Network error: ' + err.message);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleFormalize = async (pitchText, inputType = 'text') => {
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
          language: language,
          input_type: inputType
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        if (activeTab === 'history') {
          fetchHistory();
        }
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

  const handleUseHistoryItem = (item) => {
    setResults({
      original: item.pitchText,
      formalized: item.formalizedText,
      language: item.language,
      history_id: item._id
    });
    setError('');
  };

  const handleDeleteHistoryItem = async (historyId) => {
    try {
      const response = await fetch(`/api/history/${historyId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (!response.ok) {
        setHistoryError(data.error || 'Failed to delete history item');
        return;
      }

      setHistory((prevHistory) => prevHistory.filter((item) => item._id !== historyId));
    } catch (err) {
      setHistoryError('Network error: ' + err.message);
    }
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
                <button
                  className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                  data-tab="history"
                >
                  📚 History
                </button>
              </div>

              {activeTab === 'text' ? (
                <TextInput 
                  onSubmit={(text) => handleFormalize(text, 'text')}
                  disabled={loading}
                />
              ) : activeTab === 'audio' ? (
                <AudioInput 
                  onSubmit={(text) => handleFormalize(text, 'audio')}
                  language={language}
                  disabled={loading}
                />
              ) : (
                <History
                  items={history}
                  loading={historyLoading}
                  error={historyError}
                  onRefresh={fetchHistory}
                  onUse={handleUseHistoryItem}
                  onDelete={handleDeleteHistoryItem}
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
