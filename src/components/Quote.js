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
    const [color, setColor] = useState('#fff');
    const [copied, setCopied] = useState(false);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 9)];
        }
        return color;
    };


    const getQuote = useCallback(() => {
        axios.get('https://api.quotable.io/random')
            .then(response => {
                setQuote(response.data.content);
                setAuthor(response.data.author);
                setColor(getRandomColor());;
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
            <div className="quote-container" style={{ backgroundColor: color }}>
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
                <button onClick={getQuote} style={{ backgroundColor: color }}>New Quote</button>
            </div>
        </div>
    );
};

export default Quote;
