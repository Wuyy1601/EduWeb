import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);

function Recommend({ title }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Nếu API cần token đăng nhập, lấy ở localStorage
        const token = localStorage.getItem('token');
        fetch('http://localhost:8888/api/v1/course/all?page=1&size=4', {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 1000 && data.result) {
                    setCourses(data.result.data || []);
                }
                setLoading(false);
            })
            .catch((err) => setLoading(false));
    }, []);

    return (
        <section className={cx('recommend-container')}>
            <section className={cx('recommend')}>
                <div className={cx('course-header')}>
                    <h2>{title}</h2>
                    <a href="#">Xem tất cả</a>
                </div>
                {loading ? (
                    <p>Đang tải khóa học...</p>
                ) : (
                    <div className={cx('course-list')}>
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                thumbnail={course.thumbnailUrl}
                                title={course.courseName}
                                category={course.category}
                                price={course.price}
                                description={course.description}
                                author={course.author}
                                className={cx('card')}
                            />
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
}

export default Recommend;
