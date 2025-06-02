import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import Banner from '@pages/Document/components/Banner';
import Categories from '@pages/Document/components/Categories';
import Courses from '@pages/Document/components/Courses';
import UpDocument from '@pages/Document/components/UpDocument';
import ChatBot from '@components/ChatBot/ChatBot';

function Document() {
    return (
        <MainLayout>
            <MyHeader />
            <Banner />
            <Categories />
            <Courses title="Gợi ý cho bạn" size={4} /> {/* <-- chỉ lấy 4 khóa */}
            <Courses title="Tài liệu của bạn" size={12} /> {/* <-- lấy 12 khóa */}
            <UpDocument />
            <ChatBot />
            <MyFooter />
        </MainLayout>
    );
}
export default Document;
