import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Symbol: {transaction.symbol}, Price: {transaction.price}, Quantity: {transaction.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
