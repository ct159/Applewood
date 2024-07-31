import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h3>Transaction List</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type} {transaction.shares} shares of {transaction.symbol} at ${transaction.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
