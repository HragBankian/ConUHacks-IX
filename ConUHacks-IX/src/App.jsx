import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Overview from './Overview';
import RRSP from './RRSP';
import TFSA from './TFSA';
import FHSA from './FHSA';
import UnregisteredAcc from './UnregisteredAcc';
import CreateAccountForm from './CreateAccountForm';
import Form from './Form';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/rrsp" element={<RRSP />} />
                <Route path="/tfsa" element={<TFSA />} />
                <Route path="/fhsa" element={<FHSA />} />
                <Route path="/unregistered" element={<UnregisteredAcc />} />
                <Route path="/create-account" element={<CreateAccountForm />} />
                <Route path="/form" element={<Form />} />
            </Routes>
        </Router>
    );
};

export default App;
