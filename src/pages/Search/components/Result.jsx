import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);

function Result({ title }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Nếu cần filter theo từ khóa search thì truyền thêm query param ở đây!
        const token = localStorage.getItem('token');
        fetch('http://localhost:8888/api/v1/course/all?page=1&size=12', {
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
        <section className={cx('result-container')}>
            <div className={cx('result')}>
                {loading ? (
                    <p>Đang tải kết quả...</p>
                ) : courses.length === 0 ? (
                    <p>Không tìm thấy khóa học nào.</p>
                ) : (
                    courses.map((course) => (
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
                    ))
                )}
            </div>
        </section>
    );
}

export default Result;
