import React, { useState } from 'react';
import {BsFillMoonStarsFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function Header() {
  const [lightMode, setLightMode] = useState(false);

  const toggleLightMode = () => {
    setLightMode(prevMode => !prevMode);
    document.body.classList.toggle('light-mode');
  }

  return (
    <div className={`header__wrapper ${lightMode ? "light" : "dark"}`}>
      <div className="header__logo">
      </div>
      <div className="header__menuItems">
        <Link><BsFillMoonStarsFill onClick={toggleLightMode} /></Link>
        <a href="/news">News</a>
        <a href="/">Logout</a>
      </div>
    </div>
  );
}
export default Header;
