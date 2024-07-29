import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from './AuthContext';

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const register = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGuestLogin = () => {
    navigate('/home');
  };

  return (
    <div className="login__container">
      <h1 className="login__title">
        <img
          className="login__logo"
          src="https://cdn-icons-png.flaticon.com/512/3275/3275760.png"
          alt="Applewood Logo"
        />
        Applewood
      </h1>
      <form className="login__form" onSubmit={register}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          required
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          required
        />
        <input
          className="login__input"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <div className="login__signup">
          Have an account? <Link to="/">Login</Link>
        </div>
        <button className="login__button" type="submit">Sign Up</button>
        {errorMessage && <div className="error__message">{errorMessage}</div>}
        <GoogleButton onClick={signInWithGoogle} />
      </form>
      <button className="login__guest-button" onClick={handleGuestLogin}>
        Continue as Guest
      </button>
    </div>
  );
};

export default Signup;
