import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './HomePage.css';
import advisorImage from './assets/ai_financialAdvisingImg.png';
import logo from './assets/logo.png';

const HomePage = () => {
    const [showPlanOptions, setShowPlanOptions] = useState(false);
    const planOptionsRef = useRef(null);
    const navigate = useNavigate(); 

    const handleMyPlanClick = () => {
        setShowPlanOptions(!showPlanOptions);
    };

    const handleClickOutside = (event) => {
        if (planOptionsRef.current && !planOptionsRef.current.contains(event.target)) {
            setShowPlanOptions(false);
        }
    };

    useEffect(() => {
        if (showPlanOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPlanOptions]);

    const handleSignInClick = () => {
        navigate('/login');
    };

    const handleOverviewClick = () => {
        navigate('/overview'); 
    };

    const handleRRSPClick = () => {
        navigate('/rrsp'); 
    };

    const handleTFSAClick = () => {
        navigate('/tfsa'); 
    };

    const handleFHSAClick = () => {
        navigate('/fhsa'); 
    };

    const handleUnregisteredClick = () => {
        navigate('/unregistered'); 
    };

    const handleGetStartedClick = () => {
        navigate('/form'); 
    };

    return (
        <>
            <header>
                <div className="header-left">
                <img src={logo} alt="Logo" style={{ maxWidth: '10%', height: 'auto', marginTop: '0px' }} />
                    <h1 className='sunlife-title'>Sun Life</h1>
                    <button onClick={handleOverviewClick}>Overview</button>
                    <button onClick={handleMyPlanClick}>
                        My Plan <span>&#x2193;</span>
                    </button>
                </div>
                <button className='sign-in' onClick={handleSignInClick}>Sign In</button>
            </header>
            {showPlanOptions && (
                <section className="plan-options" ref={planOptionsRef}>
                    <button onClick={handleRRSPClick}>RRSP</button>
                    <button onClick={handleTFSAClick}>TFSA</button>
                    <button onClick={handleFHSAClick}>FHSA</button>
                    <button onClick={handleUnregisteredClick}>Unregistered Account</button>
                </section>
            )}
            <main>
                <section>
                    <h1 className='img'>
                        <div className='imgDiv'>
                            <h5 style={{ color: 'white', fontWeight: 'bold', marginBottom: '10px', marginTop: '35px'}}>
                                Choose your partners wisely.
                            </h5>
                            <p style={{ color: 'white', fontSize: '19px', marginBottom: '30px', textAlign: 'justify', wordSpacing: '2px'
                            }}>
                                Safeguard what matters most <br />and build your wealth with<br /> tailored guidance.
                            </p>
                            <button className='getStarted' onClick={handleGetStartedClick}>Get Started</button>
                        </div>
                    </h1>
                    <h2>Welcome to SunLife Financial Advisor AI Tool</h2>
                    <div className='advisor-image'>
                        <img src={advisorImage} alt="AI Financial Advisor" style={{ maxWidth: '25%', height: 'auto', padding: '20px' }} />
                        <h2 style={{position:'relative', left: '25%' }}>FAQ</h2>
                        <p className='description' style={{textAlign: 'justify'}}><br /><br /><strong>Our AI tool helps you manage your finances efficiently and effectively.</strong><br /><br />
                        <strong>What is SunLife?</strong> SunLife is a financial advisory tool powered by AI.<br /><br />
                        <strong>How can I sign up?</strong> Click the sign-in button at the top right to get started.<br /><br />
                        <strong>Is my data secure?</strong> Yes, we prioritize your data security and privacy.<br /><br />
                        </p>
                    </div>
                </section>
                
            </main>
            <footer>
                <p>&copy; 2025 SunLife. All rights reserved.</p>
            </footer>
        </>
    );
};

export default HomePage;
