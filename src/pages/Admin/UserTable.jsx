import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function UserTable() {
    // Mock data
    const mockUsers = [
        {
            id: '1',
            username: 'johndoe',
            email: 'john@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'ADMIN',
            createdAt: '2024-01-15T08:30:00Z'
        },
        {
            id: '2',
            username: 'janesmith',
            email: 'jane@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            role: 'USER',
            createdAt: '2024-01-16T10:20:00Z'
        },
        {
            id: '3',
            username: 'mikebrown',
            email: 'mike@example.com',
            firstName: 'Mike',
            lastName: 'Brown',
            role: 'MODERATOR',
            createdAt: '2024-01-17T14:45:00Z'
        }
    ];

    const [users] = useState(mockUsers);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: 'USER',
        password: '',
        confirmPassword: ''
    });

    const openEditModal = (user) => {
        setEditingUser(user);
        setFormData({
            username: user.username || '',
            email: user.email || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            role: user.role || 'USER',
            password: '',
            confirmPassword: ''
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
            confirmPassword: ''
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Giả lập thành công
        alert(editingUser ? 'Cập nhật người dùng thành công!' : 'Tạo người dùng thành công!');
        setShowModal(false);
    };

    const handleDelete = (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            alert('Xóa người dùng thành công!');
        }
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <h2>👥 Quản lý người dùng ({users.length} người dùng)</h2>
                <div className={styles.headerActions}>
                    <button className={styles.refreshButton}>
                        🔄 Làm mới
                    </button>
                    <button onClick={openCreateModal} className={styles.addButton}>
                        <FaPlus /> Thêm người dùng mới
                    </button>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Họ và tên</th>
                            <th>Vai trò</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className={styles.idCell} title={user.id}>
                                    {user.id}
                                </td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{`${user.firstName || ''} ${user.lastName || ''}`}</td>
                                <td>
                                    <span className={`${styles.role} ${styles[user.role?.toLowerCase()]}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>{new Date(user.createdAt).toLocaleString('vi-VN')}</td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button
                                            onClick={() => window.open(`/profile/${user.id}`, '_blank')}
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
                                            onClick={() => handleDelete(user.id)}
                                            className={styles.deleteButton}
                                            title="Xóa"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className={styles.closeButton}
                            >
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
                                                required={!editingUser}
                                                placeholder="Nhập mật khẩu"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Xác nhận mật khẩu *</label>
                                            <input
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                required={!editingUser}
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
