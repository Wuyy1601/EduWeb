import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import CourseCard from './CourseCard'; // Đảm bảo đúng đường dẫn
import { FaCaretDown } from 'react-icons/fa';

function FeaturedContent() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8888/api/v1/course/all?page=1&size=2', {
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

    const { featuredContent, card, header, contentWrapper, sliderButtons, sliderButton } = styles;

    return (
        <div className={featuredContent}>
            <div className={card}>
                <div className={header}>
                    <h2>Nội dung nổi bật</h2>
                    <a href="#">Xem tất cả</a>
                </div>
                <div className={contentWrapper}>
                    {loading ? (
                        <p>Đang tải nội dung nổi bật...</p>
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
                <div className={sliderButtons}>
                    <Button className={sliderButton} content={<FontAwesomeIcon icon={faAngleLeft} />}></Button>
                    <Button className={sliderButton} content={<FontAwesomeIcon icon={faAngleRight} />}></Button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedContent;
