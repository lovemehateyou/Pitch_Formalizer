import React, { useState } from 'react';

function TextInput({ onSubmit, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) {
      alert('Please enter your pitch text');
      return;
    }
    onSubmit(text);
  };

  return (
    <div className="tab-content active">
      <textarea
        id="pitch-text"
        placeholder="Enter your pitch here... Tell us about your idea, product, or service."
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button 
        onClick={handleSubmit} 
        className="submit-btn"
        disabled={disabled}
      >
        Formalize My Pitch
      </button>
    </div>
  );
}

export default TextInput;
