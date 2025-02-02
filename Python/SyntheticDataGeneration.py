import random
import pandas as pd
from datetime import datetime, timedelta

# Constants
MAX_AGE = 100
AGE_DISTRIBUTION = [(18, 40, 0.55), (41, 65, 0.30), (66, 85, 0.10), (86, 100, 0.05)]
OCCUPATIONS = ['Employed', 'Self-Employed', 'Unemployed', 'Retired']
INVESTMENT_PROFILES = ['Low', 'Medium', 'High']

# Function to generate a realistic age distribution
def generate_age():
    rand_value = random.random()
    cumulative = 0
    for min_age, max_age, prob in AGE_DISTRIBUTION:
        cumulative += prob
        if rand_value <= cumulative:
            return random.randint(min_age, max_age)
    return random.randint(18, MAX_AGE)

# Function to calculate TFSA limit based on age
# Assume 7000$ per year starting from age 18
def calculate_tfsa_limit(age):
    return max(0, (age - 18) * 7000)

# Function to calculate financial success score
def calculate_financial_success(user):
    score = 50  # Base score
    min_score = -90
    max_score = 85
    
    # Savings evaluation (relative to monthly expenses)
    ideal_savings = user['monthly_expense'] * 6 if user['monthly_expense'] else 0
    total_savings = (user['chequing_balance'] or 0) + (user['savings_balance'] or 0)
    
    savings_ratio = total_savings / ideal_savings if ideal_savings else 0
    if savings_ratio < 0.25:
        score -= 20
    elif savings_ratio < 0.5:
        score -= 10
    elif savings_ratio < 1.0:
        score += 5
    elif savings_ratio > 2.0:
        score -= 5
    else:
        score += 10
    
    # Investment distribution
    if user['tfsa_limit'] and user['tfsa_invested'] < user['tfsa_limit']:
        unregistered_ratio = user['unregistered_balance'] / user['tfsa_limit'] if user['tfsa_limit'] else 0
        if unregistered_ratio > 1.5:
            score -= 20
        elif unregistered_ratio > 1.2:
            score -= 15
        elif unregistered_ratio > 1.0:
            score -= 10
        elif unregistered_ratio > 0.5:
            score -= 5
        else:
            score += 5
    
    # Debt evaluation
    debt_ratio = (user['debt_amount'] or 0) / (user['annual_income'] or 1)
    if debt_ratio > 1.0:
        score -= 30
    elif debt_ratio > 0.75:
        score -= 20
    elif debt_ratio > 0.5:
        score -= 10
    elif debt_ratio > 0.25:
        score -= 5
    else:
        score += 10
    
    # Investment priorities based on goals
    if 'buy_a_home' in user['financial_goals'] and not user['is_home_owner']:
        fhsa_ratio = user['fhsa_invested'] / user['fhsa_limit'] if user['fhsa_limit'] else 0
        if fhsa_ratio < 0.2:
            score -= 15
        elif fhsa_ratio < 0.4:
            score -= 10
        elif fhsa_ratio < 0.6:
            score -= 5
    
    if 'invest_for_retirement' in user['financial_goals']:
        rrsp_ratio = user['rrsp_invested'] / user['rrsp_limit'] if user['rrsp_limit'] else 0
        if rrsp_ratio < 0.2:
            score -= 10
        elif rrsp_ratio < 0.4:
            score -= 7
        elif rrsp_ratio < 0.6:
            score -= 5
    
    # Over-investment warnings
    for account in ['fhsa', 'tfsa', 'rrsp']:
        if user[f'{account}_invested'] > user[f'{account}_limit']:
            score -= 25
    
    # Expense to income ratio
    income_ratio = (user['monthly_expense'] or 0) / (user['annual_income'] / 12 or 1)
    if income_ratio > 0.7:
        score -= 20
    elif income_ratio > 0.5:
        score -= 10
    elif income_ratio < 0.3:
        score += 10
    
    # Normalize score between 0 and 1
    score = (score - min_score) / (max_score - min_score)
    
    return score

# Generate synthetic dataset
synthetic_data = []
for _ in range(10000):
    age = generate_age()
    tfsa_limit = calculate_tfsa_limit(age)
    is_student = (age <= 26 and random.random() < 0.90) or (27 <= age <= 35 and random.random() < 0.25)
    occupation = random.choice(['Unemployed', 'Part-Time']) if is_student else random.choice(OCCUPATIONS)
    is_home_owner = random.random() < 0.50
    has_credit_card = random.random() < 0.85
    debt_amount = round(random.uniform(0, 100000), 2) if random.random() < 0.50 else 0
    monthly_expense = round(random.uniform(500, 5000), 2)
    annual_income = round(random.uniform(30000, 150000), 2)
    
    user = {
        'age': age,
        'annual_income': annual_income,
        'monthly_expense': monthly_expense,
        'chequing_balance': round(random.uniform(0, 20000), 2),
        'savings_balance': round(random.uniform(0, 50000), 2),
        'is_home_owner': is_home_owner,
        'is_student': is_student,
        'occupation': occupation,
        'investment_risk_profile': random.choice(INVESTMENT_PROFILES),
        'debt_amount': debt_amount,
        'has_credit_card': has_credit_card,
        'tfsa_limit': tfsa_limit,
        'tfsa_invested': round(random.uniform(0, tfsa_limit * 1.2), 2),
        'fhsa_limit': round(random.uniform(0, 40000), 2),
        'fhsa_invested': round(random.uniform(0, 40000), 2),
        'rrsp_limit': round(random.uniform(0, 50000), 2),
        'rrsp_invested': round(random.uniform(0, 50000), 2),
        'unregistered_balance': round(random.uniform(0, 100000), 2),
        'financial_goals': random.sample(['buy_a_home', 'invest_for_retirement', 'pay_off_debt'], k=random.randint(0, 3))
    }
    user['financial_success'] = calculate_financial_success(user)
    synthetic_data.append(user)

# Save dataset to CSV
pd.DataFrame(synthetic_data).to_csv('Python/synthetic_data.csv', index=False)