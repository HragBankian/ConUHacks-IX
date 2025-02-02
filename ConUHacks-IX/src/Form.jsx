import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import './Form.css';

const Form = () => {
    const navigate = useNavigate();

    const handleCreateAccountClick = () => {
        navigate('/create-account');
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        annual_income: '',
        net_worth: '',
        chequing_balance: '',
        savings_balance: '',
        monthly_expense: '',
        is_home_owner: false,
        occupation: 'Employed',
        is_student: false,
        savings_goal: '',  
        investment_risk_profile: 'Low',
        debt_amount: '',   
        credit_score: '',  
        has_credit_card: false, 
        financial_goals: [], 
        rrsp_amount: '',
        tfsa_amount: '',
        fhsa_amount: '',
        unregistered_amount: '',
        terms_accepted: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'is_student') {
                setFormData({ ...formData, [name]: checked });
            } else if (name === 'financial_goal') {
                if (checked) {
                    if (formData.financial_goals.length < 3) {
                        setFormData({ ...formData, financial_goals: [...formData.financial_goals, value] });
                    }
                } else {
                    setFormData({ ...formData, financial_goals: formData.financial_goals.filter(goal => goal !== value) });
                }
            } else if (name === 'terms_accepted') {
                setFormData({ ...formData, terms_accepted: checked });
            } else {
                setFormData({ ...formData, [name]: checked });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        try {
            const response = await fetch('/api/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    date_of_birth: formData.date_of_birth,
                    annual_income: formData.annual_income,
                    net_worth: formData.net_worth,
                    chequing_balance: formData.chequing_balance,
                    savings_balance: formData.savings_balance,
                    monthly_expense: formData.monthly_expense,
                    is_home_owner: formData.is_home_owner,
                    occupation: formData.occupation,
                    is_student: formData.is_student,
                    savings_goal: formData.savings_goal,
                    investment_risk_profile: formData.investment_risk_profile,
                    debt_amount: formData.debt_amount,
                    credit_score: formData.credit_score,
                    has_credit_card: formData.has_credit_card,
                    goals: formData.financial_goals.map(goal => ({ name: goal })), // Assuming 'Goal' is an object with a 'name' field
                }),
            });
    
            if (response.ok) {
                // Redirect or show success message
                navigate('/dashboard'); // Example redirection to a dashboard after account creation
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        
        <div className="form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                {/* Account Creation Fields */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Personal Details */}
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date_of_birth">Date of Birth:</label>
                    <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Financial Information */}
                <div>
                    <label htmlFor="annual_income">Annual Income:</label>
                    <input
                        type="number"
                        id="annual_income"
                        name="annual_income"
                        value={formData.annual_income}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="net_worth">Net Worth:</label>
                    <input
                        type="number"
                        id="net_worth"
                        name="net_worth"
                        value={formData.net_worth}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="chequing_balance">Chequing Balance:</label>
                    <input
                        type="number"
                        id="chequing_balance"
                        name="chequing_balance"
                        value={formData.chequing_balance}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="savings_balance">Savings Balance:</label>
                    <input
                        type="number"
                        id="savings_balance"
                        name="savings_balance"
                        value={formData.savings_balance}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="monthly_expense">Monthly Expense:</label>
                    <input
                        type="number"
                        id="monthly_expense"
                        name="monthly_expense"
                        value={formData.monthly_expense}
                        onChange={handleChange}
                    />
                </div>

                {/* Optional Fields */}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="is_home_owner"
                            checked={formData.is_home_owner}
                            onChange={handleChange}
                        />
                        Home Owner
                    </label>
                </div>
                <div>
                    <label htmlFor="occupation">Occupation:</label>
                    <select
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                    >
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Retired">Retired</option>
                    </select>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="is_student"
                            checked={formData.is_student}
                            onChange={handleChange}
                        />
                        Student
                    </label>
                </div>

                {/* Financial Goals (Multiple Selections) */}
                <div>
                    <label>Financial Goals (Select up to 3):</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="save_for_emergency"
                                checked={formData.financial_goals.includes('save_for_emergency')}
                                onChange={handleChange}
                            />
                            Save for Emergency
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="buy_a_home"
                                checked={formData.financial_goals.includes('buy_a_home')}
                                onChange={handleChange}
                            />
                            Buy a Home
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="pay_off_debt"
                                checked={formData.financial_goals.includes('pay_off_debt')}
                                onChange={handleChange}
                            />
                            Pay off Debt
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="invest_for_retirement"
                                checked={formData.financial_goals.includes('invest_for_retirement')}
                                onChange={handleChange}
                            />
                            Invest for Retirement
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="start_a_business"
                                checked={formData.financial_goals.includes('start_a_business')}
                                onChange={handleChange}
                            />
                            Start a Business
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="travel"
                                checked={formData.financial_goals.includes('travel')}
                                onChange={handleChange}
                            />
                            Travel
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="education_fund"
                                checked={formData.financial_goals.includes('education_fund')}
                                onChange={handleChange}
                            />
                            Education Fund
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="increase_credit_score"
                                checked={formData.financial_goals.includes('increase_credit_score')}
                                onChange={handleChange}
                            />
                            Increase Credit Score
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="early_retirement"
                                checked={formData.financial_goals.includes('early_retirement')}
                                onChange={handleChange}
                            />
                            Early Retirement
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="financial_goal"
                                value="financial_independence"
                                checked={formData.financial_goals.includes('financial_independence')}
                                onChange={handleChange}
                            />
                            Financial Independence
                        </label>
                    </div>
                </div>

                {/* Optional Fields for savings_goal, debt_amount, credit_score, and has_credit_card */}
                <div>
                    <label htmlFor="savings_goal">Savings Goal (optional):</label>
                    <input
                        type="number"
                        id="savings_goal"
                        name="savings_goal"
                        value={formData.savings_goal}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="debt_amount">Debt Amount (optional):</label>
                    <input
                        type="number"
                        id="debt_amount"
                        name="debt_amount"
                        value={formData.debt_amount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="credit_score">Credit Score (optional):</label>
                    <input
                        type="number"
                        id="credit_score"
                        name="credit_score"
                        value={formData.credit_score}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="has_credit_card"
                            checked={formData.has_credit_card}
                            onChange={handleChange}
                        />
                        Has Credit Card
                    </label>
                </div>

                   {/* Investment Risk Profile */}
                   <div>
                    <label htmlFor="investment_risk_profile">Investment Risk Profile:</label>
                    <select
                        id="investment_risk_profile"
                        name="investment_risk_profile"
                        value={formData.investment_risk_profile}
                        onChange={handleChange}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                {/* Terms and Conditions */}
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="terms_accepted"
                        name="terms_accepted"
                        checked={formData.terms_accepted}
                        onChange={handleChange}
                    />
                    <label htmlFor="terms_accepted">I agree to the terms and conditions</label>
                </div>

                {/* Submit Button */}
                <button type="submit" onClick={handleCreateAccountClick}>Create Account</button>
            </form>
        </div>
    );
};

export default Form;
