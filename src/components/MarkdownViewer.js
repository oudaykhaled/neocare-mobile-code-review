import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './MarkdownViewer.css';

const MarkdownViewer = ({ content, loading, document }) => {
  if (loading) {
    return (
      <div className="markdown-viewer loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading document...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="markdown-viewer empty">
        <div className="empty-state">
          <h2>📄 No Document Selected</h2>
          <p>Select a document from the sidebar to view its content.</p>
        </div>
      </div>
    );
  }

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    table({ children }) {
      return (
        <div className="table-container">
          <table>{children}</table>
        </div>
      );
    },
    // Custom renderer for severity indicators
    text({ children }) {
      const text = String(children);
      
      // Replace severity emojis with styled badges
      if (text.includes('🔴 CRITICAL') || text.includes('🔴 Critical')) {
        return <span className="severity-indicator severity-critical">🔴 CRITICAL</span>;
      }
      if (text.includes('🟠 HIGH') || text.includes('🟠 High')) {
        return <span className="severity-indicator severity-high">🟠 HIGH</span>;
      }
      if (text.includes('🟡 MEDIUM') || text.includes('🟡 Medium') || text.includes('🟡 Low')) {
        return <span className="severity-indicator severity-medium">🟡 MEDIUM</span>;
      }
      if (text.includes('🟢 LOW') || text.includes('🟢 Low')) {
        return <span className="severity-indicator severity-low">🟢 LOW</span>;
      }
      
      return children;
    }
  };

  return (
    <div className="markdown-viewer">
      {document && (
        <div className="document-header">
          <div className="document-info">
            <h1>{document.title}</h1>
            <div className="document-meta">
              <span className={`severity-badge severity-${document.severity}`}>
                {document.severity.toUpperCase()}
              </span>
              {document.score && (
                <span className="score-badge">
                  Score: {document.score}/10
                </span>
              )}
              <span className="document-type">
                {document.type}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
