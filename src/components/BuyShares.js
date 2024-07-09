import React from 'react';
import PL from './PL'

class BuyShares extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyShares: 0,
      sellShares: 0,
      funds: 10000,
      currentShares: 0,
      portfolio: []
    };
  }
  resetFunds = () => {
    localStorage.removeItem("funds");
    localStorage.removeItem("portfolio");
    localStorage.setItem("funds", 10000);
    this.setState({ funds: 10000, currentShares: 0, portfolio: [] });

};




  componentDidMount() {
    const state = localStorage.getItem('state');
    if (state) {
      this.setState(JSON.parse(state));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  handleBuyChange = (event) => {
    let value = event.target.value;
    if (!isNaN(value)) {
      this.setState({ buyShares: parseInt(value) });
    }
  }

  handleSellChange = (event) => {
    this.setState({ sellShares: parseInt(event.target.value) });
  }

  handleBuySubmit = (event) => {
    event.preventDefault();
    let cost = this.state.buyShares * this.props.currentPrice;
    let newFunds = this.state.funds - cost;
    if (newFunds >= 0) {
      this.setState({
        funds: newFunds,
        currentShares: this.state.currentShares + this.state.buyShares,
        portfolio: [...this.state.portfolio, {symbol: this.props.symbol, shares: this.state.buyShares}]
      });
    }
  }

  handleSellSubmit = (event) => {
    event.preventDefault();

    let stockIndex = this.state.portfolio.findIndex(item => item.symbol === this.props.symbol);

    if (stockIndex >= 0 && this.state.sellShares <= this.state.portfolio[stockIndex].shares) {
      let newFunds = this.state.funds + (this.state.sellShares * this.props.currentPrice);
      let updatedShares = this.state.portfolio[stockIndex].shares - this.state.sellShares;

      let updatedPortfolio = [...this.state.portfolio];
      if (updatedShares === 0) {
        updatedPortfolio.splice(stockIndex, 1);
      } else {
        updatedPortfolio[stockIndex].shares = updatedShares;
      }

      this.setState({
        funds: newFunds,
        currentShares: this.state.currentShares - this.state.sellShares,
        portfolio: updatedPortfolio
      });
    }
  }
  render() {
    let portfolio = {};
    this.state.portfolio.forEach((item) => {
      if (portfolio[item.symbol]) {
        portfolio[item.symbol] += item.shares;
      } else {
        portfolio[item.symbol] = item.shares;
      }
    });

    return (
      <div className="buy-shares">
        <h3 className="buy-shares">Buy Shares</h3>
        <form onSubmit={this.handleBuySubmit}>
          <input
            className="search__field"
            type="number"
            value={this.state.buyShares}
            onChange={this.handleBuyChange}
          />
          <button className="login__button" type="submit">Buy</button>
        </form>
        <h3>Sell Shares</h3>
        <form onSubmit={this.handleSellSubmit}>
          <input
            className="search__field"
            type="number"
            value={this.state.sellShares}
            onChange={this.handleSellChange}
          />
          <button className="login__button" type="submit">Sell</button>
        </form>
        <button className="reset__button" onClick={this.resetFunds}>Reset Funds</button>
        <p>Funds: ${(this.state.funds).toFixed(2)}</p>
        <PL funds={this.state.funds} />
        <p>Current Shares: {this.state.currentShares}</p>
        <p>
          Portfolio:{" "}
          {Object.entries(portfolio).map(([symbol, shares], index) => (
            <span key={index}>{symbol}: {shares} shares </span>
          ))}
        </p>
      </div>
    );
  }
}
  export default BuyShares
