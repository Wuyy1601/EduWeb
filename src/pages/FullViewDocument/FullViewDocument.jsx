import MyHeader from '@components/Header/Header';
import styles from './styles.module.css';
import MainLayout from '@components/Layout/Layout';
import MyFooter from '@components/Footer/Footer';

function FullViewDocument() {
    return (
        <MainLayout>
            <MyHeader />

            <MyFooter />
        </MainLayout>
    );
}

export default FullViewDocument;
