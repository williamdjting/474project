import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handles both login and sign-up, depending on the isSignUp state
  const handleAuth = async () => {
    setLoading(true);
    setError('');

    const endpoint = isSignUp ? 'https://qlmevm1ygc.execute-api.us-east-2.amazonaws.com/signup' : 'https://qlmevm1ygc.execute-api.us-east-2.amazonaws.com/login';
    const method = isSignUp ? 'Sign Up' : 'Login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`${method} successful`, data);
        setLoading(false);
        if (!isSignUp && onLoginSuccess) {
          onLoginSuccess();
        }
        if (isSignUp) {
          setIsSignUp(false); // Automatically switch to login after successful sign-up
        }
      } else {
        setError(data.message || `An error occurred during ${method.toLowerCase()}.`);
        setLoading(false);
      }
    } catch (error) {
      console.error(`${method} error:`, error);
      setError(`Network error or server is not responding during ${method.toLowerCase()}.`);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userData.username || !userData.password) {
      setError('Please fill in all fields');
      return;
    }
    handleAuth();
  };

  const toggleAuthMode = () => setIsSignUp(!isSignUp);

  return (
    <div style={{ width: '300px', margin: 'auto', padding: '20px', backgroundColor: 'lightgray', border: '1px solid black' }}>
      <form onSubmit={handleSubmit} aria-labelledby="authForm">
        <h2 id="authForm">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
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
            value={userData.password}
            onChange={handleChange}
            aria-required="true"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? `${isSignUp ? 'Signing Up' : 'Logging In'}...` : isSignUp ? 'Sign Up' : 'Login'}
        </button>
        <button type="button" onClick={toggleAuthMode} style={{ marginLeft: '10px' }}>
          {isSignUp ? 'Go to Login' : 'Go to Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
