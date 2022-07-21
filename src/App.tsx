import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route}
    from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Home from './Home';
import Cryptography from './Huffman';
import Httpserver from './Httpserver';
import Webscrawler from './Webscraper';
import Archsetup from './Archsetup';

function App() {

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Jinsung Park - Portfolio</title>
      </Helmet> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cryptography' element={<Cryptography />} />
        <Route path='/httpserver' element={<Httpserver />} />
        <Route path='/webcrawler' element={<Webscrawler />} />
        <Route path='/archsetup' element={<Archsetup />} />
      </Routes>
    </Router>
  );
}

export default App;
