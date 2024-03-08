import React, { useState } from 'react';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulate an API call
  const login = async () => {
    setLoading(true);
    setError('');

    // Login API endpoint
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    setLoading(false);

    if (response.ok) {
      console.log('Login successful', data);
      // Proceed with login success flow
    } else {
      setError(data.message || 'An error occurred during login.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!loginData.username || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    login();
  };

  return (
    <div style={{ width: '300px', margin: 'auto', padding: '20px', backgroundColor: 'lightgray', border: '1px solid black' }}>
      <form onSubmit={handleSubmit} aria-labelledby="loginForm">
        <h2 id="loginForm">Login</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            aria-required="true"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;