import React from 'react';

const UnregisteredAcc = () => {
    return (
        <div>
            <h1>Unregistered Account</h1>
            <p>Please register to access this page.</p>
            <button onClick={() => alert('Redirect to registration page')}>Register</button>
        </div>
    );
};

export default UnregisteredAcc;