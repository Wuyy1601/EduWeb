import styles from './styles.module.scss';
import DocumentsTable from '@pages/Admin/DocumentsTable';
import { useState, useEffect } from 'react';
import { FaBook, FaUsers, FaChartBar, FaCog, FaBell, FaTimes, FaBars } from 'react-icons/fa';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('documents');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'overview', label: 'Tổng quan', icon: <FaChartBar /> },
        { id: 'documents', label: 'Quản lý tài liệu', icon: <FaBook /> },
        { id: 'users', label: 'Quản lý người dùng', icon: <FaUsers /> },
        { id: 'settings', label: 'Cài đặt', icon: <FaCog /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'documents':
                return <DocumentsTable />;
            case 'overview':
                return <Overview />;
            case 'users':
                return <div>Quản lý người dùng (Đang phát triển)</div>;
            case 'settings':
                return <div>Cài đặt hệ thống (Đang phát triển)</div>;
            default:
                return <DocumentsTable />;
        }
    };

    return (
        <div className={styles.adminPage}>
            <div className={styles.adminHeader}>
                <div className={styles.headerLeft}>
                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
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
                <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
                    {menuItems.map(item => (
                        <div
                            key={item.id}
                            className={`${styles.menuItem} ${activeTab === item.id ? styles.active : ''}`}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </aside>

                <main className={styles.mainContent}>
                    {renderContent()}
                </main>
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
                const docsRes = await fetch('http://localhost:8000/api/documents/count');
                const docsData = await docsRes.json();

                const usersRes = await fetch('http://localhost:8000/api/users/count');
                const usersData = await usersRes.json();

                const downloadsRes = await fetch('http://localhost:8000/api/documents/downloads/count');
                const downloadsData = await downloadsRes.json();

                const ratingsRes = await fetch('http://localhost:8000/api/documents/ratings/average');
                const ratingsData = await ratingsRes.json();

                setStats([
                    { label: 'Tổng tài liệu', value: docsData.count.toLocaleString(), color: '#3498db' },
                    { label: 'Người dùng', value: usersData.count.toLocaleString(), color: '#2ecc71' },
                    { label: 'Lượt tải', value: downloadsData.count.toLocaleString(), color: '#e74c3c' },
                    { label: 'Đánh giá', value: ratingsData.average.toFixed(1), color: '#f1c40f' }
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
