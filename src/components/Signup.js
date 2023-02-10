import React from 'react';


const Login = () => {
  const handleGuestLogin = () => {
    // logic to log in the user as a guest
    // for example, you could set a flag in your state to indicate the user is logged in as a guest
  }

  return (
        <div className="login__container">
          <img className='login__logo'src={'https://cdn-icons-png.flaticon.com/512/3275/3275760.png'}></img>
          <h1 className="login__title">Applewood</h1>
          <form className="login__form">
            <input className="login__input" type="text" placeholder="Username" />
            <input className="login__input" type="password" placeholder="Password" />
            <button className="login__button">Login</button>
          </form>
          <button className="login__guest-button" onClick={handleGuestLogin}>Continue as Guest</button>
        </div>
  )
}

export default Login