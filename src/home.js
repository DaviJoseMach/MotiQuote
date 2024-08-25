import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quotesData from './quotes.json'; // Importa o JSON com as citações
import './App.css';
import './Collaborators.css';
import collaboratorsData from './collaborators.json';

const Home = () => {
  const [quote, setQuote] = useState('');
  const [copied, setCopied] = useState(false);

  // Função para pegar uma citação aleatória em inglês do JSON
  const getQuote = () => {
    // Filtra as citações para pegar apenas as em inglês
    const englishQuotes = quotesData.filter(quote => quote.language === 'en');
    if (englishQuotes.length === 0) {
      setQuote('No quotes available in English.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * englishQuotes.length);
    const quoteData = englishQuotes[randomIndex];
    const newQuote = `${quoteData.text} - ${quoteData.author || 'Random'}`;
    setQuote(newQuote);
    setCopied(false);
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
    const tweetText = encodeURIComponent(`✨ Here is an inspiring quote to brighten your day: "${quote}" 🌟 Veja mais em:`);  
    const tweetUrl = encodeURIComponent("https://motiquote.vercel.app/");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const counters = document.querySelectorAll('.counter-number');
  
    counters.forEach(counter => {
      const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;

        const increment = target / 600; 

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
    });
  }, []); 

  return (
    <div className="Home">
      <div className="navbar">
        <a className="button-icon" href="https://github.com/DaviJoseMach/MotiQuote">
          <i className="fa-brands fa-github icon-b"></i>
        </a>
        <Link className="button-icon" to="/top-quotes">
          <i className="fa-solid fa-fire icon-b"></i>
        </Link>
        <Link className="button-icon" to="/daily">
          <i className="fa-solid fa-cloud-sun icon-b"></i>
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
        </a> <br></br><br></br><br></br>
      </div>
      <div className="counters-container">
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol">+</span>
            <span className="counter-number" data-target="6000">0</span>
          </div>
          <h4>Quotes Generated</h4>
        </div>
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol">+</span>
            <span className="counter-number" data-target="56">0</span>
          </div>
          <h4>Motivated people</h4>
        </div>
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol"></span>
            <span className="counter-number" data-target="1852">0</span>
          </div>
          <h4>Authors</h4>
        </div>
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol">+</span>
            <span className="counter-number" data-target="3065">0</span>
          </div>
          <h4>Motivated mornings</h4>
        </div>
      </div>
      
      <center>
          <h1>Collaborators</h1>
          <p className='infus'>To appear here, just send a donation of just <b className='zum'>0.1</b> dollars or reais to the project</p> 
      </center>
      <div className='collaborators'>
        <div className="collaborators-track">
          {collaboratorsData.map((collaborator) => (
            <div key={collaborator.id} className={`collaborator ${collaborator.deviceType}`}>
              <img
                src={collaborator.imageUrl}
                alt={collaborator.name}
                className="collaborator-photo"
              />
            </div>
          ))}
        </div>
      </div> 
      <br></br><br></br><br></br>
    </div>
  );
};

export default Home;
