import { useState, useEffect } from 'react';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import MyFooter from '@components/Footer/Footer';

function FullViewDocument() {
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(0);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        fetch('/api/course/123')
            .then(res => res.json())
            .then(data => setCourse(data))
            .catch(e => alert('Lỗi lấy dữ liệu khoá học!'));
    }, []);

    if (!course) return <div>Loading...</div>;

    const lesson = course.lessons[activeLesson];

    const handleSidebarClose = () => setShowSidebar(false);

    return (
        <MainLayout>
            <MyHeader />
            <div className="min-h-screen bg-gray-100 flex pt-6" style={{ marginTop: '80px' }}>
                {/* Sidebar Toggle Mobile */}
                <button
                    className="md:hidden fixed bottom-20 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg w-12 h-12"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Overlay mobile */}
                {showSidebar && (
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleSidebarClose} />
                )}

                {/* Sidebar */}
                <aside className={`
                    fixed md:relative top-0 left-0 h-full z-50 w-3/4 md:w-1/4 bg-white shadow-lg
                    transform transition-transform duration-300 ease-in-out
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
                        <h2 className="font-bold text-xl mb-4">{course.courseName}</h2>
                        {course.lessons.map((ls, idx) => (
                            <div
                                key={idx}
                                className={
                                    'mb-2 p-2 rounded cursor-pointer transition ' +
                                    (activeLesson === idx
                                        ? 'bg-blue-600 text-white font-bold shadow'
                                        : 'bg-blue-100 hover:bg-blue-200')
                                }
                                onClick={() => {
                                    setActiveLesson(idx);
                                    handleSidebarClose();
                                }}
                            >
                                {ls.title}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 space-y-6 px-4 md:px-0">
                    {/* Info Card */}
                    <div className="bg-blue-600 text-white p-4 md:p-8 rounded-2xl shadow mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
                        <div className="text-base md:text-lg">Tác giả: {course.author}</div>
                    </div>
                    <div className="bg-gray-800 rounded-2xl shadow overflow-hidden">
                        <video className="w-full aspect-video" controls>
                            <source src={lesson.videoUrl} type="video/mp4" />
                            Trình duyệt không hỗ trợ video.
                        </video>
                    </div>
                    <div className="bg-white p-4 md:p-8 rounded-2xl shadow text-gray-700">
                        <h2 className="font-bold text-lg mb-2">Mô tả bài học</h2>
                        <p>{lesson.description}</p>
                    </div>
                </main>
            </div>
            <MyFooter />
        </MainLayout>
    );
}

export default FullViewDocument;
