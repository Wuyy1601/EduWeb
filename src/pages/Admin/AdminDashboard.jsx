import styles from './styles.module.scss';
import DocumentsTable from '@pages/Admin/DocumentsTable';
import { useState, useEffect } from 'react';
import { FaBook, FaUsers, FaChartBar, FaCog, FaBell } from 'react-icons/fa';
import CourseTable from './CourseTable';
import UserTable from './UserTable';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('documents');

    const menuItems = [
        { id: 'overview', label: 'Tổng quan', icon: <FaChartBar /> },
        { id: 'documents', label: 'Quản lý tài liệu', icon: <FaBook /> },
        { id: 'users', label: 'Quản lý người dùng', icon: <FaUsers /> },
        { id: 'settings', label: 'Cài đặt', icon: <FaCog /> },
        { id: 'courses', label: 'Quản lý khóa học', icon: <FaBook /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'documents':
                return <DocumentsTable />;
            case 'overview':
                return <Overview />;
            case 'users':
                return <UserTable />;
            case 'settings':
                return <div>Cài đặt hệ thống (Đang phát triển)</div>;
            case 'courses':
                return <CourseTable />;
            default:
                return <DocumentsTable />;
        }
    };

    return (
        <div className={styles.adminPage}>
            <div className={styles.adminHeader}>
                <div className={styles.headerLeft}>
                    <h1>EduWeb Admin</h1>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.notification}>
                        <FaBell />
                        <span className={styles.badge}>3</span>
                    </div>
                    <div className={styles.adminProfile}>
                        <img src="https://via.placeholder.com/40" alt="Admin" />
                        <span>Admin</span>
                    </div>
                </div>
            </div>

            <div className={styles.adminContainer}>
                <div className={styles.sidebar}>
                    {menuItems.map(item => (
                        <div
                            key={item.id}
                            className={`${styles.menuItem} ${activeTab === item.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.mainContent}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

function Overview() {
    const [stats, setStats] = useState([
        { label: 'Tổng tài liệu', value: '...', color: '#3498db' },
        { label: 'Người dùng', value: '...', color: '#2ecc71' },
        { label: 'Lượt tải', value: '...', color: '#e74c3c' },
        { label: 'Đánh giá', value: '...', color: '#f1c40f' }
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch tổng số tài liệu
                const docsRes = await fetch('http://localhost:8000/api/documents/count');
                const docsData = await docsRes.json();
                const count = docsData.count ?? docsData.result ?? 0;

                // // Fetch tổng số người dùng
                // const usersRes = await fetch('http://localhost:8888/api/v1/identity/users/count');
                // const usersData = await usersRes.json();

                // // Fetch tổng lượt tải
                // const downloadsRes = await fetch('http://localhost:8000/api/documents/downloads/count');
                // const downloadsData = await downloadsRes.json();

                // // Fetch điểm đánh giá trung bình
                // const ratingsRes = await fetch('http://localhost:8000/api/documents/ratings/average');
                // const ratingsData = await ratingsRes.json();

                setStats([
                    { label: 'Tổng tài liệu', value: count.toLocaleString(), color: '#3498db' },
                    // { label: 'Người dùng', value: usersData.count.toLocaleString(), color: '#2ecc71' },
                    // { label: 'Lượt tải', value: downloadsData.count.toLocaleString(), color: '#e74c3c' },
                    // { label: 'Đánh giá', value: ratingsData.average.toFixed(1), color: '#f1c40f' }
                ]);
            } catch (error) {
                console.error('Error fetching stats:', error);
                // Hiển thị thông báo lỗi nếu cần
            }
        };

        fetchStats();

        // Cập nhật số liệu mỗi 5 phút
        const interval = setInterval(fetchStats, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.overview}>
            <h2>Tổng quan hệ thống</h2>
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard} style={{ borderColor: stat.color }}>
                        <h3>{stat.label}</h3>
                        <div className={styles.statValue} style={{ color: stat.color }}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
