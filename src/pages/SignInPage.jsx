import React from 'react';
import styles from './css/SignInPage.module.css';
import { Login } from '../components/LoginButton.jsx';
import { SmallBlueJellyfish, LargeBlueJellyfish, SmallPurpleJellyfish, LargePurpleJellyfish, SmallBubbles, LargeBubbles } from '../components/PixelJellyfish.jsx';

export default function SignInPage({ GoogleButton }) {
    return (
        <div className={styles.wholePageContainer}>
            {/* Left side with jellyfish imagery */}
            <div className={styles.leftSideContainer}>
                <div className={styles.leftHorizontalContainer}>
                    <LargeBlueJellyfish/>
                    <div className={styles.leftVerticalContainer}>
                            <SmallPurpleJellyfish/>
                            <SmallBubbles/>
                    </div>
                        
                </div>
                
                <div className={styles.leftHorizontalContainer}>
                    <div className={styles.leftVerticalContainer}>
                            <SmallPurpleJellyfish/>
                            <SmallBubbles/>
                    </div>
                    <LargeBlueJellyfish/>            
                </div>
            </div>

            {/* Right side with Login */}
            <div className={styles.rightSideContainer}>
                <Login
                GoogleAuthentication={GoogleButton}/>
                
            </div>
        </div>
    );
}

export { SignInPage };