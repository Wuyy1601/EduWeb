import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import CourseCard from '../components/CourseCard';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

function Documents() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const currentPage = parseInt(searchParams.get('page') || 1, 10);
    const pageSize = 8;

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8888/api/v1/course/all?page=${currentPage}&size=${pageSize}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 1000 && data.result) {
                    setCourses(data.result.data || []);
                    setTotalPages(data.result.totalPages || 1);
                } else {
                    setCourses([]);
                    setTotalPages(1);
                }
                setLoading(false);
            })
            .catch(() => {
                setCourses([]);
                setTotalPages(1);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <>
            <div id={cx('documents-container')}>
                {loading ? (
                    <p>Đang tải tài liệu...</p>
                ) : courses.length === 0 ? (
                    <p>Không có tài liệu nào.</p>
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
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setSearchParams({ page })}
            />
        </>
    );
}

export default Documents;
