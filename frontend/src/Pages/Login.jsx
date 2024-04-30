
import React, { useState,useContext } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './CSS/Login.css';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ShopContext } from '../Context/ShopContext'; // Import ShopContext

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoginStatus,isLoggedIn } = useContext(ShopContext)


  const handlelogin = () => {
    const user = {
      email: email,
      password: password,
    };

    // send a POST request to the backend API to register the user
    axios.post("http://localhost:8000/login", user)
    .then((response) => {
        console.log("response---->", response.data.token);
        const {token,isAdmin} = response.data;
        AsyncStorage.setItem("authToken", token);
        if(isAdmin){
          setLoginStatus();
          window.location.href = '/adminscreen';
        }else{
          setLoginStatus();
        console.log("login-->",isLoggedIn)
        redirectToMain();
        }
      })
      .catch((error) => {
        alert("Login Error", "Invalid Email or password");
        console.log(error);
      });
  };

  const redirectToSignup = () => {
    window.location.href = '/Signup'; // Redirect to the '/login' page
  };
  const redirectToMain = () => {
    window.location.href = '/'; // Redirect to the '/login' page
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          {/* Connect input fields to state and handle changes */}
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* Call handleRegister function on button click */}
        <button onClick={handlelogin}>Continue</button>
        <p className="loginsignup-login" >Don't have an account? <span onClick={redirectToSignup}>Signup here</span></p>
      </div>
    </div>
  );
};

export default () => (
  <ShopContext.Consumer>
    {(context) => <Login {...context} />}
  </ShopContext.Consumer>
);
