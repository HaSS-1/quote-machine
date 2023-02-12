import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';
library.add(faTwitter, faLinkedin, faGithub);
const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="social-links">
                <a href="https://twitter.com/HassanTAJIRI1" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.linkedin.com/in/hassan-tajiri" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/HaSS-1" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
            <p className="copyright">
                &copy; {year} All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
