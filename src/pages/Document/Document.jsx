import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import Banner from '@pages/Document/components/Banner';
import Categories from '@pages/Document/components/Categories';
import Courses from '@pages/Document/components/Courses';
import UpDocument from '@pages/Document/components/UpDocument';

function Document() {
    return (
        <MainLayout>
            <MyHeader />
            <Banner />
            <Categories />
            <Courses title="Gợi ý cho bạn" />
            <Courses title="Tài liệu của bạn" />
            <UpDocument />
            <MyFooter />
        </MainLayout>
    );
}

export default Document;
