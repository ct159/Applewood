import React from 'react';

function Header() {
    return (
      <div className="header__wrapper">
        <div className="header__logo">
        </div>
        <div className="header__menuItems">
          <a href="/">Light Mode</a>
          <a href="/">PortFolio</a>
          <a href="/">Cash</a>
          <a href="/">Logout</a>
        </div>
      </div>
    );
}
export default Header