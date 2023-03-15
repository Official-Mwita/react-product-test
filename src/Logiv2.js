import React, { useEffect, useState } from 'react';

function Login() {


  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const handleLogin = () => {
    // Make a POST request to the login endpoint with the email and password
    fetch('http://192.168.1.14:5001/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Login failed');
      }
    })
    .then(data => {
      // Store the authorization token in local storage
      localStorage.setItem('token', data.token);
      // Redirect to the product table page
      window.location.href = '/main';
    })
    .catch(error => setError(error.message));
  };

  useEffect(() => {

    if(token)
        window.location = '/main'
        
  }, [token]);

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <label>
          email:
          <input type="text" value={email} onChange={e => setemail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Log In</button>
      </form>
    </div>
  );
}

export default Login;
