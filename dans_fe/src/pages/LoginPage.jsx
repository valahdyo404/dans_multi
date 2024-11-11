import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../config/api';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { useDispatch } from 'react-redux';
import { setToken } from '../config/slices/authSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await login({ username, password });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      dispatch(setToken(token));
      navigate('/jobs');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Button label="Login" onClick={handleLogin} className="mt-4" />
    </div>
  );
};

export default LoginPage;
