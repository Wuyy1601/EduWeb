import { useState, useEffect } from 'react';
import CourseCard from './CourseCard'; // import đúng đường dẫn tới CourseCard
import styles from './styles.module.scss';

function RecommendedDocuments() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dữ liệu gợi ý, có thể thay đổi API endpoint nếu cần
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
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Tài liệu gợi ý</h2>
                <a href="#">Xem tất cả</a>
            </div>
            <div className={styles.cardWrapper}>
                {loading ? (
                    <p>Đang tải tài liệu...</p>
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
                            className={styles.card}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default RecommendedDocuments;
