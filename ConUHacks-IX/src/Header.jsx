import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './assets/logo.png'; // Your logo file

const HeaderSection = ({ isLoggedIn, handleSignOutClick }) => {
    const navigate = useNavigate();

    // Local state for managing the visibility of the plan options
    const [showPlanOptions, setShowPlanOptions] = useState(false);

    const handle_SignInClick = () => {
        navigate('/login');
    };

    const handle_OverviewClick = () => {
        navigate('/overview');
    };

    const handleMyPlanClick = () => {
        setShowPlanOptions(!showPlanOptions);
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

    return (
        <header className="header-section">
            <div className="header-section-left">
                <img
                    src={logo}
                    alt="Logo"
                    style={{ maxWidth: '10%', height: 'auto', marginTop: '0px' }}
                />
                <h1 className="sunlife-title">Sun Life</h1>
                <button onClick={handle_OverviewClick}>Overview</button>
                <button onClick={handleMyPlanClick}>
                    My Plan <span>&#x2193;</span>
                </button>
            </div>
            {isLoggedIn ? (
                <button className="sign-out" onClick={handleSignOutClick}>Sign Out</button>
            ) : (
                <button className="sign-in" onClick={handle_SignInClick}>Sign In</button>
            )}

            {showPlanOptions && (
                <section className="plan-options">
                    <button onClick={handleRRSPClick}>RRSP</button>
                    <button onClick={handleTFSAClick}>TFSA</button>
                    <button onClick={handleFHSAClick}>FHSA</button>
                    <button onClick={handleUnregisteredClick}>Unregistered Account</button>
                </section>
            )}
        </header>
    );
};

export default HeaderSection;
