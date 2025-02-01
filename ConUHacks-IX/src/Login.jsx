import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your authentication logic here
        navigate('/');
    };

    return (
        <div className="login-page"> {/* Wrapper that applies centering only to Login */}
            <div className="container">
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button className='signin' type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
