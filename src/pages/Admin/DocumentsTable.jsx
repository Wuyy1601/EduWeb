import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

export default function DocumentsTable() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchCourses();
    }, [currentPage]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8888/api/v1/course/all?page=${currentPage}&size=${pageSize}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (data.code === 1000 && data.result) {
                setCourses(data.result.data || []);
                setTotalPages(data.result.totalPages || 1);
            } else {
                setError('Không thể tải danh sách khóa học');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Lỗi khi tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    const handleViewCourse = (courseId) => {
        // Chuyển đến FullViewDocument với admin privileges
        navigate(`/course/${courseId}`);
    };

    const handleDeleteCourse = async (courseId, courseName) => {
        if (!confirm(`Bạn có chắc chắn muốn xóa khóa học "${courseName}"?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8888/api/v1/course/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                alert('Xóa khóa học thành công!');
                fetchCourses(); // Refresh data
            } else {
                throw new Error('Xóa khóa học thất bại');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Lỗi khi xóa khóa học: ' + error.message);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Đang tải danh sách khóa học...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <button onClick={fetchCourses} className={styles.retryButton}>
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <h2>📚 Quản lý khóa học ({courses.length} khóa học)</h2>
                <button 
                    onClick={fetchCourses} 
                    className={styles.refreshButton}
                    disabled={loading}
                >
                    🔄 Refresh
                </button>
            </div>

            {courses.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>📭 Không có khóa học nào</p>
                </div>
            ) : (
                <>
                    <div className={styles.tableWrapper}>
                        <table className={styles.documentsTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Thumbnail</th>
                                    <th>Tên khóa học</th>
                                    <th>Tác giả</th>
                                    <th>Thể loại</th>
                                    <th>Cấp độ</th>
                                    <th>Trạng thái</th>
                                    <th>Videos</th>
                                    <th>Đánh giá</th>
                                    <th>Ngày tạo</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id}>
                                        <td className={styles.courseId}>{course.id}</td>
                                        <td className={styles.thumbnailCell}>
                                            {course.thumbnailUrl ? (
                                                <img 
                                                    src={course.thumbnailUrl} 
                                                    alt={course.courseName}
                                                    className={styles.thumbnail}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className={styles.noThumbnail}>📷</div>
                                            )}
                                        </td>
                                        <td className={styles.courseName} title={course.courseName}>
                                            {course.courseName}
                                        </td>
                                        <td>{course.author}</td>
                                        <td>{course.category}</td>
                                        <td>
                                            <span className={`${styles.levelBadge} ${styles[course.level]}`}>
                                                {course.level}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${course.isPublished ? styles.published : styles.draft}`}>
                                                {course.isPublished ? '✅ Published' : '⏳ Draft'}
                                            </span>
                                        </td>
                                        <td className={styles.videoCount}>
                                            {course.videoFiles ? course.videoFiles.length : 0} video(s)
                                        </td>
                                        <td className={styles.rating}>
                                            ⭐ {course.rating}/5 ({course.reviewCount})
                                        </td>
                                        <td>{formatDate(course.created)}</td>
                                        <td className={styles.actionsCell}>
                                            <button 
                                                onClick={() => handleViewCourse(course.id)}
                                                className={styles.viewButton}
                                                title="Xem và chỉnh sửa khóa học"
                                            >
                                                🔧 Quản lý
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteCourse(course.id, course.courseName)}
                                                className={styles.deleteButton}
                                                title="Xóa khóa học"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={styles.pageButton}
                            >
                                ← Trước
                            </button>
                            
                            <span className={styles.pageInfo}>
                                Trang {currentPage} / {totalPages}
                            </span>
                            
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={styles.pageButton}
                            >
                                Tiếp →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
