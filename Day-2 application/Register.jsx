import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postData,getData} from '../Json/Db';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [data,setData] =useState([]);


  useEffect(() => {
    const fetch = async() => {
      const res = await getData();
      setData(res.data);
    }
    fetch();
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    let hasError = false;
    
    if (!name) {
      setNameError('Name is required');
      hasError = true;
    }
    
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }
    else if(email !== 0 && password !== 0 && name!== 0 && confirmPassword !==0)
      {
        const un = data ? data.findIndex(({uname})=>uname === name):-1;
        if(un !== -1)
        {
          alert('Username already exists');
          return;
        }
        else{
           const emails = data.map(item => item.email);
           if(emails.includes(email))
           {
             alert('Email already exists');
             return;
           }
           else
           {
             postData(name,email, password);
             alert('Successfully Registered');
             return ;
           }
        }

      }
    
   
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error name-error">{nameError}</p>}
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error email-error">{emailError}</p>}
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error password-error">{passwordError}</p>}
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <p className="error confirm-password-error">{confirmPasswordError}</p>}
        </div>
        <button type="submit" onClick={()=>{postData(name,email,password)}}>Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
