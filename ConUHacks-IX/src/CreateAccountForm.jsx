import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Assuming you're reusing the same CSS file

const CreateAccountForm = () => {
    const handleSubmitButtonClick = () => {
        navigate('/overview');
    };
    const [hasFHSA, setHasFHSA] = useState(''); // Track if the user has FHSA
    const [hasTFSA, setHasTFSA] = useState(''); // Track if the user has TFSA
    const [hasRRSP, setHasRRSP] = useState(''); // Track if the user has RRSP
    const [hasUnregistered, setHasUnregistered] = useState(''); // Track if the user has Unregistered account
    const [yearOpenedFHSA, setYearOpenedFHSA] = useState(''); // Track year opened for FHSA
    const [amountInvestedToDate, setAmountInvestedToDate] = useState(''); // Track amount invested to date for FHSA
    const [amountInvestedLastYear, setAmountInvestedLastYear] = useState(''); // Track amount invested last year for FHSA
    const [amountInvestedThisYear, setAmountInvestedThisYear] = useState(''); // Track amount invested this year for FHSA
    const [currentBalanceTHSA, setCurrentBalanceTHSA] = useState(''); // Track current balance for THSA
    const [totalAmountInvestedTHSA, setTotalAmountInvestedTHSA] = useState(''); // Track total amount invested for THSA
    const [currentBalanceRRSP, setCurrentBalanceRRSP] = useState(''); // Track current balance for RRSP
    const [limitRRSP, setLimitRRSP] = useState(''); // Track limit for RRSP
    const [deductedAmountRRSP, setDeductedAmountRRSP] = useState(''); // Track deducted amount for RRSP
    const [totalAmountInvestedRRSP, setTotalAmountInvestedRRSP] = useState(''); // Track total invested for RRSP
    const [currentBalanceUnregistered, setCurrentBalanceUnregistered] = useState(''); // Track current balance for Unregistered account
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Log the answers for now (you can send this to a backend or next step)
        console.log('User has FHSA:', hasFHSA);
        console.log('User year opened FHSA:', yearOpenedFHSA);
        console.log('User amount invested to date in FHSA:', amountInvestedToDate);
        console.log('User amount invested last year in FHSA:', amountInvestedLastYear);
        console.log('User amount invested this year in FHSA:', amountInvestedThisYear);
        console.log('User has TFSA:', hasTFSA);
        console.log('User has RRSP:', hasRRSP);
        console.log('User current balance in RRSP:', currentBalanceRRSP);
        console.log('User limit in RRSP:', limitRRSP);
        console.log('User deducted amount in RRSP:', deductedAmountRRSP);
        console.log('User total amount invested in RRSP:', totalAmountInvestedRRSP);
        console.log('User has Unregistered Account:', hasUnregistered);
        console.log('User current balance in Unregistered:', currentBalanceUnregistered);

        // Redirect to another page (for example, the overview or another step)
        navigate('/overview'); // You can change this as per your navigation logic
    };

    return (
        <div className="form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                {/* FHSA Question */}
                <div>
                    <label htmlFor="hasFHSA">Do you have an FHSA account?</label>
                    <select
                        id="hasFHSA"
                        name="hasFHSA"
                        value={hasFHSA}
                        onChange={(e) => setHasFHSA(e.target.value)}
                        required
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* FHSA Details if user selects "Yes" */}
                {hasFHSA === 'yes' && (
                    <>
                        <div>
                            <label htmlFor="yearOpenedFHSA">Year Opened</label>
                            <input
                                type="number"
                                id="yearOpenedFHSA"
                                name="yearOpenedFHSA"
                                value={yearOpenedFHSA}
                                onChange={(e) => setYearOpenedFHSA(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="amountInvestedToDate">Amount Invested To Date</label>
                            <input
                                type="number"
                                id="amountInvestedToDate"
                                name="amountInvestedToDate"
                                value={amountInvestedToDate}
                                onChange={(e) => setAmountInvestedToDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="amountInvestedLastYear">Amount Invested Last Year</label>
                            <input
                                type="number"
                                id="amountInvestedLastYear"
                                name="amountInvestedLastYear"
                                value={amountInvestedLastYear}
                                onChange={(e) => setAmountInvestedLastYear(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="amountInvestedThisYear">Amount Invested This Year</label>
                            <input
                                type="number"
                                id="amountInvestedThisYear"
                                name="amountInvestedThisYear"
                                value={amountInvestedThisYear}
                                onChange={(e) => setAmountInvestedThisYear(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Ask for TFSA if user selects "No" for FHSA or after filling out FHSA details */}
                {(hasFHSA === 'no' || (hasFHSA === 'yes' && amountInvestedThisYear !== '')) && (
                    <div>
                        <label htmlFor="hasTFSA">Do you have a TFSA account?</label>
                        <select
                            id="hasTFSA"
                            name="hasTFSA"
                            value={hasTFSA}
                            onChange={(e) => setHasTFSA(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                )}

                {/* TFSA Details if user selects "Yes" */}
                {hasTFSA === 'yes' && (
                    <>
                        <div>
                            <label htmlFor="currentBalanceTHSA">Current Balance</label>
                            <input
                                type="number"
                                id="currentBalanceTHSA"
                                name="currentBalanceTHSA"
                                value={currentBalanceTHSA}
                                onChange={(e) => setCurrentBalanceTHSA(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="totalAmountInvestedTHSA">Total Amount Invested</label>
                            <input
                                type="number"
                                id="totalAmountInvestedTHSA"
                                name="totalAmountInvestedTHSA"
                                value={totalAmountInvestedTHSA}
                                onChange={(e) => setTotalAmountInvestedTHSA(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Ask for RRSP after either answering TFSA details or selecting No for TFSA */}
                {(hasTFSA === 'no' || hasTFSA === 'yes') && (
                    <div>
                        <label htmlFor="hasRRSP">Do you have an RRSP account?</label>
                        <select
                            id="hasRRSP"
                            name="hasRRSP"
                            value={hasRRSP}
                            onChange={(e) => setHasRRSP(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                )}

                {/* RRSP Details if user selects "Yes" */}
                {hasRRSP === 'yes' && (
                    <>
                        <div>
                            <label htmlFor="currentBalanceRRSP">Current Balance in RRSP</label>
                            <input
                                type="number"
                                id="currentBalanceRRSP"
                                name="currentBalanceRRSP"
                                value={currentBalanceRRSP}
                                onChange={(e) => setCurrentBalanceRRSP(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="limitRRSP">Limit in RRSP</label>
                            <input
                                type="number"
                                id="limitRRSP"
                                name="limitRRSP"
                                value={limitRRSP}
                                onChange={(e) => setLimitRRSP(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="deductedAmountRRSP">Deducted Amount in RRSP</label>
                            <input
                                type="number"
                                id="deductedAmountRRSP"
                                name="deductedAmountRRSP"
                                value={deductedAmountRRSP}
                                onChange={(e) => setDeductedAmountRRSP(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="totalAmountInvestedRRSP">Total Amount Invested in RRSP</label>
                            <input
                                type="number"
                                id="totalAmountInvestedRRSP"
                                name="totalAmountInvestedRRSP"
                                value={totalAmountInvestedRRSP}
                                onChange={(e) => setTotalAmountInvestedRRSP(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Ask for Unregistered Account after either answering RRSP details or selecting No for RRSP */}
                {(hasRRSP === 'no' || hasRRSP === 'yes') && (
                    <div>
                        <label htmlFor="hasUnregistered">Do you have an Unregistered Account?</label>
                        <select
                            id="hasUnregistered"
                            name="hasUnregistered"
                            value={hasUnregistered}
                            onChange={(e) => setHasUnregistered(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                )}

                {/* Unregistered Account Details if user selects "Yes" */}
                {hasUnregistered === 'yes' && (
                    <>
                        <div>
                            <label htmlFor="currentBalanceUnregistered">Current Balance in Unregistered Account</label>
                            <input
                                type="number"
                                id="currentBalanceUnregistered"
                                name="currentBalanceUnregistered"
                                value={currentBalanceUnregistered}
                                onChange={(e) => setCurrentBalanceUnregistered(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Submit Button always visible */}
                <button type="submit" onClick={handleSubmitButtonClick}>Submit</button>
            </form>
        </div>
    );
};

export default CreateAccountForm;
