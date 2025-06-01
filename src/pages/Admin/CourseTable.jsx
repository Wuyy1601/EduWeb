import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';

const PAGE_SIZE = 10;
const INIT_COURSE = {
    courseName: "",
    description: "",
    category: "",
    level: "",
    duration: 0
};

export default function CourseTable() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add"); // "add" | "edit"
    const [form, setForm] = useState(INIT_COURSE);
    const [editId, setEditId] = useState(null);

    // New state for upload video
    const [showUploadVideoModal, setShowUploadVideoModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);

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

    // Mở modal thêm/sửa
    const openAddModal = () => {
        setForm(INIT_COURSE);
        setModalType("add");
        setShowModal(true);
        setEditId(null);
    };
    const openEditModal = (course) => {
        setForm({
            courseName: course.courseName,
            description: course.description,
            category: course.category,
            level: course.level,
            duration: course.duration
        });
        setModalType("edit");
        setShowModal(true);
        setEditId(course.id);
    };

    // Submit form thêm/sửa
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res, data;
            if (modalType === "add") {
                res = await fetch("http://localhost:8888/api/v1/course/create", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
            } else {
                res = await fetch(`http://localhost:8888/api/v1/course/${editId}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
            }
            data = await res.json();
            if (res.ok && data.result) {
                alert(modalType === "add" ? "Thêm khóa học thành công!" : "Cập nhật thành công!");
                setShowModal(false);
                fetchCourses();
            } else {
                alert(data.message || "Có lỗi xảy ra!");
            }
        } catch (err) {
            alert("Lỗi khi gửi dữ liệu!");
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
                <button onClick={openAddModal} className={styles.addButton}>+ Thêm khóa học</button>
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
                                            onClick={() => openEditModal(course)}
                                            className={styles.viewButton}
                                            title="Chỉnh sửa khóa học"
                                        >
                                            Sửa
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

            {/* Modal Thêm/Sửa */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>{modalType === "add" ? "Thêm khóa học mới" : "Chỉnh sửa khóa học"}</h3>
                        <form onSubmit={handleSubmit} className={styles.addForm}>
                            <div>
                                <label>Tên khóa học</label>
                                <input
                                    type="text"
                                    value={form.courseName}
                                    onChange={e => setForm({ ...form, courseName: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Mô tả</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Thể loại</label>
                                <input
                                    type="text"
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Cấp độ</label>
                                <select
                                    value={form.level}
                                    onChange={e => setForm({ ...form, level: e.target.value })}
                                    required
                                >
                                    <option value="">Chọn cấp độ</option>
                                    <option value="BEGINNER">Beginner</option>
                                    <option value="INTERMEDIATE">Intermediate</option>
                                    <option value="ADVANCED">Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label>Thời lượng (phút)</label>
                                <input
                                    type="number"
                                    value={form.duration}
                                    onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
                                    min={1}
                                    required
                                />
                            </div>
                            <div style={{ textAlign: "right", marginTop: 16 }}>
                                <button type="submit" className={styles.saveBtn}>
                                    {modalType === "add" ? "Thêm" : "Lưu"}
                                </button>
                                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
