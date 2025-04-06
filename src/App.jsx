
import { useState, React } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Chatbot from './Chatbot';
import './App.css';
import { SignInPage } from './pages/SignInPage.jsx';

function LoginPage() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log('Login Success:', response);
    // You can also store token or user data in state or localStorage
    navigate('/chatbot');
  };

  return (
    <div className="App">
      <p>Jelly Queue</p>
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="274207504667-3mt33k26gif5aujrlrgvvtltr1go51ps.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
