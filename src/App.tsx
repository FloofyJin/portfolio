import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route}
    from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Home from './Home';
import Huffman from './Huffman';
import Httpserver from './Httpserver';
import Webscrawler from './Webscraper';

function App() {

  return (
    <Router>
      {/* <head>
        <meta property="og:title" content="*TITLE*" />
        <meta property="og:description" content="*DESCRIPTION*" />
      </head>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Jinsung Park - Portfolio</title>
        <meta name="description" content="This is the index page description"/> 
      </Helmet> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/huffman' element={<Huffman />} />
        <Route path='/httpserver' element={<Httpserver />} />
        <Route path='/webcrawler' element={<Webscrawler />} />
      </Routes>
    </Router>
  );
}

export default App;
