import styles from './styles.module.scss';
import DocumentsTable from '@pages/Admin/DocumentsTable';
// import UsersTable from '@pages/Admin/UserTable';

export default function AdminDashboard() {
    return (
        <div className={styles.adminPage}>
            <div className={styles.adminSection}>
                <div className={styles.adminTitle}>Admin Dashboard</div>
                {/* <UsersTable /> */}
                <DocumentsTable />
            </div>
        </div>
    );
}
