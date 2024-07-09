import React from "react";
import Header from "./components/Header";
import BuyShares from "./components/BuyShares";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartYValues: [],
      stockSymbol: 'TSLA'
    };
  }

  componentDidMount() {
    this.fetchStock();
    setInterval(() => {
      this.fetchStock();
    }, 10000);
  }

  fetchStock() {
    const API_KEY = 'rLhtlyZIbP2U9Alhg48l13c4wQEj03IXaK5RfXBr';
    const symbol = this.state.stockSymbol;
    const interval = '1min';
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

        const closePrices = Object.values(data).map(item => parseFloat(item['regularMarketPrice']));

        this.setState({
          stockChartYValues: closePrices
        });
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
    let currentPrice = this.state.stockChartYValues[this.state.stockChartYValues.length - 1];
    let previousClose = this.state.stockChartYValues[this.state.stockChartYValues.length - 2];
    let imageSrc;
    let titleStyle = {};
    let percentageChange = 0;

    if (previousClose !== undefined && previousClose !== 0) {
      percentageChange = ((currentPrice - previousClose) / previousClose) * 100;
    }

    if (currentPrice > previousClose) {
      titleStyle = { color: 'green' };
    } else {
      titleStyle = { color: 'red' };
    }
    if (currentPrice < previousClose) {
      imageSrc = 'https://cdn-icons-png.flaticon.com/512/4951/4951989.png';
    } else {
      imageSrc = 'https://cdn-icons-png.flaticon.com/512/1356/1356479.png';
    }

    return (
      <>
        <Header />
        <div className="stock__container">
          <h1 className="title">
            <img
              className="search__logo"
              src={"https://cdn-icons-png.flaticon.com/512/3275/3275760.png"}
            ></img>
            Applewood
          </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="search__field"
              type="text"
              value={this.state.stockSymbol}
              onChange={this.handleChange}
              placeholder="Enter your stock"
            />
            <button className="login__button" type="submit">
              Submit
            </button>
          </form>
          <h2 className="stock__price" style={titleStyle}>
            <img className="stock__emoji" src={imageSrc}></img>
            {this.state.stockSymbol} - Current Price: ${currentPrice} (
            {percentageChange.toFixed(2)}%)
          </h2>
          <BuyShares
            currentPrice={currentPrice}
            symbol={this.state.stockSymbol}
          />
        </div>
      </>
    );
  }

}

export default Stock;
