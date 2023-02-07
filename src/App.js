import React from 'react';
import './App.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Quote from './components/Quote';
import Footer from './components/Footer';
import Header from './components/Header';

library.add(faTwitter, faLinkedin, faGithub);


function App() {
  return (
    <div className="App">
      <Header />
      <Quote />
      <Footer />
    </div>
  );
}

export default App;
