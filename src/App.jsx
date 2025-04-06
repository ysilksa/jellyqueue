import { useState } from 'react'
import './App.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Chatbot from './Chatbot';

function App() {
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    // <GoogleOAuthProvider clientId="274207504667-3mt33k26gif5aujrlrgvvtltr1go51ps.apps.googleusercontent.com">
    //   <div className="App">
    //     <p>Jelly Queue</p>
    //     <GoogleLogin
    //       onSuccess={responseGoogle}
    //       onError={() => {
    //         console.log('Login Failed');
    //       }}
    //     />
    //   </div>
    // </GoogleOAuthProvider>
    <div className="App">
      <Chatbot />
    </div>
    
  );
}

export default App;
