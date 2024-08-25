import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopQuotes.css';
import quotesData from './quotes.json'; // Importa o JSON contendo as citações

const TopQuotes = () => {
  const [topQuotes, setTopQuotes] = useState([]);
  const [copied, setCopied] = useState(null);

  // Função para obter 5 citações aleatórias em inglês do arquivo JSON
  const getTopQuotes = () => {
    // Filtra as citações em inglês
    const englishQuotes = quotesData.filter(quote => quote.language === 'en');

    // Embaralha as citações e seleciona as 5 primeiras
    const shuffledQuotes = englishQuotes.sort(() => 0.5 - Math.random()).slice(0, 5);
    setTopQuotes(shuffledQuotes);
  };

  useEffect(() => {
    getTopQuotes(); // Chama a função para buscar as citações ao carregar o componente
  }, []);

  const copyToClipboard = (quote) => {
    navigator.clipboard.writeText(`${quote.text} - ${quote.author}`);
    setCopied(quote);
    setTimeout(() => setCopied(null), 2000);
  };

  const share = (quote) => {
    const tweetText = encodeURIComponent(`✨ Aqui está uma citação inspiradora para iluminar seu dia: "${quote.text} - ${quote.author}" 🌟 Veja mais em:`);
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
      <br /><br /><br/><br></br><br></br><br></br><br></br>
      <h1> <b>‎ Top 5 ‎</b>‎‎ Quotes</h1>
      <div className="quote-cards">
        {topQuotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <p>{`${quote.text} - ${quote.author}`}</p>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(quote)}
            >
              <i className={`fa-solid ${copied === quote ? 'fa-check' : 'fa-copy'}`}></i> <span>{copied === quote ? 'Copied!' : 'Copy'}</span>
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
