import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './LoginSignup.css'
import SignUp from './SignUp';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // useNavigate hook to handle navigation
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, redirect to dashboard
      navigate('/dashboard');
      console.log('successfully lodged in')
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error display or alerts here
    }
  };
  const signUp = ()=>{
    navigate('/signup')
  }
  return (
    <div className='form'>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <span onClick={signUp}>Sign up</span>
    </div>
  );
};

export default Login;
