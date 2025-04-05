import React from 'react';
import styles from './css/SignInPage.module.css';
import { Login } from '../components/LoginButton.jsx';

export default function SignInPage() {
    return (
        <div className={styles.wholePageContainer}>
            {/* Left side with jellyfish imagery */}
            <div className={styles.leftSideContainer}>
                <div className={styles.largeImageContainer}>
                    <img
                        src='../assets/pixelart/BlueJellyfish.png'
                        alt="Large Pixel Blue Jellyfish"
                        className={styles.largeImageContainer}
                    />
                </div>
            </div>

            {/* Right side with Login */}
            <div className={styles.rightSideContainer}>
                <Login/>
            </div>
        </div>
    );
}

export { SignInPage };