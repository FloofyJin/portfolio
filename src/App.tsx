import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import Home from './Home';
import Huffman from './Huffman';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/huffman' element={<Huffman />} />
      </Routes>
    </Router>
  );
}

export default App;
