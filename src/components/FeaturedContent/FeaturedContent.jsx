import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import imgLaptop from '@images/laptop.jpg';
import avatarLina from '@images/avatar.jpg';
import Button from '@components/Button/Button';

export default function FeaturedContent() {
    return (
        <section className={styles.featuredSection}>
            <div className={styles.headerRow}>
                <h2 className={styles.sectionTitle}>Nội dung nổi bật</h2>
                <a href="#" className={styles.viewAll}>
                    Xem tất cả
                </a>
            </div>
            <div className={styles.cardRow}>
                {[1, 2].map((_, idx) => (
                    <div className={styles.card} key={idx}>
                        <div className={styles.cardImageWrap}>
                            <img src={imgLaptop} alt="Class event" className={styles.cardImage} />
                        </div>
                        <div className={styles.cardBody}>
                            <a href="#" className={styles.cardTitle}>
                                Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
                            </a>
                            <div className={styles.cardAuthor}>
                                <img src={avatarLina} alt="Author Lina" className={styles.authorAvatar} />
                                <span className={styles.authorName}>Lina</span>
                            </div>
                            <p className={styles.cardDescription}>
                                Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates
                                exclusively...
                            </p>
                            <div className={styles.cardFooter}>
                                <a href="#" className={styles.readMore}>
                                    Read more
                                </a>
                                <span className={styles.cardViews}>
                                    <FontAwesomeIcon icon={faEye} /> 251,232
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.sliderControls}>
                <Button className={styles.sliderButton}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
                <Button className={styles.sliderButton}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </Button>
            </div>
        </section>
    );
}
