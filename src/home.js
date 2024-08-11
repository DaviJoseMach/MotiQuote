import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuote } from './quoteService';
import './App.css';

const Home = () => {
  const [quote, setQuote] = useState('');
  const [copied, setCopied] = useState(false);

  const getQuote = async () => {
    try {
      const quoteData = await fetchQuote();
      const newQuote = quoteData.text + ' - ' + (quoteData.author || 'Random');
      setQuote(newQuote);
      setCopied(false);
    } catch (error) {
      setQuote('Não foi possível carregar a citação.');
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = () => {
    const tweetText = encodeURIComponent(`✨ Aqui está uma citação inspiradora para iluminar seu dia: "${quote}" 🌟 Veja mais em:`);  
    const tweetUrl = encodeURIComponent("https://motiquote.vercel.app/");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
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
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i> 
              <span> {copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button className="copy-btn" onClick={share}>
              <i className="fa-solid fa-share-nodes"></i> 
              <span> Share</span>
          </button>

        </div>
        <a className="button-icon-w" href="https://www.pixme.bio/davvzin">
          <i className="fa-solid fa-mug-hot icon-b"></i>
          <span className="button-text">Buy me a drink</span>
        </a>
      </div>
    </div>
  );
};

export default Home;
