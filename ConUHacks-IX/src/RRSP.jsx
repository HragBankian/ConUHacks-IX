import React from 'react';
import Header from './Header';
import './RRSP.css';

const RRSP = () => {
    return (
        <>
            <Header />
            <div className="rrsp-page">
                <div className="rrsp-container">
                    <h2>Registered Retirement Savings Plan (RRSP)</h2>
                    <p>
                        A Registered Retirement Savings Plan (RRSP) is a retirement savings and investment vehicle for employees and the self-employed in Canada. 
                        RRSPs have various tax advantages compared to investing outside of tax-preferred accounts.
                    </p>
                    <h3>Benefits of RRSP</h3>
                    <ul>
                        <li>Tax-deferred growth on investments</li>
                        <li>Contributions are tax-deductible</li>
                        <li>Wide range of investment options</li>
                        <li>Can be converted to a Registered Retirement Income Fund (RRIF) upon retirement</li>
                    </ul>
                    <h3>Contribution Limits</h3>
                    <p>
                        The contribution limit for RRSPs is 18% of the previous year's earned income, up to a maximum dollar limit set by the government. 
                        Unused contribution room can be carried forward to future years.
                    </p>
                    <h3>Withdrawals</h3>
                    <p>
                        Withdrawals from an RRSP are taxed as income. However, there are some programs like the Home Buyers' Plan (HBP) and the Lifelong Learning Plan (LLP) 
                        that allow for tax-free withdrawals under certain conditions.
                    </p>
                    <button>Open an RRSP Account</button>
                </div>
            </div>
        </>
    );
};

export default RRSP;
