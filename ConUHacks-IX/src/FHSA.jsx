import React from 'react';
import Header from './Header';
import './FHSA.css';

const FHSA = () => {
    return (
        <>
            <Header />
            <div className="fhsa-page">
                <div className="fhsa-container">
                    <h2>First Home Savings Account (FHSA)</h2>
                    <p>
                        A First Home Savings Account (FHSA) is a savings account designed to help individuals save for their first home. 
                        Contributions to an FHSA are tax-deductible, and withdrawals for the purpose of buying a first home are tax-free.
                    </p>
                    <h3>Benefits of FHSA</h3>
                    <ul>
                        <li>Tax-deductible contributions</li>
                        <li>Tax-free withdrawals for first home purchase</li>
                        <li>Tax-deferred growth on investments</li>
                        <li>Flexible contribution limits</li>
                    </ul>
                    <h3>Contribution Limits</h3>
                    <p>
                        The contribution limit for FHSAs is set annually by the government. Unused contribution room can be carried forward to future years.
                        Over-contributions are subject to a penalty tax.
                    </p>
                    <h3>Withdrawals</h3>
                    <p>
                        Withdrawals from an FHSA are tax-free if used for the purchase of a first home. Withdrawals for other purposes are subject to tax.
                    </p>
                    <button>Open an FHSA</button>
                </div>
            </div>
        </>
    );
};

export default FHSA;
