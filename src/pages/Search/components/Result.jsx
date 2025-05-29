import CourseCard from './CourseCard';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);

function Result({ courses }) {
    return (
        <section className={cx('result-container')}>
            <div className={cx('result')}>
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>
        </section>
    );
}

export default Result;
