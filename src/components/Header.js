import React, { useState } from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config'; // Correct path to firebase-config.js

function Header() {
  const [lightMode, setLightMode] = useState(false);

  const toggleLightMode = () => {
    setLightMode(prevMode => !prevMode);
    document.body.classList.toggle('light-mode');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect or show a message after successful logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className={`header__wrapper ${lightMode ? 'light' : 'dark'}`}>
      <div className="header__logo">
        {/* Add logo or title here */}
      </div>
      <div className="header__menuItems">
        <BsFillMoonStarsFill onClick={toggleLightMode} />
        <Link to="/news">News</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
