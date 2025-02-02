import React from 'react';
import Header from './Header';
import './TFSA.css';
import chart from './assets/tfsa_age.png';

const TFSA = () => {
    return (
        <>
            <Header />
            <div className="tfsa-page">
                <div className="tfsa-container">
                    <h2>Tax-Free Savings Account (TFSA)</h2>
                    <p>
                        A Tax-Free Savings Account (TFSA) is a flexible, registered, general-purpose savings account that allows Canadians to earn tax-free investment income.
                        Contributions to a TFSA are not tax-deductible, but withdrawals are tax-free.
                    </p>
                    <h3>Benefits of TFSA</h3>
                    <ul>
                        <li>Tax-free growth on investments</li>
                        <li>Withdrawals are tax-free</li>
                        <li>Unused contribution room can be carried forward</li>
                        <li>No restrictions on withdrawals</li>
                        <img
                                            src={chart}
                                            alt="TFSA Chart by Age Group"
                                            style={{ maxWidth: '90%', height: 'auto', marginTop: '30px', position: 'relative', left: '3%' }}
                                        />
                    </ul>
                    <h3>Contribution Limits</h3>
                    <p>
                        The contribution limit for TFSAs is set annually by the government. Unused contribution room can be carried forward to future years.
                        Over-contributions are subject to a penalty tax.
                    </p>
                    <h3>Withdrawals</h3>
                    <p>
                        Withdrawals from a TFSA are tax-free and can be made at any time for any purpose. The amount withdrawn can be re-contributed in future years.
                    </p>
                    <h2>How to Open a TFSA</h2>
                    <p>
                        Opening a TFSA is relatively easy. You can open one at most financial institutions, including
                        banks, credit unions, and online brokers. To open a TFSA, you’ll need:
                    </p>
                    <ul>
                        <li>Valid identification (such as a driver’s license or passport)</li>
                        <li>A Canadian address</li>
                        <li>Your Social Insurance Number (SIN)</li>
                        <li>Minimum age of 18 or 19 depending on your province</li>
                    </ul>
                    <h2>How to Maximize Your TFSA</h2>
                    <p>To make the most of your TFSA, consider the following tips:</p>
                    <ul>
                        <li>Start contributing early to maximize growth over time.</li>
                        <li>Invest in a diversified mix of stocks, bonds, and ETFs for potential higher returns.</li>
                        <li>Take advantage of the full contribution room every year if possible.</li>
                        <li>Withdraw funds strategically to avoid losing contribution room.</li>
                    </ul>
                    <button>Open a TFSA</button>
                </div>
            </div>
        </>
    );
};

export default TFSA;
