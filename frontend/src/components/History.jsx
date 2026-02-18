import React from 'react';

function History({ items, loading, error, onRefresh, onUse, onDelete }) {
  return (
    <div className="history-section">
      <div className="history-header">
        <h3>Your Recent Pitches</h3>
        <button className="history-refresh-btn" onClick={onRefresh} disabled={loading}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="history-status">Loading history...</p>
      ) : error ? (
        <div className="history-error">{error}</div>
      ) : items.length === 0 ? (
        <p className="history-status">No history yet. Formalize a pitch to save it here.</p>
      ) : (
        <div className="history-list">
          {items.map((item) => (
            <div className="history-item" key={item._id}>
              <div className="history-item-meta">
                <span className="history-language">{item.language === 'am' ? 'Amharic' : 'English'}</span>
                <span className="history-date">{new Date(item.createdAt).toLocaleString()}</span>
              </div>

              <div className="history-preview">
                <strong>Original:</strong>
                <p>{item.pitchText}</p>
              </div>

              <div className="history-preview">
                <strong>Formalized:</strong>
                <p>{item.formalizedText}</p>
              </div>

              <div className="history-actions">
                <button className="history-use-btn" onClick={() => onUse(item)}>
                  Open Result
                </button>
                <button className="history-delete-btn" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
