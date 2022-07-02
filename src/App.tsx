import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route}
    from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Home from './Home';
import Huffman from './Huffman';
import Httpserver from './Httpserver';

function App() {

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Jinsung Park - Portfolio</title>
      </Helmet>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/huffman' element={<Huffman />} />
        <Route path='/httpserver' element={<Httpserver />} />
      </Routes>
    </Router>
  );
}

export default App;
