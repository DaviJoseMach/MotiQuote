// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home'; 
import TopQuotes from './TopQuotes';
import Daily from './daily';
import Footer from './footer';
import PtHome from './locales/home-pt';
import PtDaily from './locales/daily-pt';
import PtTop from './locales/TopQuotes-pt';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-quotes" element={<TopQuotes />} />
        <Route path="/daily" element={<Daily />} />

        {/* Add new language routes here */}
        <Route path="/pt-home" element={<PtHome />} />
        <Route path="/pt-daily" element={<PtDaily />} />
        <Route path="/pt-top" element={<PtTop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
