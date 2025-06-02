import styles from '../styles.module.scss';
import avatar from '@images/avatar.jpg';
import { useNavigate } from 'react-router-dom';

function CourseCard({ id, thumbnail, title, category, price, description, author }) {
    const navigate = useNavigate();

    return (
        <div
            className={styles.courseCard}
            onClick={() => navigate(`/reviewdocument/${id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.imageWrapper}>
                <img src={thumbnail} alt={title} />
            </div>
            <div className={styles.courseInfo}>
                <div className={styles.topInfo}>
                    <span className={styles.category}>{category}</span>
                </div>
                <h3 className={styles.courseTitle}>{title}</h3>
                <p className={styles.courseDesc}>{description}</p>
                <div className={styles.bottomInfo}>
                    <div className={styles.userInfo}>
                        <img src={avatar} alt={author} />
                        <span>{author}</span>
                    </div>
                    <div className={styles.priceInfo}>
                        <span className={styles.newPrice}>{price?.toLocaleString('vi-VN')} VND</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
