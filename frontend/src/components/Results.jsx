import React from 'react';

function Results({ original, formalized, onReset }) {
  return (
    <div className="results-section">
      <h2>✨ Your Formalized Pitch</h2>
      
      <div className="result-card">
        <h3>Original Pitch:</h3>
        <div className="pitch-content">{original}</div>
      </div>

      <div className="result-card formalized">
        <h3>Formalized Pitch:</h3>
        <div className="pitch-content">{formalized}</div>
      </div>

      <button onClick={onReset} className="reset-btn">
        Create Another Pitch
      </button>
    </div>
  );
}

export default Results;
