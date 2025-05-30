import Button from '@components/Button/Button';
import styles from '../styles.module.scss';
import { useNavigate } from 'react-router-dom';

function UpDocument() {
    const navigate = useNavigate();
    const UpDocumentContainer = styles.UpDocumentContainer;
    return (
        <div className={UpDocumentContainer}>
            <section className={styles.UpDocument}>
                <h2>Tài liệu của bạn lên ngay thôi</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <Button onClick={() => navigate(`/upfile`)} content={'Tải lên'}></Button>
            </section>
        </div>
    );
}

export default UpDocument;
