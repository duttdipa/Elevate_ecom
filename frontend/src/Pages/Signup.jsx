
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './CSS/Signup.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST request to the backend API to register the user
    axios.post("http://localhost:8000/register", user)
      .then((response) => {
        console.log("check", response);
        // Handle success, maybe redirect or show a success message
        alert("Registration successful. You have been registered Successfully");
        // Clear input fields after successful registration
        setName("");
        setEmail("");
        setPassword("");
        redirectToSignup();
      })
      .catch((error) => {
        // Handle error, maybe show an error message
        console.error("Registration failed", error);
        alert("Registration Error: An error occurred while registering",error);
      });
  };

  const redirectToSignup = () => {
    window.location.href = '/login'; // Redirect to the '/login' page
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          
          <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='check' checked/>
          <label htmlFor="check">By continuing, I agree to the terms of use & privacy policy.</label>
        </div>
        
        <button onClick={handleRegister}>Continue</button>
        <p className="loginsignup-login" onClick={redirectToSignup}>Already have an account? <span>Login here</span></p>
      </div>
    </div>
  );
};

export default Signup;
