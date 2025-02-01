import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    return (
        <div>
            <h2>Login Page</h2>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Login;