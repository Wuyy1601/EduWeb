import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const API_URL = 'http://localhost:8888/api/v1/profile/users';

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.roles?.includes('ROLE_ADMIN')) {
        // Chuyển hướng hoặc báo lỗi
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                // Lấy danh sách user
                const res = await fetch('http://localhost:8888/api/v1/identity/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Lỗi khi lấy danh sách user');
                const data = await res.json();
                setUsers(data.result || data);

                // Lấy tổng số user
                const countRes = await fetch('http://localhost:8888/api/v1/identity/users/count', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (countRes.ok) {
                    const countData = await countRes.json();
                    setUserCount(countData.result ?? 0);
                } else {
                    setUserCount(0);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        if (!window.confirm("Bạn chắc chắn muốn xóa user này?")) return;
        await fetch(`http://localhost:8888/api/v1/identity/users/${userId}`, {
            method: "DELETE",
            headers: { 'Authorization': `Bearer ${token}` }
        });
        setUsers(users.filter(u => u.id !== userId && u.userId !== userId));
        setUserCount(userCount - 1);
    };

    return (
        <div className={styles.adminTableWrapper}>
            <div className={styles.adminTableTitle}>
                Danh sách người dùng ({userCount})
            </div>
            {loading ? <div>Đang tải...</div> : error ? <div>Lỗi: {error}</div> : (
                <table className={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user.id || user.userId}>
                                <td>{idx + 1}</td>
                                <td>{user.id || user.userId}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.fullName || `${user.firstName || ''} ${user.lastName || ''}`}</td>
                                <td>{user.role || (user.roles && user.roles.join(', '))}</td>
                                <td>
                                    <button onClick={() => window.location.href = `/profile/${user.id || user.userId}`}>Xem</button>
                                    <button onClick={() => handleDelete(user.id || user.userId)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
