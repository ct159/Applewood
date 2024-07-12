import React, { Component } from 'react';
import Header from './components/Header';
import BuyShares from './components/BuyShares';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      stockSymbol: 'TSLA'
    };
  }

  componentDidMount() {
    const userId = 1;
    this.fetchTransactions(userId);
  }

  fetchTransactions = async (userId) => {
    try {
      const response = await fetch(`/api/transactions/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({
        transactions: data
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  render() {
    const { transactions } = this.state;

    return (
      <>
        <Header />
        <div className="stock__container">
          <h1 className="title">Applewood</h1>
          <h2>Transactions:</h2>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>
                {transaction.symbol} - Price: ${transaction.price}, Quantity: {transaction.quantity}, Type: {transaction.transaction_type}, Timestamp: {transaction.timestamp}
              </li>
            ))}
          </ul>
          <BuyShares
            currentPrice={0}
            symbol={this.state.stockSymbol}
          />
        </div>
      </>
    );
  }
}

export default Stock;
