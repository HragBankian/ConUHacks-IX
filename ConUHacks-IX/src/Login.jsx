import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Login.css';
import Header from './Header';  

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const loginData = {
                email: email,
                password: password
            };
            console.log('Response:');
            const response = await axios.post('https://localhost:7156/api/User/login', loginData);
            console.log('Response:', response);
            if (response.status === 200) {
   
                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
 
                localStorage.setItem('user', JSON.stringify(response.data));

                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); 
            } else {
                setErrorMessage("An error occurred, please try again.");
            }
        }
    };

    const handleCreateAccountClick = () => {
        navigate('/form'); 
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
