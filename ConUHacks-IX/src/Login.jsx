import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header from './Header';  // Import Header here

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Immediately mark the user as logged in (no credential check)
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);

        // Redirect to the home page after logging in
        navigate('/');
    };

    const handleCreateAccountClick = () => {
        navigate('/form'); // Navigate to the form page for account creation
    };

    return (
        <div>
            <Header /> {/* Add Header here */}
            <div className="login-page">
                <div className="container">
                    <h2>Login Page</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="signin" type="submit">
                            Sign In
                        </button>
                    </form>

                    <p>
                        Don't have an account?{' '}
                        <span className="create-account-link" onClick={handleCreateAccountClick}>
                            Create one here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
