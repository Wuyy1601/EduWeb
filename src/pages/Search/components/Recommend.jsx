import CourseCard from './CourseCard';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);

function Recommend({ title }) {
    return (
        <section className={cx('recommend-container')}>
            <section className={cx('recommend')}>
                <div className={cx('course-header')}>
                    <h2>{title}</h2>
                    <a href="#">Xem tất cả</a>
                </div>

                <div className={cx('course-list')}>
                    {Array(4)
                        .fill()
                        .map((_, index) => (
                            <CourseCard key={index} id={index + 1} />
                        ))}
                </div>
            </section>
        </section>
    );
}

export default Recommend;
