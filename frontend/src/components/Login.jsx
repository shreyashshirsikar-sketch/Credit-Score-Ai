// src/components/Login.jsx - FIXED VERSION
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // FIXED: Using async/await instead of setTimeout with strings
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
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
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="loginEmail" style={styles.label}>
              Email Address
            </label>
            <input
              id="loginEmail"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="loginPassword" style={styles.label}>
              Password
            </label>
            <input
              id="loginPassword"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={styles.link}
          >
            Sign up
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
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(122, 178, 178, 0.3)'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#09637E',
    marginBottom: '8px'
  },
  subtitle: {
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
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(122, 178, 178, 0.4)',
    fontSize: '16px',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    backgroundColor: '#088395',
    color: 'white',
    fontWeight: '600',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '14px',
    color: '#6b7280'
  },
  link: {
    color: '#088395',
    fontWeight: '600',
    cursor: 'pointer'
  }
};