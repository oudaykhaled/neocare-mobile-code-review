import React from 'react';
import './Dashboard.css';

const Dashboard = ({ documents, onDocumentSelect }) => {
  const criticalIssues = documents.filter(doc => doc.severity === 'critical');
  const highIssues = documents.filter(doc => doc.severity === 'high');
  
  const overallStats = {
    totalIssues: documents.length,
    criticalCount: criticalIssues.length,
    highCount: highIssues.length,
    averageScore: documents.reduce((sum, doc) => sum + (doc.score || 0), 0) / documents.length,
    productionReady: false
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '📄';
    }
  };

  const getScoreColor = (score) => {
    if (score <= 3) return 'critical';
    if (score <= 6) return 'warning';
    return 'good';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🏥 NEOCARE Code Review Dashboard</h1>
          <p className="subtitle">Production Readiness Analysis - Healthcare Mobile Application</p>
          <div className="project-info">
            <span><strong>Version:</strong> 1.2.0</span>
            <span><strong>Review Date:</strong> October 6, 2025</span>
            <span><strong>Technology:</strong> React Native + Expo</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card overall-score">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Overall Score</h3>
            <div className={`stat-value score-${getScoreColor(overallStats.averageScore)}`}>
              {overallStats.averageScore.toFixed(1)}/10
            </div>
            <p className="stat-description">Production Readiness</p>
          </div>
        </div>

        <div className="stat-card production-status">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Production Status</h3>
            <div className="stat-value status-not-ready">
              NOT READY
            </div>
            <p className="stat-description">Critical issues must be fixed</p>
          </div>
        </div>

        <div className="stat-card critical-issues">
          <div className="stat-icon">🔴</div>
          <div className="stat-content">
            <h3>Critical Issues</h3>
            <div className="stat-value">{overallStats.criticalCount}</div>
            <p className="stat-description">Must fix immediately</p>
          </div>
        </div>

        <div className="stat-card high-issues">
          <div className="stat-icon">🟠</div>
          <div className="stat-content">
            <h3>High Priority</h3>
            <div className="stat-value">{overallStats.highCount}</div>
            <p className="stat-description">Fix within weeks</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="critical-section">
          <h2>🚨 Critical Issues Requiring Immediate Attention</h2>
          <p className="section-description">
            These issues prevent the application from being production-ready and must be addressed immediately.
          </p>
          
          <div className="issues-grid">
            {criticalIssues.map((doc) => (
              <div 
                key={doc.id} 
                className="issue-card critical"
                onClick={() => onDocumentSelect(doc)}
              >
                <div className="issue-header">
                  <span className="issue-icon">{getSeverityIcon(doc.severity)}</span>
                  <div className="issue-meta">
                    <span className="severity-badge severity-critical">CRITICAL</span>
                    <span className={`score-badge score-${getScoreColor(doc.score)}`}>
                      {doc.score}/10
                    </span>
                  </div>
                </div>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <div className="issue-footer">
                  <span className="click-hint">Click to view details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-section">
          <h2>📋 Analysis Summary</h2>
          
          <div className="summary-grid">
            <div className="summary-card">
              <h3>🔒 Security Issues</h3>
              <ul>
                <li>🔴 API keys exposed in repository</li>
                <li>🔴 Firebase configuration exposed</li>
                <li>🔴 No environment variable management</li>
                <li>🔴 Hardcoded credentials and URLs</li>
              </ul>
              <div className="action-required">
                <strong>Action:</strong> Rotate all keys, implement env vars immediately
              </div>
            </div>

            <div className="summary-card">
              <h3>💥 Error Handling</h3>
              <ul>
                <li>🔴 No error boundaries - app crashes completely</li>
                <li>🔴 No crash reporting (Sentry/Crashlytics)</li>
                <li>🔴 Poor API error handling</li>
                <li>🔴 No fallback UI for failures</li>
              </ul>
              <div className="action-required">
                <strong>Action:</strong> Implement error boundaries and crash reporting
              </div>
            </div>

            <div className="summary-card">
              <h3>🎨 Design System</h3>
              <ul>
                <li>🔴 No Material Design system</li>
                <li>🔴 Chaotic styling approach (5+ patterns)</li>
                <li>🔴 Extensive hardcoded values</li>
                <li>🔴 No design tokens or constants</li>
              </ul>
              <div className="action-required">
                <strong>Action:</strong> Implement React Native Paper, create constants
              </div>
            </div>

            <div className="summary-card">
              <h3>⚙️ Code Quality</h3>
              <ul>
                <li>🔴 Magic numbers everywhere (8, 12, 480, etc.)</li>
                <li>🔴 No enums for string literals</li>
                <li>🔴 Git merge conflicts in production files</li>
                <li>🟠 Outdated dependencies</li>
              </ul>
              <div className="action-required">
                <strong>Action:</strong> Create constants, enums, fix git practices
              </div>
            </div>
          </div>
        </div>

        <div className="priority-section">
          <h2>🎯 Priority Actions</h2>
          
          <div className="priority-grid">
            <div className="priority-item urgent">
              <div className="priority-marker">🚨</div>
              <div className="priority-content">
                <h3>IMMEDIATE - Critical</h3>
                <ul>
                  <li>Rotate all exposed API keys</li>
                  <li>Implement environment variables</li>
                  <li>Add error boundaries</li>
                  <li>Fix git merge conflicts</li>
                </ul>
                <span className="priority-status">Critical - Do not deploy until fixed</span>
              </div>
            </div>

            <div className="priority-item high">
              <div className="priority-marker">🔧</div>
              <div className="priority-content">
                <h3>HIGH PRIORITY</h3>
                <ul>
                  <li>Install React Native Paper</li>
                  <li>Create constants and enums</li>
                  <li>Add crash reporting (Sentry)</li>
                  <li>Update dependencies</li>
                </ul>
                <span className="priority-status">High Priority</span>
              </div>
            </div>

            <div className="priority-item medium">
              <div className="priority-marker">🏗️</div>
              <div className="priority-content">
                <h3>MEDIUM PRIORITY</h3>
                <ul>
                  <li>Refactor to Material Design</li>
                  <li>Optimize performance</li>
                  <li>Add comprehensive documentation</li>
                  <li>Implement caching strategy</li>
                </ul>
                <span className="priority-status">Medium Priority</span>
              </div>
            </div>

            <div className="priority-item low">
              <div className="priority-marker">🚀</div>
              <div className="priority-content">
                <h3>FUTURE IMPROVEMENTS</h3>
                <ul>
                  <li>Add comprehensive testing</li>
                  <li>Implement CI/CD pipeline</li>
                  <li>Security audit</li>
                  <li>Performance optimization</li>
                </ul>
                <span className="priority-status">Future Improvements</span>
              </div>
            </div>
          </div>
        </div>

        <div className="documents-section">
          <h2>📚 All Analysis Documents</h2>
          <div className="documents-grid">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className={`document-card severity-${doc.severity}`}
                onClick={() => onDocumentSelect(doc)}
              >
                <div className="document-header">
                  <span className="document-icon">{getSeverityIcon(doc.severity)}</span>
                  <span className={`severity-badge severity-${doc.severity}`}>
                    {doc.severity.toUpperCase()}
                  </span>
                </div>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <div className="document-footer">
                  <span className={`score-badge score-${getScoreColor(doc.score)}`}>
                    {doc.score}/10
                  </span>
                  <span className="document-type">{doc.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
