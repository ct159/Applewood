import React from 'react';


const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction__container">
      <h2 className="transaction__title">Transactions</h2>
      <ul className="transaction__list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction__item">
            Symbol: {transaction.symbol}, Price: {transaction.price}, Quantity: {transaction.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
