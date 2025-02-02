import React from 'react';
import Header from './Header';
import './UnregisteredAcc.css';

const UnregisteredAcc = () => {
    return (
        <>
            <Header />
            <div className="unregistered-page">
                <div className="unregistered-container">
                    <h2>Unregistered Investment Account</h2>
                    <p>
                        An Unregistered Investment Account is a type of account that allows you to invest in a wide range of assets without the tax advantages of registered accounts like RRSPs or TFSAs.
                    </p>
                    <h3>Benefits of Unregistered Accounts</h3>
                    <ul>
                        <li>No contribution limits</li>
                        <li>Flexibility to withdraw funds at any time</li>
                        <li>Wide range of investment options</li>
                    </ul>
                    <h3>Taxation</h3>
                    <p>
                        Unlike registered accounts, investments in unregistered accounts are subject to taxes on interest, dividends, and capital gains. 
                        It's important to keep track of your investments and report them accurately on your tax return.
                    </p>
                    <h3>Investment Options</h3>
                    <p>
                        Unregistered accounts offer a wide range of investment options, including stocks, bonds, mutual funds, ETFs, and more. 
                        This flexibility allows you to tailor your investment strategy to your financial goals.
                    </p>
                    <button>Open an Unregistered Account</button>
                </div>
            </div>
        </>
    );
};

export default UnregisteredAcc;
