import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Home from './Home';
import Huffman from './Huffman';

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
      </Routes>
    </Router>
  );
}

export default App;
