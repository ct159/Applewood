import React, { useState } from 'react';
import Stock from './Stock';

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
