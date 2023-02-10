import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Signup = () => {


  const handleGuestLogin = () => {
    <a href='/about'></a>
  }

  return (
        <div className="login__container">
          <h1 className="login__title"><img className='login__logo'src={'https://cdn-icons-png.flaticon.com/512/3275/3275760.png'}></img>Applewood</h1>
          <form className="login__form">
            <input className="login__input" type="text" placeholder="Username" />
            <input className="login__input" type="password" placeholder="Password" />
            <input className="login__input" type="password" placeholder="Confirm Password" />
            <div className="sign__up">Have an account? Login</div>
            <button className="login__button">Sign Up</button>
          </form>
          <button className="login__guest-button" onClick={handleGuestLogin}>Continue as Guest</button>
        </div>
  )
}

export default Signup