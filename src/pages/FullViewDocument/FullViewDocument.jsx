import { useState, useEffect } from 'react';

import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import MyFooter from '@components/Footer/Footer';
import Courses from './Course';
import ChatBot from '@components/ChatBot/ChatBot';

function FullViewDocument() {
    const [activeLesson, setActiveLesson] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        // setVideoUrl("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
        setVideoUrl('/videos/video.mp4');
    }, []);

    const handleSidebarClose = () => {
        setShowSidebar(false);
    };

    return (
        <MainLayout>
            <MyHeader />
            <div className="min-h-screen bg-gray-100 flex pt-6" style={{ marginTop: '80px' }}>
                {/* Mobile Sidebar Toggle Button */}
                <button
                    className="md:hidden fixed bottom-20 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center w-12 h-12"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Overlay for mobile */}
                {showSidebar && (
                    <div
                        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={handleSidebarClose}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
                    fixed md:relative top-0 left-0 h-full z-50 w-3/4 md:w-1/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 md:shadow md:mr-6 md:h-fit md:self-start md:sticky md:top-6 md:rounded-xl
                    overflow-y-auto
                `}>
                    {/* Close button for mobile */}
                    <button
                        className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={handleSidebarClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="font-bold text-xl mb-4">Tên Tài liệu</h2>
                            {[...Array(10)].map((_, idx) => (
                                <div
                                    key={idx}
                                    className={
                                        'mb-2 p-2 rounded cursor-pointer transition ' +
                                        (activeLesson === idx
                                            ? 'bg-green-400 text-white font-bold shadow'
                                            : 'bg-green-100 hover:bg-green-200')
                                    }
                                    onClick={() => {
                                        setActiveLesson(idx);
                                        handleSidebarClose();
                                    }}
                                >
                                    Lesson {idx + 1}
                                </div>
                            ))}
                        </div>

                        <div className="mb-6">
                            <h2 className="font-bold text-xl mb-4">Câu hỏi</h2>
                            {[...Array(10)].map((_, idx) => (
                                <div
                                    key={idx}
                                    className="mb-2 bg-orange-100 hover:bg-orange-200 p-2 rounded transition"
                                    onClick={handleSidebarClose}
                                >
                                    Question {idx + 1}
                                </div>
                            ))}
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-4">Luyện tập</h2>
                            {[...Array(10)].map((_, idx) => (
                                <div
                                    key={idx}
                                    className="mb-2 bg-yellow-100 hover:bg-yellow-200 p-2 rounded transition"
                                    onClick={handleSidebarClose}
                                >
                                    Practice {idx + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 space-y-6 px-4 md:px-0">
                    {/* Info Card */}
                    <div className="bg-blue-600 text-white p-4 md:p-8 rounded-2xl shadow flex flex-col md:flex-row md:items-end relative min-h-[140px]">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Tên tài liệu</h1>
                            <span className="text-sm md:text-base">Tác giả</span>
                        </div>
                        <span className="mt-2 md:mt-0 md:absolute md:bottom-4 md:right-6 text-base md:text-lg opacity-80">1 hour</span>
                    </div>

                    <div className="bg-gray-800 rounded-2xl shadow overflow-hidden">
                        <video className="w-full aspect-video" controls>
                            <source src="/videos/IntroWebCode.mp4" type="video/mp4" />
                            Trình duyệt không hỗ trợ video.
                        </video>
                    </div>

                    {/* Course detail */}
                    <section className="bg-white p-4 md:p-8 rounded-2xl shadow text-gray-700 space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold">06 Super Coins on the way</h2>
                        <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

                        <h3 className="text-lg md:text-xl font-bold">Who this course is for?</h3>
                        <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

                        <h3 className="text-lg md:text-xl font-bold">Archievable</h3>
                        <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </section>

                    {/* Review */}
                    <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 md:p-6 rounded-xl my-4 md:my-6 flex items-start gap-4 shadow">
                        <div>
                            <div className="font-semibold text-sm md:text-base">Bulkin Simons</div>
                            <div className="text-yellow-600 mb-2">★★★★★</div>
                            <div className="text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
                        </div>
                    </div>

                    {/* Related Courses */}
                    <div className="pb-6">
                        <h2 className="font-bold text-xl md:text-2xl mb-4">Tài liệu tương tự</h2>
                        <Courses title="Tài liệu gợi ý" />
                    </div>
                </main>
            </div>
            <ChatBot />
            <MyFooter />
        </MainLayout>
    );
}

export default FullViewDocument;
