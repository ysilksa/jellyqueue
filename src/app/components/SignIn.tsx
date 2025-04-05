'use client';

import React from "react";
import styles from '../css/Login.module.css';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();

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
          src="/images/jellyqueuelogo.png"
          alt="JellyQueue Logo"
          className={styles.logo}
        />
        <h2 className={styles.welcome}>Welcome Back!</h2>

        <div className={styles.loginForm}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Enter your username"
          />

          <label className={styles.label}>Password:</label>
          <input
            type="password"
            className={styles.inputField}
            placeholder="Enter your password"
          />

          {/* <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button> */}
        <button className={styles.loginButton}>
            Login
          </button>
        </div>

        <p className={styles.registerText}>
          Don&apos;t have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
