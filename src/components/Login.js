import React from 'react';
import {useNavigate} from 'react-router-dom'

const Login = () => {
const navigate = useNavigate()

const handleGuestLogin = () => {
navigate('/home')
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
<input className="login__input" type="text" placeholder="Username" />
<input
       className="login__input"
       type="password"
       placeholder="Password"
     />
<div className="sign__up">Don't have an account? Sign Up</div>
<button className="login__button">Login</button>
</form>
<button className="login__guest-button" onClick={handleGuestLogin}>
Continue as Guest
</button>
</div>
);
};

export default Login;