import React from 'react';

const PL = (props) => {
  let change = 0;
  if (Array.isArray(props.stocks)) {
    props.stocks.forEach(stock => {
      if (stock.sell_price) {
        change += stock.sell_price - stock.buy_price;
      }
    });
  }
  change = (props.funds - 10000 + change) / 10000;
  let percentChange = (change * 100).toFixed(2) + "%";
  let color = change >= 0 ? "green" : "red";
  return (
    <div style={{ color: color }}>
    P/L: {percentChange}
    </div>
  );
};

export default PL;
