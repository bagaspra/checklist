import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useHistory dari React Router
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://94.74.86.174:8080/api/register', {
        email: email,
        username: username,
        password: password,
      });
      navigate.push('/login');
    } catch (error) {
      console.error('Gagal registrasi', error);
      alert('Gagal registrasi. Silakan coba lagi.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
