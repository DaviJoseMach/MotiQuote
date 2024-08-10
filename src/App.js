// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home'; 
import TopQuotes from './TopQuotes';
import Footer from './footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-quotes" element={<TopQuotes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
