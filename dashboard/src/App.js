import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MarkdownViewer from './components/MarkdownViewer';
import Dashboard from './components/Dashboard';
import { documents } from './data/documents';
import './App.css';

function App() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setSelectedDoc(null);
      setMarkdownContent('');
    } else {
      const docId = path.substring(1);
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        setSelectedDoc(doc);
        setMarkdownContent(doc.content || '# Error\n\nContent not found for this document.');
      }
    }
  }, [location]);

  const handleDocumentSelect = (doc) => {
    navigate(`/${doc.id}`);
  };

  return (
    <div className="app">
      <Sidebar 
        documents={documents}
        selectedDoc={selectedDoc}
        onDocumentSelect={handleDocumentSelect}
      />
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard documents={documents} onDocumentSelect={handleDocumentSelect} />} 
          />
          <Route 
            path="/:docId" 
            element={
              <MarkdownViewer 
                content={markdownContent} 
                loading={false}
                document={selectedDoc}
              />
            } 
          />
          <Route 
            path="*" 
            element={<Dashboard documents={documents} onDocumentSelect={handleDocumentSelect} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
