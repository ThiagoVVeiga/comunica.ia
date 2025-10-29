import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { SpeechProvider } from './contexts/SpeechContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Phrases from './pages/Phrases';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <SettingsProvider>
      <SpeechProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/phrases" element={<Phrases />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </SpeechProvider>
    </SettingsProvider>
  );
}

export default App;
