// src/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Adicione esta linha
import { fetchQuote } from './quoteService';
import './App.css'; // Se houver um CSS separado para a Home

const Home = () => {
  const [quote, setQuote] = useState('');
  const [copied, setCopied] = useState(false);

  const getQuote = async () => {
    try {
      const quoteData = await fetchQuote();
      const newQuote = quoteData.text + ' - ' + (quoteData.author || 'Random');
      setQuote(newQuote);
      setCopied(false); // Reset the copied state when a new quote is generated
    } catch (error) {
      setQuote('Não foi possível carregar a citação.');
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true); // Set the copied state to true when the text is copied
    setTimeout(() => setCopied(false), 2000); // Optionally, reset the icon back after 2 seconds
  };

  return (
    <div className="Home">
      <div className="navbar">
        <a className="button-icon" href="https://github.com/DaviJoseMach/MotiQuote">
          <i className="fa-brands fa-github icon-b"></i>
        </a>
        <Link className="button-icon" to="/top-quotes">
          <i className="fa-solid fa-fire icon-b"></i>
        </Link>
      </div>
      <div className="content-wrapper">
        <header className="header">
          <h1><b>‎ Motivational </b>‎‎ Quote</h1>
          <button className="generate-btn" onClick={getQuote}>New Citation</button>
        </header>
        <div className="quote-card">
          <p>{quote}</p>
          <button className="copy-btn" onClick={copyToClipboard}>
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <a className="button-icon-w" href="https://x.com/davvzin">
  <i className="fa-solid fa-mug-hot icon-b"></i>
  <span className="button-text">Buy me a drink</span>
</a>
      </div>
    </div>
  );
}

export default Home;
