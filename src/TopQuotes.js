import React, { useState, useEffect } from 'react';
import { fetchQuote } from './quoteService'; 
import { Link } from 'react-router-dom'; 
import './TopQuotes.css'; 

const TopQuotes = () => {
  const [topQuotes, setTopQuotes] = useState([]);
  const [copied, setCopied] = useState(null);

  const getTopQuotes = async () => {
    const quotesArray = [];
    try {
      for (let i = 0; i < 5; i++) {
        const quoteData = await fetchQuote();
        const quote = quoteData.text + ' - ' + (quoteData.author || 'Random');
        quotesArray.push(quote);
      }
      setTopQuotes(quotesArray);
    } catch (error) {
      console.error('Não foi possível carregar as citações.', error);
    }
  };

  useEffect(() => {
    getTopQuotes();
  }, []);

  const copyToClipboard = (quote) => {
    navigator.clipboard.writeText(quote);
    setCopied(quote);
    setTimeout(() => setCopied(null), 2000);
  };

  const share = (quote) => {
    const tweetText = encodeURIComponent(`✨ Aqui está uma citação inspiradora para iluminar seu dia: "${quote}" 🌟 Veja mais em:`);
    const tweetUrl = encodeURIComponent("https://motiquote.vercel.app/");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="top-quotes">
      <div className="navbar">
        <a className="button-icon" href="https://github.com/DaviJoseMach/MotiQuote">
          <i className="fa-brands fa-github icon-b"></i>
        </a>
        <Link className="button-icon" to="/">
          <i className="fa-solid fa-backward icon-b"></i>
        </Link>
      </div>
      <br></br><br></br><br></br>
      <h1> <b>‎ Top 5 ‎</b>‎‎ Quotes</h1>
      <div className="quote-cards">
        {topQuotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <p>{quote}</p>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(quote)}
            >
              <i className={`fa-solid ${copied === quote ? 'fa-check' : 'fa-copy'}`}></i>   <span>{copied === quote ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              className="copy-btn"
              onClick={() => share(quote)}
            >
              <i className="fa-solid fa-share-nodes"></i> <span> Share</span>  
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopQuotes;
