import React, { useState } from 'react';
import Stock from './Stock';
import './App.css';
import fetchStock from './Stock'
import data from './Stock'
import StockSymbol from './Stock'
import Axios from "axios";
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
