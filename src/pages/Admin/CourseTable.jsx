import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';

const PAGE_SIZE = 10;

export default function CourseTable() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('token');

    // 2. Lấy danh sách tất cả khóa học (phân trang)
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8888/api/v1/course/all?page=${currentPage}&size=${PAGE_SIZE}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.code === 1000 && data.result) {
                setCourses(data.result.data || []);
                setTotalPages(data.result.totalPages || 1);
            } else {
                setError('Không thể tải danh sách khóa học');
            }
        } catch (err) {
            setError('Lỗi khi tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line
    }, [currentPage]);

    // 5. Xóa khóa học
    const handleDelete = async (courseId, courseName) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${courseName}"?`)) return;
        try {
            const res = await fetch(`http://localhost:8888/api/v1/course/${courseId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert('Xóa khóa học thành công!');
                fetchCourses();
            } else {
                alert('Xóa khóa học thất bại!');
            }
        } catch (err) {
            alert('Lỗi khi xóa khóa học');
        }
    };

    // 6. Upload thumbnail
    const handleUploadThumbnail = async (courseId, file) => {
        const formData = new FormData();
        formData.append('thumbnail', file);
        const res = await fetch(`http://localhost:8888/api/v1/course/${courseId}/upload-thumbnail`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        if (res.ok) {
            alert('Upload thumbnail thành công!');
            fetchCourses();
        } else {
            alert('Upload thumbnail thất bại!');
        }
    };

    // 7. Upload video
    const handleUploadVideo = async (courseId, file) => {
        const formData = new FormData();
        formData.append('video', file);
        const res = await fetch(`http://localhost:8888/api/v1/course/${courseId}/upload-video`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        if (res.ok) {
            alert('Upload video thành công!');
            fetchCourses();
        } else {
            alert('Upload video thất bại!');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <h2>📚 Quản lý khóa học ({courses.length} khóa học)</h2>
                <button onClick={fetchCourses} className={styles.refreshButton} disabled={loading}>
                    🔄 Refresh
                </button>
            </div>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải danh sách khóa học...</p>
                </div>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <p className={styles.errorMessage}>{error}</p>
                    <button onClick={fetchCourses} className={styles.retryButton}>Thử lại</button>
                </div>
            ) : (
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
                                    <td>{course.id}</td>
                                    <td>
                                        {course.thumbnailUrl ? (
                                            <img src={course.thumbnailUrl} alt={course.courseName} style={{ width: 60, borderRadius: 6 }} />
                                        ) : (
                                            <span>📷</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'block', marginTop: 4 }}
                                            onChange={e => handleUploadThumbnail(course.id, e.target.files[0])}
                                        />
                                    </td>
                                    <td>{course.courseName}</td>
                                    <td>{course.author}</td>
                                    <td>{course.category}</td>
                                    <td>{course.level}</td>
                                    <td>
                                        <span className={course.isPublished ? styles.published : styles.draft}>
                                            {course.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        {course.videoFiles ? course.videoFiles.length : 0} video(s)
                                        <input
                                            type="file"
                                            accept="video/*"
                                            style={{ display: 'block', marginTop: 4 }}
                                            onChange={e => handleUploadVideo(course.id, e.target.files[0])}
                                        />
                                    </td>
                                    <td>
                                        ⭐ {course.rating}/5 ({course.reviewCount})
                                    </td>
                                    <td>{formatDate(course.created)}</td>
                                    <td>
                                        <button
                                            onClick={() => window.location.href = `/course/${course.id}`}
                                            className={styles.viewButton}
                                            title="Quản lý khóa học"
                                        >
                                            Quản lý
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id, course.courseName)}
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
            )}
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
        </div>
    );
}
