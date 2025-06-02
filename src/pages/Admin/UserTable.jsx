import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye, FaSync } from 'react-icons/fa';
import styles from './styles.module.scss';

const API_URL = 'http://localhost:8888/api/v1/identity/users';

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: 'USER',
        password: '',
        confirmPassword: '',
    });

    // Helper: Lấy token
    const getToken = () => localStorage.getItem('token');

    // Lấy tất cả users khi load trang hoặc reload
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = getToken();
            if (!token) {
                alert('Bạn chưa đăng nhập!');
                setUsers([]);
                setLoading(false);
                return;
            }
            const res = await fetch(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) {
                alert('Bạn chưa đăng nhập hoặc không có quyền!');
                setUsers([]);
                setLoading(false);
                return;
            }
            const data = await res.json();
            setUsers(Array.isArray(data.result) ? data.result : []);
        } catch (err) {
            alert('Không lấy được danh sách user!');
            setUsers([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, []);

    // Lấy user chi tiết (khi edit)
    const fetchUserById = async (userId) => {
        try {
            const token = getToken();
            const res = await fetch(`${API_URL}/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) {
                alert('Bạn chưa đăng nhập hoặc không có quyền!');
                return null;
            }
            const data = await res.json();
            return data.result || data;
        } catch {
            alert('Không lấy được thông tin user!');
            return null;
        }
    };

    const openEditModal = async (user) => {
        // Lấy lại user theo ID cho chính xác
        const fullUser = await fetchUserById(user.id || user.userId || user._id);
        if (!fullUser) return;
        setEditingUser(fullUser);
        setFormData({
            username: fullUser.username || '',
            email: fullUser.email || '',
            firstName: fullUser.firstName || '',
            lastName: fullUser.lastName || '',
            role: fullUser.role || 'USER',
            password: '',
            confirmPassword: '',
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingUser(null);
        setFormData({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: 'USER',
            password: '',
            confirmPassword: '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email) {
            alert('Vui lòng nhập đủ username và email!');
            return;
        }
        if (!editingUser && formData.password !== formData.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }
        try {
            const token = getToken();
            if (!token) {
                alert('Bạn chưa đăng nhập!');
                return;
            }
            if (editingUser) {
                // PUT cập nhật user
                const res = await fetch(`${API_URL}/${editingUser.id || editingUser.userId || editingUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        role: formData.role,
                    }),
                });
                if (res.status === 401) {
                    alert('Bạn chưa đăng nhập hoặc không có quyền!');
                    return;
                }
                if (res.ok) {
                    alert('Cập nhật người dùng thành công!');
                    setShowModal(false);
                    fetchUsers();
                } else {
                    alert('Cập nhật thất bại!');
                }
            } else {
                // POST tạo user mới
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });
                if (res.status === 401) {
                    alert('Bạn chưa đăng nhập hoặc không có quyền!');
                    return;
                }
                if (res.ok) {
                    alert('Tạo người dùng thành công!');
                    setShowModal(false);
                    fetchUsers();
                } else {
                    alert('Tạo thất bại!');
                }
            }
        } catch {
            alert('Có lỗi xảy ra!');
        }
    };

    // Xóa user
    const handleDelete = async (userId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
        try {
            const token = getToken();
            if (!token) {
                alert('Bạn chưa đăng nhập!');
                return;
            }
            const res = await fetch(`${API_URL}/${userId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) {
                alert('Bạn chưa đăng nhập hoặc không có quyền!');
                return;
            }
            if (res.ok) {
                alert('Xóa người dùng thành công!');
                fetchUsers();
            } else {
                alert('Xóa thất bại!');
            }
        } catch {
            alert('Lỗi khi xóa!');
        }
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <h2>👥 Quản lý người dùng ({Array.isArray(users) ? users.length : 0} người dùng)</h2>
                <div className={styles.headerActions}>
                    <button className={styles.refreshButton} onClick={fetchUsers}>
                        <FaSync /> Làm mới
                    </button>
                    <button onClick={openCreateModal} className={styles.addButton}>
                        <FaPlus /> Thêm người dùng mới
                    </button>
                </div>
            </div>
            <div className={styles.scrollIndicator}>← Cuộn ngang để xem thêm →</div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th></th>
                            <th>Họ và tên</th>
                            <th></th>
                            <th></th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center' }}>
                                    Đang tải...
                                </td>
                            </tr>
                        ) : Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id || user.userId || user._id}>
                                    <td className={styles.idCell} title={user.id || user.userId || user._id}>
                                        {user.id || user.userId || user._id}
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{`${user.firstName || ''} ${user.lastName || ''}`}</td>
                                    <td>
                                        <span className={`${styles.role} ${styles[user.role?.toLowerCase()]}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleString('vi-VN') : ''}</td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        `/profile/${user.id || user.userId || user._id}`,
                                                        '_blank',
                                                    )
                                                }
                                                className={styles.viewButton}
                                                title="Xem chi tiết"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className={styles.editButton}
                                                title="Chỉnh sửa"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id || user.userId || user._id)}
                                                className={styles.deleteButton}
                                                title="Xóa"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center' }}>
                                    Không có dữ liệu người dùng
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Create/Edit Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h3>
                            <button onClick={() => setShowModal(false)} className={styles.closeButton}>
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Username *</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                        placeholder="Nhập username"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="Nhập email"
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Họ</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        placeholder="Nhập họ"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        placeholder="Nhập tên"
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Vai trò *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="MODERATOR">Moderator</option>
                                </select>
                            </div>
                            {!editingUser && (
                                <>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Mật khẩu *</label>
                                            <input
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                required
                                                placeholder="Nhập mật khẩu"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Xác nhận mật khẩu *</label>
                                            <input
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                                }
                                                required
                                                placeholder="Nhập lại mật khẩu"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className={styles.cancelButton}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className={styles.saveButton}>
                                    {editingUser ? 'Cập nhật' : 'Tạo mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
