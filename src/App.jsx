import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <GoogleOAuthProvider clientId=" 274207504667-3mt33k26gif5aujrlrgvvtltr1go51ps.apps.googleusercontent.com">
      <div className="App">
        <p>Jelly Queue</p>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
