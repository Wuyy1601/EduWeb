import styles from './styles.module.scss';
import DocumentsTable from '@pages/Admin/DocumentsTable';
import { useState, useEffect } from 'react';
import { FaBook, FaUsers, FaChartBar, FaCog, FaBell, FaBars } from 'react-icons/fa';
import CourseTable from './CourseTable';
import UserTable from './UserTable';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('documents');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'overview', label: 'Tổng quan', icon: <FaChartBar /> },
        { id: 'documents', label: 'Quản lý tài liệu', icon: <FaBook /> },
        { id: 'users', label: 'Quản lý người dùng', icon: <FaUsers /> },
        { id: 'settings', label: 'Cài đặt', icon: <FaCog /> },
        { id: 'courses', label: 'Quản lý khóa học', icon: <FaBook /> },
    ];

    const handleMenuItemClick = (id) => {
        setActiveTab(id);
        setIsMobileMenuOpen(false); // Đóng menu khi chọn item trên mobile
    };

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
                    <button className={styles.menuToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <FaBars />
                    </button>
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
                {/* Overlay for mobile menu */}
                <div
                    className={`${styles.menuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                {/* Sidebar */}
                <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles.menuItem} ${activeTab === item.id ? styles.active : ''}`}
                            onClick={() => handleMenuItemClick(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.mainContent}>{renderContent()}</div>
            </div>
        </div>
    );
}

function Overview() {
    const [stats, setStats] = useState([
        { label: 'Tổng tài liệu', value: '...', color: '#3498db' },
        { label: 'Tổng khóa học', value: '...', color: '#2563eb' },
        // { label: 'Người dùng', value: '...', color: '#2ecc71' },
        // { label: 'Lượt tải', value: '...', color: '#e74c3c' },
        // { label: 'Đánh giá', value: '...', color: '#f1c40f' },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Tổng tài liệu
                const docsRes = await fetch('http://localhost:8000/api/documents/count');
                const docsData = await docsRes.json();
                const docCount = docsData.count ?? docsData.result ?? 0;

                // Tổng khóa học (phải kèm Authorization)
                const token = localStorage.getItem('token');
                const courseRes = await fetch('http://localhost:8888/api/v1/course/all?page=1&size=1', {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                });
                const courseData = await courseRes.json();
                const courseCount = courseData.result?.totalElements || courseData.result?.totalItems || 0;

                setStats([
                    { label: 'Tổng tài liệu', value: docCount.toLocaleString(), color: '#3498db' },
                    { label: 'Tổng khóa học', value: courseCount.toLocaleString(), color: '#2563eb' },
                ]);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
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
