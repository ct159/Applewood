import React from "react";
import Header from "./components/Header";
import BuyShares from "./components/BuyShares";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockPrice: null,
      stockSymbol: 'TSLA'
    };
  }

  componentDidMount() {
    this.fetchStock();
    setInterval(() => {
      this.fetchStock();
    }, 60000);
  }

  fetchStock() {
    const API_KEY = 'rLhtlyZIbP2U9Alhg48l13c4wQEj03IXaK5RfXBr';
    const symbol = this.state.stockSymbol;
    const url = `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbol}`;

    fetch(url, {
      headers: {
        'x-api-key': API_KEY
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const price = data?.quoteResponse?.result?.[0]?.regularMarketPrice;
        if (price) {
          this.setState({
            stockPrice: price
          });
        } else {
          throw new Error('Unable to get stock price from response');
        }
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchStock();
  };

  handleChange = (event) => {
    this.setState({ stockSymbol: event.target.value });
  }

  render() {
    const { stockPrice, stockSymbol } = this.state;
    let priceDisplay = 'Loading...';

    if (stockPrice !== null) {
      priceDisplay = `$${stockPrice}`;
    }

    return (
      <>
        <Header />
        <div className="stock__container">
          <h1 className="title">
            <img
              className="search__logo"
              src={"https://cdn-icons-png.flaticon.com/512/3275/3275760.png"}
              alt="Logo"
            />
            Applewood
          </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="search__field"
              type="text"
              value={stockSymbol}
              onChange={this.handleChange}
              placeholder="Enter your stock"
            />
            <button className="login__button" type="submit">
              Submit
            </button>
          </form>
          <h2 className="stock__price">
            {stockSymbol} - Current Price: {priceDisplay}
          </h2>
          <BuyShares
            currentPrice={stockPrice}
            symbol={stockSymbol}
          />
        </div>
      </>
    );
  }

}

export default Stock;
