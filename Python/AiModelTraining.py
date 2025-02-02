import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib

# Load the synthetic data
data = pd.read_csv('Python/synthetic_data.csv')

# Features and target selection
features = [
    'age', 'annual_income', 'monthly_expense', 'chequing_balance', 'savings_balance',
    'is_home_owner', 'is_student', 'debt_amount', 'has_credit_card', 'tfsa_limit', 'tfsa_invested',
    'fhsa_limit', 'fhsa_invested', 'rrsp_limit', 'rrsp_invested', 'unregistered_balance'
]
target = 'financial_success'

X = data[features]
y = data[target]

# Convert categorical variables into numerical values
X = pd.get_dummies(X, drop_first=True)

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a machine learning pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train the model
pipeline.fit(X_train, y_train)

# Save the trained model
joblib.dump(pipeline, 'Python/AiModel.pkl')

print("Model training complete and saved as 'AiModel.pkl'")