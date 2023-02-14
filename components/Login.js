import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { GoogleButton } from 'react-google-button';
import { auth } from '../firebase-config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider;

const Login = () => {
  document.title = "Applewood"
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate('/home');
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/home');
      });
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
          placeholder="Username"
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
        />
        <button className="login__button">Login</button>
        <div className="sign__up-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        <GoogleButton className="google__button" onClick={signInWithGoogle} />
      </form>
      <button className="login__guest-button" onClick={handleGuestLogin}>
        Continue as Guest
      </button>
    </div>
  );
};

export default Login;
