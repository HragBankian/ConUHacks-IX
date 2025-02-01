import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
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
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
            <input type="number" step="0.01" name="annual_income" value={formData.annual_income} onChange={handleChange} />
            <input type="number" step="0.01" name="net_worth" value={formData.net_worth} onChange={handleChange} />
            <input type="number" step="0.01" name="chequing_balance" value={formData.chequing_balance} onChange={handleChange} />
            <input type="number" step="0.01" name="savings_balance" value={formData.savings_balance} onChange={handleChange} />
            <input type="number" step="0.01" name="monthly_expense" value={formData.monthly_expense} onChange={handleChange} />
            <label>
                Home Owner:
                <input type="checkbox" name="is_home_owner" checked={formData.is_home_owner} onChange={handleChange} />
            </label>
            <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
                <option value="Other">Other</option>
            </select>
            <label>
                Student:
                <input type="checkbox" name="is_student" checked={formData.is_student} onChange={handleChange} required />
            </label>
            <input type="number" step="0.01" name="savings_goal" value={formData.savings_goal} onChange={handleChange} />
            <select name="investment_risk_profile" value={formData.investment_risk_profile} onChange={handleChange} required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <input type="number" step="0.01" name="debt_amount" value={formData.debt_amount} onChange={handleChange} />
            <input type="number" name="credit_score" value={formData.credit_score} onChange={handleChange} />
            <label>
                Has Credit Card:
                <input type="checkbox" name="has_credit_card" checked={formData.has_credit_card} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;