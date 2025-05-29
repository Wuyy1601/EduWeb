import React from 'react';
import styles from './styles.module.scss';

function FeaturedCard({ image, title, description, discount }) {
    return (
        <div className={styles.featuredCard}>
            <img src={image} alt="Instructor" />
            <div className={styles.overlay}>
                <div className={styles.discount}>{discount}</div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default FeaturedCard;
