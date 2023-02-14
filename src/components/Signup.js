import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase-config'
import { GoogleButton } from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const provider = new GoogleAuthProvider

const signInWithGoogle = () =>{
  signInWithPopup(auth, provider)
}


const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const register = async () => {
    try {
      await auth.createUserWithEmailAndPassword(registerEmail, registerPassword);
      setErrorMessage("");
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate('/home');
  };

  return (
    <div className="login__container">
      <h1 className="login__title">
        <img
          className="login__logo"
          src="https://cdn-icons-png.flaticon.com/512/3275/3275760.png"
        />
        Applewood
      </h1>
      <form className="login__form">
        <input
          className="login__input"
          type="text"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Confirm Password"
          
        />
        <div className="login__signup">
          Have an account? <Link to="/">Login</Link>
        </div>
        <button className="login__button" onClick={register}>Sign Up</button>
        {errorMessage && <div className="error__message">{errorMessage}</div>}
        <GoogleButton onClick={signInWithGoogle} />
      </form>
      <button className="login__guest-button" onClick={handleGuestLogin}>
        Continue as Guest
      </button>
    </div>
  );
};
export default Signup
