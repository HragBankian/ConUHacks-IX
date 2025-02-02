import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css';
import Header from './Header';  // Import Header here

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send POST request to backend
        try {
            const response = await axios.post('https://localhost:7156/api/User/login', { email, password });

            if (response.status === 200) {
                // Login successful, set user as logged in
                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
                // Store user details in local storage
                localStorage.setItem('user', JSON.stringify(response.data));
                // Redirect to the home page after logging in
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Set error message from backend
            } else {
                setErrorMessage("An error occurred, please try again.");
            }
        }
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

                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

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
