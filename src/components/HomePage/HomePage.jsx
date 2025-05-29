import Banner from '@components/Banner/Banner';
import FeaturedContent from '@components/FeaturedContent/FeaturedContent';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import RecommendedDocuments from '@components/Recommend/Recommend';
import ChatBot from '@components/ChatBot/ChatBot';

function HomePage() {
    return (
        <div>
            <MainLayout>
                <MyHeader />

                <Banner />

                <FeaturedContent />

                <RecommendedDocuments />

                <ChatBot />

                <MyFooter />
            </MainLayout>
        </div>
    );
}

export default HomePage;
