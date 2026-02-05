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
        if 'Credit_Score' in self.df.columns:
            print("\n🎯 Target Variable Distribution:")
            print(self.df['Credit_Score'].value_counts())
            
            # Plot distribution
            plt.figure(figsize=(10, 6))
            self.df['Credit_Score'].value_counts().plot(kind='bar')
            plt.title('Credit Score Distribution')
            plt.xlabel('Credit Score Band')
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
        """Step 5: Feature Engineering"""
        print("\n⚙️ Performing feature engineering...")
        
        # Example feature engineering (customize based on your data)
        # 1. Create loan-to-income ratio
        if 'Monthly_Income' in self.df.columns and 'Loan_Amount' in self.df.columns:
            self.df['Loan_to_Income_Ratio'] = self.df['Loan_Amount'] / self.df['Monthly_Income']
        
        # 2. Create utilization per loan
        if 'Credit_Utilization' in self.df.columns and 'Total_Active_Loans' in self.df.columns:
            self.df['Utilization_Per_Loan'] = self.df['Credit_Utilization'] / (self.df['Total_Active_Loans'] + 1)
        
        # 3. Create payment reliability score
        if 'Missed_Payments_Last_12M' in self.df.columns:
            self.df['Payment_Reliability'] = 1 / (1 + self.df['Missed_Payments_Last_12M'])
        
        # 4. Create credit age group
        if 'Credit_History_Years' in self.df.columns:
            bins = [0, 2, 5, 10, float('inf')]
            labels = ['New', 'Young', 'Established', 'Mature']
            self.df['Credit_Age_Group'] = pd.cut(self.df['Credit_History_Years'], 
                                                 bins=bins, labels=labels)
        
        print(f"✅ Feature engineering complete. New shape: {self.df.shape}")
        print(f"New columns: {list(self.df.columns)}")
        
        return self.df
    
    def prepare_data(self, target_column='Credit_Score', test_size=0.2):
        """Prepare data for training"""
        print(f"\n📊 Preparing data (target: {target_column})...")
        
        if target_column not in self.df.columns:
            print(f"❌ Target column '{target_column}' not found in data")
            return None
        
        # Separate features and target
        X = self.df.drop(columns=[target_column])
        y = self.df[target_column]
        
        # Split the data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        print(f"✅ Data split complete:")
        print(f"   Training set: {self.X_train.shape[0]} samples")
        print(f"   Testing set: {self.X_test.shape[0]} samples")
        print(f"   Features: {self.X_train.shape[1]}")
        
        return self.X_train, self.X_test, self.y_train, self.y_test