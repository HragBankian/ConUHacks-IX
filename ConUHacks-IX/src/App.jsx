import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Overview from './Overview';
import RRSP from './RRSP';
import TFSA from './TFSA';
import FHSA from './FHSA';
import UnregisteredAcc from './UnregisteredAcc';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/rrsp" element={<RRSP />} />
                <Route path="/tfsa" element={<TFSA />} />
                <Route path="/fhsa" element={<FHSA />} />
                <Route path="/unregistered" element={<UnregisteredAcc />} />
            </Routes>
        </Router>
    );
};

export default App;
