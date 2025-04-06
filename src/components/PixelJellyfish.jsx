import React from 'react';
import styles from './css/PixelArt.module.css';

const SmallBlueJellyfish = () => {
    return (
        <img
            src="/pixelart/LargeBlueJellyfish.png"
            alt="Small Pixel Blue Jellyfish"    
            className={styles.smallImageContainer}
        />
    );
};

const LargeBlueJellyfish = () => {
    return (
        <img
            src="/pixelart/LargeBlueJellyfish.png"
            alt="Large Pixel Blue Jellyfish"    
            className={styles.largeImageContainer}
        />
    );
};

const SmallPurpleJellyfish = () => {
    return (
        <img
            src="/pixelart/LargePurpleJellyfish.png"
            alt="Small Pixel Purple Jellyfish"    
            className={styles.smallImageContainer}
        />
    );
};

const LargePurpleJellyfish = () => {
    return (
        <img
            src="/pixelart/LargePurpleJellyfish.png"
            alt="Large Pixel Purple Jellyfish"    
            className={styles.largeImageContainer}
        />
    );
};

const SmallBubbles = () => {
    return (
        <img 
        src="/pixelart/LargeBubbles.png"
        alt="Small Pixel Art of Bubbles"
        className={styles.smallImageContainer}
        />
    );
};

const LargeBubbles = () => {
    return (
        <img 
        src="/pixelart/LargeBubbles.png"
        alt="Large Pixel Art of Bubbles"
        className={styles.largeImageContainer}
        />
    );
};

export { SmallBlueJellyfish, LargeBlueJellyfish, SmallPurpleJellyfish, LargePurpleJellyfish, SmallBubbles, LargeBubbles };