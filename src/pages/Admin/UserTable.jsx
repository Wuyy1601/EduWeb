import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';

export default function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Gọi API từ backend Java (ví dụ: identity_service)
        fetch("http://localhost:8080/api/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 className={styles.adminTitle}>Quản lý người dùng</h2>
            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>ID</th><th>Tên</th><th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
