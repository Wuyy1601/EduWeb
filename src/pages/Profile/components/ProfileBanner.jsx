import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Button from '@components/Button/Button';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

function ProfileBanner({
    profilePicture,
    backgroundImage,
    name,
    title,
    description,
    rating,
    followers,
    onFollow,
    isFollowing,
}) {
    return (
        <section className={cx('profile-banner')} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <img src={profilePicture} alt={name} className={cx('profile-avatar')} />

            <div className={cx('profile-banner__content')}>
                <div className={cx('profile-banner__header')}>
                    <div>
                        <h1 className={cx('profile-name')}>{name}</h1>
                        <p className={cx('profile-title')}>{title}</p>
                    </div>
                    <Button
                        className={cx('follow-button', {
                            followed: isFollowing,
                        })}
                        content={isFollowing ? 'Huỷ theo dõi' : 'Theo dõi'}
                        onClick={onFollow}
                    />
                </div>

                <p className={cx('profile-banner__description')}>{description}</p>

                <div className={cx('profile-banner__footer')}>
                    <div className={cx('profile-stats')}>
                        <div className={cx('rating')}>
                            <FontAwesomeIcon icon={faStar} />
                            <span>{rating}</span>
                            <span>Đánh giá</span>
                        </div>
                        <div className={cx('follower')}>
                            <FontAwesomeIcon icon={faEye} />
                            <span>{followers}</span>
                            <span>Theo dõi</span>
                        </div>
                    </div>
                    <div className={cx('social')}>
                        <Link href="#" className={cx('social__link')} aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link href="#" className={cx('social__link')} aria-label="Youtube">
                            <FontAwesomeIcon icon={faYoutube} />
                        </Link>
                        <Link href="#" className={cx('social__link')} aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileBanner;
