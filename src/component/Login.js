import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Make a POST request to your authentication endpoint
    fetch('http://192.168.1.14:5001/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      // Store the token in local storage
      localStorage.setItem('token', data.token);
      // Redirect to the main page
      window.location.href = '/main';
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
        <h3>Enter you information to login</h3>
        <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
    </div>
   
  );
}

export default LoginPage;