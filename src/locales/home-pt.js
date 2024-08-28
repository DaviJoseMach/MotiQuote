import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quotesData from '../quotes.json'; // Importa o JSON com as citações
import '../App.css';
import '../Collaborators.css';
import collaboratorsData from '../collaborators.json';

const HomePt = () => {
  const [quote, setQuote] = useState('');
  const [copied, setCopied] = useState(false);

  // Função para pegar uma citação aleatória em português do JSON
  const getQuote = () => {
    // Filtra as citações para pegar apenas as em português
    const portugueseQuotes = quotesData.filter(quote => quote.language === 'pt');
    if (portugueseQuotes.length === 0) {
      setQuote('Nenhuma citação disponível em português.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * portugueseQuotes.length);
    const quoteData = portugueseQuotes[randomIndex];
    const newQuote = `${quoteData.text} - ${quoteData.author || 'Aleatório'}`;
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
    const tweetText = encodeURIComponent(`✨ Aqui está uma citação inspiradora para alegrar seu dia: "${quote}" 🌟 Veja mais em:`);  
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
      <div className="navbar-center">
        <a className="button-icon" href="https://github.com/DaviJoseMach/MotiQuote">
          <i className="fa-brands fa-github icon-b"></i>
        </a>
        <Link className="button-icon" to="/pt-top">
          <i className="fa-solid fa-fire icon-b"></i>
        </Link>
        <Link className="button-icon" to="/pt-daily">
          <i className="fa-solid fa-cloud-sun icon-b"></i>
        </Link> 
        </div>
        <Link className="button-icon-2" to="/">
        <i class="fa-solid fa-language icon-2"></i>
        </Link>
      </div>

      <br></br><br></br><br></br>
      <div className="content-wrapper">
        <header className="header">
          <h1><b>‎ Citação </b>‎‎ Motivacional</h1>
          <button className="generate-btn" onClick={getQuote}>Nova Citação</button>
        </header>
        <div className="quote-card">
          <p>{quote}</p>
          <button className="copy-btn" onClick={copyToClipboard}>
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i> 
              <span> {copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
          <button className="copy-btn" onClick={share}>
              <i className="fa-solid fa-share-nodes"></i> 
              <span> Compartilhar</span>
          </button>
        </div>
        <a className="button-icon-w" href="https://www.pixme.bio/davvzin">
          <i className="fa-solid fa-mug-hot icon-b"></i>
          <span className="button-text">Me pague um Café</span>
        </a> <br></br><br></br><br></br>
      </div>
      <div className="counters-container">
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol">+</span>
            <span className="counter-number" data-target="6000">0</span>
          </div>
          <h4>Citações Geradas</h4>
        </div>
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol">+</span>
            <span className="counter-number" data-target="56">0</span>
          </div>
          <h4>Pessoas Motivadas</h4>
        </div>
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol"></span>
            <span className="counter-number" data-target="1852">0</span>
          </div>
          <h4>Autores</h4>
        </div>
        <div className="counter-card">
          <div className="counter">
            <span className="plus-symbol">+</span>
            <span className="counter-number" data-target="3065">0</span>
          </div>
          <h4>Manhãs Motivadas</h4>
        </div>
      </div>
      
      <center>
          <h1>Colaboradores</h1>
          <p className='infus'>Para aparecer aqui, basta enviar uma doação de apenas <b className='zum'>0.1</b> dólares ou reais para o projeto</p> 
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

export default HomePt;
