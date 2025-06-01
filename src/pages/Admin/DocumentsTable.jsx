import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';

export default function DocumentsTable() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy danh sách tài liệu
    const fetchDocs = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:8000/api/documents');
            if (!res.ok) throw new Error('Không thể tải danh sách tài liệu');
            const data = await res.json();
            setDocs(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa tài liệu này?")) return;
        await fetch(`http://localhost:8000/api/documents/${id}`, { method: "DELETE" });
        fetchDocs();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('vi-VN');
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <h2>📄 Quản lý tài liệu ({docs.length} tài liệu)</h2>
                <button onClick={fetchDocs} className={styles.refreshButton} disabled={loading}>
                    🔄 Refresh
                </button>
            </div>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải danh sách tài liệu...</p>
                </div>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <p className={styles.errorMessage}>{error}</p>
                    <button onClick={fetchDocs} className={styles.retryButton}>Thử lại</button>
                </div>
            ) : docs.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>📭 Không có tài liệu nào</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.documentsTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Mô tả</th>
                                <th>Môn học</th>
                                <th>Chuyên ngành</th>
                                <th>Ngôn ngữ</th>
                                <th>Ngôn ngữ phụ</th>
                                <th>Cấp học</th>
                                <th>Ghi chú</th>
                                <th>Tên file</th>
                                <th>Tên gốc</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map(doc => (
                                <tr key={doc._id}>
                                    <td>{doc._id}</td>
                                    <td>{doc.title}</td>
                                    <td>{doc.description}</td>
                                    <td>{doc.subject}</td>
                                    <td>{doc.major}</td>
                                    <td>{doc.language}</td>
                                    <td>{doc.subLanguage}</td>
                                    <td>{doc.level}</td>
                                    <td>{doc.note}</td>
                                    <td>{doc.filename}</td>
                                    <td>{doc.originalname}</td>
                                    <td>{formatDate(doc.createdAt)}</td>
                                    <td>
                                        <button
                                            onClick={() => window.open(`/uploads/${doc.filename}`, '_blank')}
                                            className={styles.viewButton}
                                            title="Xem/tải file"
                                            disabled={!doc.filename}
                                        >
                                            📥
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doc._id)}
                                            className={styles.deleteButton}
                                            title="Xóa tài liệu"
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
        </div>
    );
}
