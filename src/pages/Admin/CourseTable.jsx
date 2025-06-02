import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaEye, FaUpload, FaImage, FaVideo, FaPlay } from 'react-icons/fa';
import styles from './styles.module.scss';

function CourseTable() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Giả sử trang bắt đầu từ 1
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [uploadModal, setUploadModal] = useState({ show: false, type: '', courseId: '' });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileValidation, setFileValidation] = useState({ valid: true, error: '' });
    const [expandedId, setExpandedId] = useState(null); // ← Thêm state mới

    // File size limits (in bytes)
    const FILE_SIZE_LIMITS = {
        thumbnail: 5 * 1024 * 1024, // 5MB for images
        video: 100 * 1024 * 1024, // 100MB for videos
    };

    const [formData, setFormData] = useState({
        courseName: '',
        description: '',
        author: '',
        category: '',
        level: '',
        duration: '',
        price: '', // ← để trống ban đầu
        isPublished: false,
    });

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        console.log(`Fetching courses for page: ${currentPage}`); // Log trang hiện tại
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8888/api/v1/course/all?page=${currentPage}&size=10`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('API Response Status:', response.status); // Log status code

            if (!response.ok) {
                const errorData = await response.text();
                console.error('API Error Data:', errorData);
                throw new Error(`Lỗi HTTP ${response.status}: ${response.statusText}. Chi tiết: ${errorData}`);
            }

            const data = await response.json();
            console.log('API Full Response Data:', JSON.stringify(data, null, 2)); // Log toàn bộ dữ liệu JSON

            if (data.code === 1000 && data.result) {
                console.log('API Result (PageResponse):', JSON.stringify(data.result, null, 2));
                console.log('Courses from API (data.result.data):', data.result.data);
                setCourses(data.result.data || []);
                setTotalPages(data.result.totalPages || 1);
                console.log('Courses state set to:', data.result.data || []);
            } else {
                console.error('API returned success code but result is problematic or code is not 1000:', data);
                throw new Error(data.message || 'Lỗi khi tải danh sách khóa học từ API.');
            }
        } catch (err) {
            console.error('Error fetching courses (catch block):', err);
            setError(err.message);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [currentPage]); // Gọi lại khi currentPage thay đổi

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = editingCourse
                ? `http://localhost:8888/api/v1/course/${editingCourse.id}`
                : 'http://localhost:8888/api/v1/course/create';

            const method = editingCourse ? 'PUT' : 'POST';

            // convert price về number trước khi gửi
            const payload = { ...formData, price: Number(formData.price) };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.code === 1000) {
                alert(editingCourse ? 'Cập nhật khóa học thành công!' : 'Tạo khóa học thành công!');
                setShowModal(false);
                setEditingCourse(null);
                resetForm();
                await fetchCourses();
            } else {
                throw new Error(data.message || 'Lỗi khi lưu khóa học');
            }
        } catch (error) {
            console.error('Error saving course:', error);
            alert('Lỗi: ' + error.message);
        }
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8888/api/v1/course/${courseId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.code === 1000) {
                alert('Xóa khóa học thành công!');
                await fetchCourses();
            } else {
                throw new Error(data.message || 'Lỗi khi xóa khóa học');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Lỗi: ' + error.message);
        }
    };

    const validateFile = (file, type) => {
        if (!file) return { valid: false, error: 'Vui lòng chọn file' };

        const maxSize = FILE_SIZE_LIMITS[type];
        const fileSize = file.size;

        // Check file size
        if (fileSize > maxSize) {
            const maxSizeMB = Math.round(maxSize / (1024 * 1024));
            const fileSizeMB = Math.round((fileSize / (1024 * 1024)) * 100) / 100;
            return {
                valid: false,
                error: `File quá lớn! Kích thước hiện tại: ${fileSizeMB}MB. Giới hạn: ${maxSizeMB}MB`,
            };
        }

        // Check file type
        if (type === 'thumbnail') {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                return {
                    valid: false,
                    error: 'Định dạng không hỗ trợ! Chỉ chấp nhận: JPG, PNG, GIF, WebP',
                };
            }
        } else if (type === 'video') {
            const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
            if (!allowedTypes.includes(file.type)) {
                return {
                    valid: false,
                    error: 'Định dạng không hỗ trợ! Chỉ chấp nhận: MP4, MPEG, MOV, AVI, WebM',
                };
            }
        }

        return { valid: true };
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileUpload = async (file, type, courseId) => {
        try {
            // Validate file first
            const validation = validateFile(file, type);
            if (!validation.valid) {
                alert(validation.error);
                return;
            }

            setUploadProgress(0);

            const token = localStorage.getItem('token');
            const endpoint = type === 'thumbnail' ? 'upload-thumbnail' : 'upload-video';
            const formData = new FormData();
            formData.append(type, file);

            // Thêm metadata cho video nếu cần
            if (type === 'video') {
                formData.append('videoName', file.name);
                formData.append('videoSize', file.size);
            }

            // Create XMLHttpRequest for progress tracking
            const xhr = new XMLHttpRequest();

            return new Promise((resolve, reject) => {
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percentComplete = Math.round((e.loaded / e.total) * 100);
                        setUploadProgress(percentComplete);
                    }
                });

                xhr.onload = function () {
                    setUploadProgress(100);
                    if (xhr.status === 200) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            if (data.code === 1000) {
                                const message =
                                    type === 'thumbnail' ? 'Upload thumbnail thành công!' : 'Upload video thành công!';
                                alert(message);
                                setUploadModal({ show: false, type: '', courseId: '' });
                                fetchCourses(); // Reload để cập nhật danh sách video
                            } else {
                                throw new Error(data.message || `Lỗi khi upload ${type}`);
                            }
                        } catch (parseError) {
                            throw new Error('Lỗi phân tích phản hồi từ server');
                        }
                    } else if (xhr.status === 413) {
                        throw new Error('File quá lớn! Vui lòng chọn file nhỏ hơn.');
                    } else if (xhr.status === 415) {
                        throw new Error('Định dạng file không được hỗ trợ.');
                    } else {
                        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                    }

                    setUploadProgress(0);
                };

                xhr.onerror = function () {
                    setUploadProgress(0);
                    reject(new Error('Lỗi kết nối mạng'));
                };

                xhr.ontimeout = function () {
                    setUploadProgress(0);
                    reject(new Error('Upload timeout - file quá lớn hoặc kết nối chậm'));
                };

                xhr.open('PUT', `http://localhost:8888/api/v1/course/${courseId}/${endpoint}`);
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                xhr.timeout = 5 * 60 * 1000; // 5 minutes timeout
                xhr.send(formData);
            });
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
            alert('Lỗi: ' + error.message);
            setUploadProgress(0);
        }
    };

    const resetForm = () => {
        setFormData({
            courseName: '',
            description: '',
            author: '',
            category: '',
            level: '',
            duration: '',
            price: '', // ← để trống ban đầu
            isPublished: false,
        });
    };

    const openEditModal = (course) => {
        setEditingCourse(course);
        setFormData({
            courseName: course.courseName || '',
            description: course.description || '',
            author: course.author || '',
            category: course.category || '',
            level: course.level || '',
            duration: course.duration?.toString() || '',
            price: course.price != null ? course.price.toString() : '', // ← map về chuỗi
            isPublished: course.isPublished || false,
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingCourse(null);
        resetForm();
        setShowModal(true);
    };

    const renderVideoCount = (course) => {
        const videoCount = course.videoFiles ? course.videoFiles.length : 0;
        return (
            <div className={styles.videoInfo}>
                <FaPlay className={styles.videoIcon} />
                <span className={styles.videoCount}>{videoCount}</span>
                {course.videoFiles && course.videoFiles.length > 0 && (
                    <div className={styles.videoList}>
                        {course.videoFiles.map((video, index) => (
                            <div key={index} className={styles.videoItem}></div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validation = validateFile(file, uploadModal.type);
            setFileValidation(validation);
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            setFileValidation({ valid: true, error: '' });
        }
    };

    const handleConfirmUpload = async () => {
        if (selectedFile && fileValidation.valid) {
            if (
                window.confirm(
                    `Bạn có chắc muốn upload file "${selectedFile.name}" (${formatFileSize(selectedFile.size)})?`,
                )
            ) {
                await handleFileUpload(selectedFile, uploadModal.type, uploadModal.courseId);
            }
        }
    };

    const resetUploadModal = () => {
        setUploadModal({ show: false, type: '', courseId: '' });
        setSelectedFile(null);
        setFileValidation({ valid: true, error: '' });
        setUploadProgress(0);
        // Reset file input
        const fileInput = document.getElementById('fileUploadInput');
        if (fileInput) fileInput.value = '';
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
            <div
                className={styles.errorContainer}
                style={{ color: 'red', padding: '20px', border: '1px solid red', margin: '20px' }}
            >
                <p className={styles.errorMessage}>❌ Đã có lỗi xảy ra: {error}</p>
                <button onClick={fetchCourses} className={styles.retryButton}>
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <h2>📚 Quản lý khóa học</h2>
                <div className={styles.headerActions}>
                    <button onClick={fetchCourses} className={styles.refreshButton} disabled={loading}>
                        🔄 Làm mới
                    </button>
                    <button onClick={openCreateModal} className={styles.addButton}>
                        <FaPlus /> Thêm khóa học mới
                    </button>
                </div>
            </div>

            {loading && (
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải danh sách khóa học...</p>
                </div>
            )}

            {error && (
                <div
                    className={styles.errorContainer}
                    style={{ color: 'red', padding: '20px', border: '1px solid red', margin: '20px' }}
                >
                    <p className={styles.errorMessage}>❌ Đã có lỗi xảy ra: {error}</p>
                    <button onClick={fetchCourses} className={styles.retryButton}>
                        Thử lại
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>ID</th>
                                <th style={{ width: '100px' }}>Thumbnail</th>
                                <th style={{ width: '280px' }}>Tên khóa học</th>
                                <th style={{ width: '120px' }}>Tác giả</th>
                                <th style={{ width: '100px' }}>Danh mục</th>
                                <th style={{ width: '80px' }}>Cấp độ</th>
                                <th style={{ width: '80px' }}>Thời lượng</th>
                                <th style={{ width: '60px' }}>Videos</th>
                                <th style={{ width: '100px' }}>Giá</th>
                                <th style={{ width: '80px' }}>Trạng thái</th>
                                <th style={{ width: '150px' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, idx) => (
                                <tr key={course.id ?? idx}>
                                    <td
                                        onClick={() => setExpandedId(expandedId === course.id ? null : course.id)}
                                        title={course.id}
                                        style={{
                                            maxWidth: expandedId === course.id ? 'none' : '80px',
                                            overflow: expandedId === course.id ? 'visible' : 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {course.id
                                            ? expandedId === course.id
                                                ? course.id
                                                : `${course.id.slice(0, 8)}…`
                                            : ''}
                                    </td>
                                    <td>
                                        {course.thumbnailUrl ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <img
                                                    src={course.thumbnailUrl}
                                                    alt={course.courseName}
                                                    className={styles.thumbnail}
                                                />
                                                <button
                                                    className={styles.changeThumbButton}
                                                    style={{
                                                        marginTop: 4,
                                                        fontSize: 12,
                                                        padding: '2px 8px',
                                                        borderRadius: 4,
                                                        border: '1px solid #ccc',
                                                        background: '#f5f5f5',
                                                        cursor: 'pointer',
                                                    }}
                                                    title="Đổi ảnh thumbnail"
                                                    onClick={() =>
                                                        setUploadModal({
                                                            show: true,
                                                            type: 'thumbnail',
                                                            courseId: course.id,
                                                        })
                                                    }
                                                    type="button"
                                                >
                                                    <FaUpload style={{ marginRight: 4 }} />
                                                    Đổi ảnh
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className={styles.changeThumbButton}
                                                style={{
                                                    fontSize: 12,
                                                    padding: '2px 8px',
                                                    borderRadius: 4,
                                                    border: '1px solid #ccc',
                                                    background: '#f5f5f5',
                                                    cursor: 'pointer',
                                                }}
                                                title="Upload thumbnail"
                                                onClick={() =>
                                                    setUploadModal({
                                                        show: true,
                                                        type: 'thumbnail',
                                                        courseId: course.id,
                                                    })
                                                }
                                                type="button"
                                            >
                                                <FaImage style={{ marginRight: 4 }} />
                                                Upload ảnh
                                            </button>
                                        )}
                                    </td>
                                    <td
                                        style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
                                        onClick={() => navigate(`/fullviewdocument/${course.id}`)}
                                    >
                                        {course.courseName}
                                    </td>
                                    <td>{course.author}</td>
                                    <td>{course.category}</td>
                                    <td>{course.level}</td>
                                    <td>{course.duration}</td>
                                    <td>{renderVideoCount(course)}</td>
                                    <td>{course.price?.toLocaleString('vi-VN')} VND</td>
                                    <td>{course.published ? 'Published' : 'Draft'}</td>
                                    <td>
                                        <button
                                            onClick={() => openEditModal(course)}
                                            className={styles.editButton}
                                            title="Chỉnh sửa"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className={styles.deleteButton}
                                            title="Xóa"
                                            style={{ marginLeft: 8 }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setUploadModal({
                                                    show: true,
                                                    type: 'video',
                                                    courseId: course.id,
                                                })
                                            }
                                            className={styles.uploadButton}
                                            title="Upload Video"
                                            style={{ marginLeft: 8 }}
                                        >
                                            <FaVideo />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        « Trước
                    </button>

                    <span className={styles.pageInfo}>
                        Trang {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={styles.pageButton}
                    >
                        Sau »
                    </button>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>{editingCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}</h3>
                            <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Tên khóa học *</label>
                                    <input
                                        type="text"
                                        value={formData.courseName}
                                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                        required
                                        placeholder="Nhập tên khóa học"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tác giả *</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        required
                                        placeholder="Nhập tên tác giả"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Mô tả</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Nhập mô tả khóa học"
                                    rows={4}
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Danh mục *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Chọn danh mục</option>
                                        <option value="Programming">Programming</option>
                                        <option value="Design">Design</option>
                                        <option value="Business">Business</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Music">Music</option>
                                        <option value="Photography">Photography</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Cấp độ *</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        required
                                    >
                                        <option value="">Chọn cấp độ</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Thời lượng (phút) *</label>
                                    <input
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                        min="1"
                                        placeholder="120"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Giá (VND)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        min="0"
                                        placeholder="Nhập giá"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isPublished}
                                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                    />
                                    Xuất bản khóa học
                                </label>
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className={styles.cancelButton}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className={styles.saveButton}>
                                    {editingCourse ? 'Cập nhật' : 'Tạo mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Enhanced Upload Modal with Confirm Button */}
            {uploadModal.show && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>{uploadModal.type === 'thumbnail' ? '🖼️ Upload Thumbnail' : '🎥 Upload Video'}</h3>
                            <button
                                onClick={resetUploadModal}
                                className={styles.closeButton}
                                disabled={uploadProgress > 0 && uploadProgress < 100}
                            >
                                ×
                            </button>
                        </div>

                        <div className={styles.uploadForm}>
                            {/* File size info */}
                            <div className={styles.uploadInfo}>
                                <div className={styles.infoCard}>
                                    <h4>📋 Yêu cầu file</h4>
                                    {uploadModal.type === 'thumbnail' ? (
                                        <ul>
                                            <li>Định dạng: JPG, PNG, GIF, WebP</li>
                                            <li>Kích thước tối đa: 5MB</li>
                                            <li>Khuyến nghị: 1920x1080px</li>
                                        </ul>
                                    ) : (
                                        <ul>
                                            <li>Định dạng: MP4, MPEG, MOV, AVI, WebM</li>
                                            <li>Kích thước tối đa: 100MB</li>
                                            <li>Khuyến nghị: độ phân giải 720p-1080p</li>
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* File input */}
                            <div className={styles.fileInputContainer}>
                                <input
                                    type="file"
                                    accept={uploadModal.type === 'thumbnail' ? 'image/*' : 'video/*'}
                                    onChange={handleFileSelect}
                                    className={`${styles.fileInput} ${!fileValidation.valid ? styles.error : ''}`}
                                    id="fileUploadInput"
                                    disabled={uploadProgress > 0 && uploadProgress < 100}
                                />
                                <label htmlFor="fileUploadInput" className={styles.fileInputLabel}>
                                    {selectedFile
                                        ? `📁 ${selectedFile.name}`
                                        : `📂 Chọn ${uploadModal.type === 'thumbnail' ? 'ảnh' : 'video'}...`}
                                </label>
                            </div>

                            {/* File validation error */}
                            {!fileValidation.valid && (
                                <div className={styles.errorMessage}>❌ {fileValidation.error}</div>
                            )}

                            {/* Selected file info */}
                            {selectedFile && fileValidation.valid && (
                                <div className={styles.selectedFileInfo}>
                                    <div className={styles.fileDetails}>
                                        <h4>✅ File đã chọn:</h4>
                                        <div className={styles.fileInfoGrid}>
                                            <div className={styles.fileInfoItem}>
                                                <span className={styles.label}>📄 Tên:</span>
                                                <span className={styles.value}>{selectedFile.name}</span>
                                            </div>
                                            <div className={styles.fileInfoItem}>
                                                <span className={styles.label}>📏 Kích thước:</span>
                                                <span className={styles.value}>
                                                    {formatFileSize(selectedFile.size)}
                                                </span>
                                            </div>
                                            <div className={styles.fileInfoItem}>
                                                <span className={styles.label}>🏷️ Loại:</span>
                                                <span className={styles.value}>{selectedFile.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Progress bar */}
                            {uploadProgress > 0 && (
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressLabel}>Đang upload... {uploadProgress}%</div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    {uploadProgress === 100 && (
                                        <div className={styles.successMessage}>✅ Upload thành công!</div>
                                    )}
                                </div>
                            )}

                            <p className={styles.uploadHint}>
                                {uploadModal.type === 'thumbnail'
                                    ? '🖼️ Chọn ảnh thumbnail cho khóa học'
                                    : '🎥 Chọn video cho khóa học'}
                            </p>
                        </div>

                        {/* Modal Actions */}
                        <div className={styles.modalActions}>
                            <button
                                onClick={resetUploadModal}
                                className={styles.cancelButton}
                                disabled={uploadProgress > 0 && uploadProgress < 100}
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirmUpload}
                                className={styles.uploadConfirmButton}
                                disabled={
                                    !selectedFile ||
                                    !fileValidation.valid ||
                                    (uploadProgress > 0 && uploadProgress < 100)
                                }
                            >
                                {uploadProgress > 0 && uploadProgress < 100 ? (
                                    <>
                                        <div className={styles.buttonSpinner}></div>
                                        Đang upload...
                                    </>
                                ) : (
                                    <>
                                        <FaUpload />
                                        Upload {uploadModal.type === 'thumbnail' ? 'Thumbnail' : 'Video'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseTable;
