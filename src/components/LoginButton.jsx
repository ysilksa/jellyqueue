'use client';

import React from "react";
import styles from './css/Login.module.css';
// import { useRouter } from 'next/navigation';

export default function Login({ GoogleAuthentication })  {
  // const router = useRouter();

  //   const handleLogin = () => {
  //     router.push('/profile'); // Navigate to /profile on login
  //   };

  return (
    <div className={styles.loginContainer}>
        {/* Background Blobs */}
        <div className={styles.blob}></div>
        <div className={styles.blob2}></div>

        <div className={styles.loginBox}>
          <img
            src="/pixelart/LargePurpleJellyfish.png"
            alt="JellyQueue Logo"
            className={styles.logo}
          />
          <h2 className={styles.welcome}>Welcome Back!</h2>

          <div className={styles.googleButtonContainer}>
            { GoogleAuthentication }
          </div>

          <p className={styles.registerText}>
            Don&apos;t have an account? <a href="#">Register</a>
          </p>
        </div>
        
      
    </div>
  );
};

export { Login };
