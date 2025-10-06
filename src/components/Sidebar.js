import React from 'react';
import './Sidebar.css';

const Sidebar = ({ documents, selectedDoc, onDocumentSelect }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return '🔴';
      case 'high':
        return '🟠';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '📄';
    }
  };

  const getScoreColor = (score) => {
    if (score <= 3) return 'score-critical';
    if (score <= 6) return 'score-warning';
    return 'score-good';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🏥 NEOCARE</h2>
        <p>Code Review Dashboard</p>
        <div className="overall-score">
          <span className="score-label">Overall Score</span>
          <span className="score-value score-critical">4.8/10</span>
          <span className="production-status">❌ NOT PRODUCTION READY</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div 
          className={`nav-item ${!selectedDoc ? 'active' : ''}`}
          onClick={() => onDocumentSelect({ id: '', title: 'Dashboard' })}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-title">Dashboard Overview</span>
        </div>

        <div className="nav-section">
          <h3>📋 Analysis Documents</h3>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`nav-item ${selectedDoc?.id === doc.id ? 'active' : ''}`}
              onClick={() => onDocumentSelect(doc)}
            >
              <span className="nav-icon">{getSeverityIcon(doc.severity)}</span>
              <div className="nav-content">
                <span className="nav-title">{doc.title}</span>
                <div className="nav-meta">
                  <span className={`severity-badge severity-${doc.severity}`}>
                    {doc.severity.toUpperCase()}
                  </span>
                  {doc.score && (
                    <span className={`score-badge ${getScoreColor(doc.score)}`}>
                      {doc.score}/10
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="legend">
          <h4>Severity Levels</h4>
          <div className="legend-item">
            <span>🔴</span> Critical - Must fix immediately
          </div>
          <div className="legend-item">
            <span>🟠</span> High - Fix within weeks
          </div>
          <div className="legend-item">
            <span>🟡</span> Medium/Low - Address over time
          </div>
        </div>
        <div className="review-info">
          <small>
            <strong>Review Date:</strong> October 6, 2025<br />
            <strong>Version:</strong> 1.2.0
          </small>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
