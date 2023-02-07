import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Quote.css';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faTwitter, faLinkedin, faGithub);

const Quote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#00bfff');
    const [copied, setCopied] = useState(false);

    const randomColor = () => {
        const colors = ['#07070a', '#24272b', '#4a525a', '#004ba8', '#3e78b2'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const getQuote = useCallback(() => {
        axios.get('https://api.quotable.io/random')
            .then(response => {
                setQuote(response.data.content);
                setAuthor(response.data.author);
                setBackgroundColor(randomColor());
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        getQuote();
    }, [getQuote]);

    const shareQuote = () => {
        const url = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
        window.open(url, '_blank');
    };

    const copyQuote = () => {
        navigator.clipboard.writeText(`"${quote}" - ${author}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <div className='container'>
            <div className="quote-container" style={{ backgroundColor: backgroundColor }}>
                <h1 className="quote">"{quote}"</h1>
                <h5 className="author">- {author}</h5>
                <div className="buttons">

                    <button onClick={shareQuote}><FontAwesomeIcon icon={faTwitter} /> Share on Twitter</button>
                    <button onClick={copyQuote}><FontAwesomeIcon icon={faClipboardCheck} /> Copy</button>
                </div>
                {copied && (
                    <div className="tooltip">
                        Quote Copied to Clipboard
                    </div>
                )}
            </div>
            <div className='new-quote'>
                <button onClick={getQuote} style={{ backgroundColor: backgroundColor }}>New Quote</button>
            </div>
        </div>
    );
};

export default Quote;
