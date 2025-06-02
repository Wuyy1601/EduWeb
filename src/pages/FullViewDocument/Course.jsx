import styles from './styles.module.scss';
import CourseCard from './CourseCard';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button/Button';

function Courses({ title, size = 12 }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8888/api/v1/course/all?page=1&size=${size}`, {
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
            .catch(() => setLoading(false));
    }, [size]); // size đổi thì tự fetch lại

    return (
        <div className={styles.courseContainer}>
            <section className={styles.courses}>
                <div className={styles.courseHeader}>
                    <h2>{title}</h2>
                    <a href="#">Xem tất cả</a>
                </div>
                {loading ? (
                    <p>Đang tải khóa học...</p>
                ) : (
                    <div className={styles.courseGrid}>
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
                            />
                        ))}
                    </div>
                )}
                <div className={styles.sliderButtons}>
                    <Button className={styles.sliderButton} content={<FontAwesomeIcon icon={faAngleLeft} />}></Button>
                    <Button className={styles.sliderButton} content={<FontAwesomeIcon icon={faAngleRight} />}></Button>
                </div>
            </section>
        </div>
    );
}
export default Courses;
