import React from 'react';

function LanguageSelector({ language, onChange }) {
  return (
    <div className="language-selector">
      <label htmlFor="language">Select Language:</label>
      <select 
        id="language" 
        value={language} 
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="en">English</option>
        <option value="am">አማርኛ (Amharic)</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
