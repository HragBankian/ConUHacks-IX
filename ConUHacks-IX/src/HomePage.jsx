import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import './HomePage.css';
import advisorImage from './assets/ai_financialAdvisingImg.png';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn');
        if (loginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignOutClick = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };


    const handleGetStartedClick = () => {
        if (isLoggedIn) {
            navigate('/overview');
        } else {
            navigate('/form');
        }
    };

    return (
        <>
            {/* Pass isLoggedIn and handleSignOutClick to HeaderSection */}
            <Header
                isLoggedIn={isLoggedIn} 
                handleSignOutClick={handleSignOutClick} 
            />
            <main>
                <section>
                    <h1 className="img">
                        <div className="imgDiv">
                            <h5 style={{ color: 'white', fontWeight: 'bold', marginBottom: '10px', marginTop: '35px' }}>
                                Choose your partners wisely.
                            </h5>
                            <p style={{ color: 'white', fontSize: '19px', marginBottom: '30px', textAlign: 'justify', wordSpacing: '2px' }}>
                                Safeguard what matters most <br />and build your wealth with<br /> tailored guidance.
                            </p>
                            <button className="getStarted" onClick={handleGetStartedClick}>
                                Get Started
                            </button>
                        </div>
                    </h1>
                    <h2>Welcome to Fund Life Financial Advisor AI Tool</h2>
                    <div className="advisor-image">
                        <img
                            src={advisorImage}
                            alt="AI Financial Advisor"
                            style={{ maxWidth: '25%', height: 'auto', padding: '20px' }}
                        />
                        <h2 style={{ position: 'relative', left: '22%' }}>FAQ</h2>
                        <p className="description" style={{ textAlign: 'justify' }}>
                            <br /><br />
                            <strong>Our AI tool helps you manage your finances efficiently and effectively.</strong><br /><br />
                            <strong>What is Fund Life?</strong> Fund Life is a financial advisory tool powered by AI.<br /><br />
                            <strong>How can I sign up?</strong> Click the sign-in button at the top right to get started.<br /><br />
                            <strong>Is my data secure?</strong> Yes, we prioritize your data security and privacy.<br /><br />
                        </p>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2025 Fund Life. All rights reserved.</p>
            </footer>
        </>
    );
};

export default HomePage;
