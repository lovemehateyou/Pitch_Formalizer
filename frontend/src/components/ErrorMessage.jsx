import React from 'react';

function ErrorMessage({ message, onClose }) {
  return (
    <div className="error-message">
      {message}
      {onClose && (
        <button onClick={onClose} className="error-close">×</button>
      )}
    </div>
  );
}

export default ErrorMessage;
