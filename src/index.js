import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/tailwind.css'
import App from './App';
import { FirebaseProvider } from './context/FirebaseContext';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <Router>
        <AuthProvider>
          <ChatProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ChatProvider>
          </AuthProvider>
        </Router>
    </FirebaseProvider>
  </React.StrictMode>
);


