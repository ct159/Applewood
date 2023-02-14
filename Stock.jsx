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
    }, 5000);
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'cfi9p11r01qq9nt1vfk0cfi9p11r01qq9nt1vfkg';
    let API_Call = `https://finnhub.io/api/v1/stock/candle?symbol=${this.state.stockSymbol}&resolution=D&from=${Math.round((new Date().getTime() - 5 * 365 * 24 * 60 * 60 * 1000) / 1000)}&to=${Math.round(new Date().getTime() / 1000)}&token=${API_KEY}`;
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);

          for (var key in data['c']) {
            stockChartYValuesFunction.push(data['c'][key]);
          }

          pointerToThis.setState({
            stockChartYValues: stockChartYValuesFunction
          });
        }
      );
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
    let percentageChange = ((currentPrice - previousClose) / previousClose) * 100;

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

