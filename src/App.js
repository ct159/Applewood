import React, { useState } from 'react';
import Stock from './Stock';
import fetchStock from './Stock'
import data from './Stock'
import StockSymbol from './Stock'
import Header from './components/Header';
import Login from './components/Login';

function App() {
  const [stockPrice, setStockPrice] = useState("");
 
  return (
      <div className="Ticker">
        <div className="App">
      <Stock/>
      </div>
      </div>
  );
}

export default App;
