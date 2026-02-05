# ml_model/data_processor.py
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
import joblib
import os

class DataProcessor:
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.df = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        
    def load_data(self):
        """Step 2: Load data"""
        print("📂 Loading data...")
        self.df = pd.read_csv(self.csv_path)
        print(f"✅ Data loaded: {self.df.shape[0]} rows, {self.df.shape[1]} columns")
        print(f"Columns: {list(self.df.columns)}")
        return self.df
    
    def clean_data(self):
        """Step 3: Data Cleaning"""
        print("\n🧹 Cleaning data...")
        
        # Check for missing values
        print(f"Missing values before cleaning:\n{self.df.isnull().sum()}")
        
        # Handle missing values (example strategies)
        # For numerical columns, fill with median
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            if self.df[col].isnull().any():
                self.df[col].fillna(self.df[col].median(), inplace=True)
        
        # For categorical columns, fill with mode
        categorical_cols = self.df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if self.df[col].isnull().any():
                self.df[col].fillna(self.df[col].mode()[0], inplace=True)
        
        # Remove duplicates
        initial_rows = len(self.df)
        self.df = self.df.drop_duplicates()
        print(f"Removed {initial_rows - len(self.df)} duplicate rows")
        
        print(f"✅ Missing values after cleaning:\n{self.df.isnull().sum()}")
        
        # Remove outliers using IQR method (optional)
        self.remove_outliers()
        
        return self.df
    
    def remove_outliers(self):
        """Remove outliers using IQR method"""
        print("\n📊 Removing outliers...")
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns
        
        for col in numeric_cols:
            Q1 = self.df[col].quantile(0.25)
            Q3 = self.df[col].quantile(0.75)
            IQR = Q3 - Q1
            
            # Define bounds
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            # Count outliers
            outliers = self.df[(self.df[col] < lower_bound) | (self.df[col] > upper_bound)]
            if len(outliers) > 0:
                print(f"  {col}: {len(outliers)} outliers removed")
                self.df = self.df[(self.df[col] >= lower_bound) & (self.df[col] <= upper_bound)]
    
    def exploratory_analysis(self):
        """Step 4: Exploratory Data Analysis (EDA)"""
        print("\n📈 Performing EDA...")
        
        # Create EDA directory
        os.makedirs("eda_results", exist_ok=True)
        
        # 1. Basic statistics
        print("\n📊 Basic Statistics:")
        print(self.df.describe())
        
        # Save statistics to file
        self.df.describe().to_csv("eda_results/basic_statistics.csv")
        
        # 2. Target variable distribution
        if 'CIBIL_Score_Band' in self.df.columns:
            print("\n🎯 Target Variable Distribution:")
            print(self.df['CIBIL_Score_Band'].value_counts())
            
            # Plot distribution
            plt.figure(figsize=(10, 6))
            self.df['CIBIL_Score_Band'].value_counts().plot(kind='bar')
            plt.title('CIBIL Score Band Distribution')
            plt.xlabel('CIBIL Score Band')
            plt.ylabel('Count')
            plt.tight_layout()
            plt.savefig('eda_results/target_distribution.png')
            plt.close()
        
        # 3. Correlation matrix
        numeric_df = self.df.select_dtypes(include=[np.number])
        if len(numeric_df.columns) > 1:
            plt.figure(figsize=(12, 10))
            correlation_matrix = numeric_df.corr()
            sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
            plt.title('Feature Correlation Matrix')
            plt.tight_layout()
            plt.savefig('eda_results/correlation_matrix.png')
            plt.close()
            
            print("\n🔥 Top Correlations:")
            corr_matrix = numeric_df.corr()
            for col in corr_matrix.columns:
                top_corr = corr_matrix[col].sort_values(ascending=False)[1:4]
                print(f"{col}: {list(top_corr.items())}")
        
        # 4. Feature distributions
        print("\n📊 Feature Distributions saved to eda_results/")
        numeric_cols = numeric_df.columns
        for i, col in enumerate(numeric_cols[:6]):  # First 6 features
            plt.figure(figsize=(10, 6))
            plt.subplot(2, 3, i+1)
            self.df[col].hist(bins=30)
            plt.title(f'{col} Distribution')
            plt.tight_layout()
        plt.savefig('eda_results/feature_distributions.png')
        plt.close()
        
        print("✅ EDA completed. Results saved to 'eda_results/' folder")
    
    def feature_engineering(self):
        """Step 5: Feature Engineering - ONLY NUMERIC FEATURES"""
        print("\n⚙️ Performing feature engineering...")
        
        # IMPORTANT: Only create numeric features to avoid scaling issues
        
        # 1. Create loan-to-income ratio
        if 'Monthly_Income' in self.df.columns and 'Loan_Amount' in self.df.columns:
            self.df['Loan_to_Income_Ratio'] = self.df['Loan_Amount'] / (self.df['Monthly_Income'] + 0.001)  # Add epsilon to avoid division by zero
            print("  ✅ Added Loan_to_Income_Ratio")
        
        # 2. Create utilization per loan (numeric)
        if 'Credit_Utilization' in self.df.columns and 'Total_Active_Loans' in self.df.columns:
            self.df['Utilization_Per_Loan'] = self.df['Credit_Utilization'] / (self.df['Total_Active_Loans'] + 0.001)
            print("  ✅ Added Utilization_Per_Loan")
        
        # 3. Create payment reliability score (numeric, 0-1)
        if 'Missed_Payments_Last_12M' in self.df.columns:
            self.df['Payment_Reliability'] = 1.0 / (1.0 + self.df['Missed_Payments_Last_12M'])
            print("  ✅ Added Payment_Reliability")
        
        # 4. Create debt-to-income ratio (numeric)
        if 'Monthly_Income' in self.df.columns and 'Total_Active_Loans' in self.df.columns:
            self.df['Debt_to_Income'] = (self.df['Total_Active_Loans'] * 100000) / (self.df['Monthly_Income'] + 0.001)
            print("  ✅ Added Debt_to_Income")
        
        # 5. Create credit score to income ratio (numeric)
        if 'CIBIL_Score' in self.df.columns and 'Monthly_Income' in self.df.columns:
            self.df['Score_to_Income_Ratio'] = self.df['CIBIL_Score'] / (self.df['Monthly_Income'] + 0.001)
            print("  ✅ Added Score_to_Income_Ratio")
        
        # 6. Create interaction term: Age * Credit History
        if 'Age' in self.df.columns and 'Credit_History_Years' in self.df.columns:
            self.df['Age_Credit_Interaction'] = self.df['Age'] * self.df['Credit_History_Years']
            print("  ✅ Added Age_Credit_Interaction")
        
        print(f"✅ Feature engineering complete. New shape: {self.df.shape}")
        print(f"New columns: {list(self.df.columns)}")
        
        return self.df
    
    def prepare_data(self, target_column='CIBIL_Score_Band', test_size=0.2):
        """Prepare data for training - REMOVES NON-NUMERIC COLUMNS"""
        print(f"\n📊 Preparing data (target: {target_column})...")
        
        if target_column not in self.df.columns:
            print(f"❌ Target column '{target_column}' not found in data")
            return None
        
        # Separate features and target
        X = self.df.drop(columns=[target_column])
        y = self.df[target_column]
        
        # Remove Customer_ID (identifier, not useful for prediction)
        if 'Customer_ID' in X.columns:
            X = X.drop(columns=['Customer_ID'])
            print("🗑️ Removed Customer_ID column")
        
        # Remove CIBIL_Score (redundant with CIBIL_Score_Band)
        if 'CIBIL_Score' in X.columns:
            X = X.drop(columns=['CIBIL_Score'])
            print("🗑️ Removed CIBIL_Score column (redundant with target)")
        
        # CRITICAL FIX: Remove ALL non-numeric columns
        non_numeric_cols = X.select_dtypes(exclude=[np.number]).columns
        if len(non_numeric_cols) > 0:
            print(f"🗑️ Removing non-numeric columns: {list(non_numeric_cols)}")
            X = X.drop(columns=non_numeric_cols)
        
        # Also check for categorical columns that might be stored as numeric
        # (e.g., Loan_Tenure_Months might have string values)
        for col in X.columns:
            # Try to convert to numeric, if it fails, remove the column
            try:
                pd.to_numeric(X[col])
            except Exception as e:
                print(f"🗑️ Removing column '{col}' that can't be converted to numeric")
                X = X.drop(columns=[col])
        
        # Handle any NaN values that might have been created
        if X.isna().any().any():
            print(f"⚠️ Filling NaN values with column medians")
            X = X.fillna(X.median())
        
        print(f"✅ Final features ({X.shape[1]}): {list(X.columns)}")
        
        # Split the data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        print(f"✅ Data split complete:")
        print(f"   Training set: {self.X_train.shape[0]} samples")
        print(f"   Testing set: {self.X_test.shape[0]} samples")
        print(f"   Features: {self.X_train.shape[1]}")
        
        return self.X_train, self.X_test, self.y_train, self.y_test