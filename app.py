import os
from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

# Configure template path
template_path = os.path.abspath(r'C:\Users\Akshar Savaliya\OneDrive\Desktop\churnprediction\templates')

# Create Flask app with custom template folder
app = Flask(__name__, template_folder=template_path)

# Load the churn prediction model
model = joblib.load("C:\\Users\\Akshar Savaliya\\OneDrive\\Desktop\\churnprediction\\model\\miniproject\\best_churn_model.pkl")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract features from the data
        customer_age = float(data['customer_age'])
        customer_income = float(data['customer_income'])
        product_usage = float(data['product_usage'])

        # Prepare feature array
        features = np.array([[customer_age, customer_income, product_usage]])

        # Make prediction
        prediction = model.predict(features)

        # Return result
        return jsonify({'prediction': 'Churn' if prediction[0] == 1 else 'No Churn'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Verify template path (for debugging)
    print(f"Looking for templates in: {template_path}")
    print(f"Template exists: {os.path.exists(os.path.join(template_path, 'index.html'))}")
    
    app.run(debug=True)