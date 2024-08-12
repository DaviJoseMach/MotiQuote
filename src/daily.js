import React, { useState, useEffect } from 'react';
import { fetchQuote } from './quoteService';
import { Link } from 'react-router-dom';
import './Daily.css';
const Daily = () => {
  const [dailyQuote, setDailyQuote] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [copied, setCopied] = useState(false);

  const getDailyQuote = async () => {
    const today = new Date().toISOString().split('T')[0]; 
    const storedQuote = localStorage.getItem(`quote-${today}`);

    if (storedQuote) {
      setDailyQuote(storedQuote);
    } else {
      try {
        const quoteData = await fetchQuote();
        const quote = `${quoteData.text} - ${quoteData.author || 'Random'}`;
        setDailyQuote(quote);
        localStorage.setItem(`quote-${today}`, quote); 
      } catch (error) {
        console.error('Não foi possível carregar a citação diária.', error);
      }
    }
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);

    const difference = nextMidnight - now;
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    getDailyQuote();
    calculateTimeLeft();

    
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    
    const interval = setInterval(() => {
      getDailyQuote();
    }, 24 * 60 * 60 * 1000); 

    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dailyQuote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = () => {
    const tweetText = encodeURIComponent(`⏰ Aqui está a citação diária: "${dailyQuote}" 🌞 Veja mais em:`);
    const tweetUrl = encodeURIComponent("https://motiquote.vercel.app/");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="daily-quote-container">
      <div className="navbar">
        <a className="button-icon" href="https://github.com/DaviJoseMach/MotiQuote">
          <i className="fa-brands fa-github icon-b"></i>
        </a>
        <Link className="button-icon" to="/">
          <i className="fa-solid fa-backward icon-b"></i>
        </Link>
      </div>
      <h1> <b>‎Daily</b> Motivation</h1>
      <div className="quote-card">
        <p>{dailyQuote}</p>
        <button className="copy-btn" onClick={copyToClipboard}>
          <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i> <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        <button className="copy-btn" onClick={share}>
          <i className="fa-solid fa-share-nodes"></i> <span>Share</span>
        </button>
      </div> <br></br>
      <center><p className="time-left">Next update in: <b className='time'> {timeLeft}</b></p></center>
      
    </div>
    
  );
};

export default Daily;
