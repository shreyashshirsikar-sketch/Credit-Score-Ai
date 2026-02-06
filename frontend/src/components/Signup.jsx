// src/components/Signup.jsx - FIXED VERSION
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FIXED: Using async/await instead of setTimeout with strings
  const handleSignup = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    
    try {
      // FIX: Use Promise with function reference
      await new Promise(resolve => {
        const timerId = setTimeout(() => {
          resolve();
          clearTimeout(timerId);
        }, 1500);
      });
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Sign up to manage your credit score securely</p>

        <div style={styles.form}>
          {/* Full Name */}
          <div style={styles.inputGroup}>
            <label htmlFor="signupFullName" style={styles.label}>
              Full Name
            </label>
            <div style={styles.inputWithIcon}>
              <input
                id="signupFullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label htmlFor="signupEmail" style={styles.label}>
              Email Address
            </label>
            <div style={styles.inputWithIcon}>
              <input
                id="signupEmail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label htmlFor="signupPassword" style={styles.label}>
              Password
            </label>
            <div style={styles.inputWithIcon}>
              <input
                id="signupPassword"
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={styles.showButton}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <div style={styles.inputWithIcon}>
              <input
                id="confirmPassword"
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                style={styles.input}
                required
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSignup}
          disabled={loading}
          style={loading ? { ...styles.submitButton, ...styles.buttonDisabled } : styles.submitButton}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div style={styles.divider}>
          <div style={styles.line}></div>
          <span style={styles.dividerText}>Or sign up with</span>
          <div style={styles.line}></div>
        </div>

        <button style={styles.googleButton}>
          Sign up with Google
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#EBF4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#09637E',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    marginBottom: '5px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  inputWithIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    backgroundColor: 'rgba(9, 99, 126, 0.1)',
    border: 'none',
    fontSize: '16px',
    color: '#09637E',
    outline: 'none'
  },
  showButton: {
    position: 'absolute',
    right: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#09637E',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: '#088395',
    color: 'white',
    fontWeight: '500',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '30px'
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0'
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: 'rgba(122, 178, 178, 0.4)'
  },
  dividerText: {
    padding: '0 12px',
    fontSize: '12px',
    color: '#9ca3af'
  },
  googleButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    color: '#09637E',
    fontWeight: '500',
    border: '1px solid rgba(122, 178, 178, 0.4)',
    cursor: 'pointer'
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#6b7280'
  },
  link: {
    color: '#088395',
    fontWeight: '500',
    cursor: 'pointer'
  }
};