import { useState, useEffect } from 'react';

import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import MyFooter from '@components/Footer/Footer';
import Courses from './Course';
import ChatGPT from '@components/ChatGPT/ChatGPT';

function FullViewDocument() {
    const [activeLesson, setActiveLesson] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
        // setVideoUrl("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
        setVideoUrl('/videos/video.mp4');
    }, []);
    return (
        <MainLayout>
            <MyHeader />
            <div className="min-h-screen bg-gray-100 flex pt-6" style={{ marginTop: '80px' }}>
                {/* Sidebar */}
                <aside className="w-1/4 bg-white p-6 rounded-xl shadow mr-6 h-fit self-start sticky top-6">
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
                                onClick={() => setActiveLesson(idx)}
                            >
                                Lesson {idx + 1}
                            </div>
                        ))}
                    </div>

                    <div className="mb-6">
                        <h2 className="font-bold text-xl mb-4">Câu hỏi</h2>
                        {[...Array(10)].map((_, idx) => (
                            <div key={idx} className="mb-2 bg-orange-100 hover:bg-orange-200 p-2 rounded transition">
                                Question {idx + 1}
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4">Luyện tập</h2>
                        {[...Array(10)].map((_, idx) => (
                            <div key={idx} className="mb-2 bg-yellow-100 hover:bg-yellow-200 p-2 rounded transition">
                                Practice {idx + 1}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 space-y-6">
                    {/* Info Card */}
                    <div className="bg-blue-600 text-white p-8 rounded-2xl shadow flex items-end relative min-h-[140px]">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Tên tài liệu</h1>
                            <span className="text-base">Tác giả</span>
                        </div>
                        <span className="absolute bottom-4 right-6 text-lg opacity-80">1 hour</span>
                    </div>

                    <div className="bg-gray-800 rounded-2xl shadow overflow-hidden">
                        <video className="w-full aspect-video" controls>
                            <source src="/videos/IntroWebCode.mp4" type="video/mp4" />
                            Trình duyệt không hỗ trợ video.
                        </video>
                    </div>

                    {/* Course detail */}
                    <section className="bg-white p-8 rounded-2xl shadow text-gray-700 space-y-4">
                        <h2 className="text-2xl font-bold">06 Super Coins on the way</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

                        <h3 className="text-xl font-bold">Who this course is for?</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

                        <h3 className="text-xl font-bold">Archievable</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </section>

                    {/* Review */}
                    <div className="bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded-xl my-6 flex items-start gap-4 shadow">
                        <div>
                            <div className="font-semibold">Bulkin Simons</div>
                            <div className="text-yellow-600 mb-2">★★★★★</div>
                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
                        </div>
                    </div>

                    {/* Related Courses */}
                    <div>
                        <h2 className="font-bold text-2xl mb-4">Tài liệu tương tự</h2>
                        <Courses title="Tài liệu gợi ý" />
                    </div>
                </main>
            </div>
            <ChatGPT />
            <MyFooter />
        </MainLayout>
    );
}

export default FullViewDocument;
