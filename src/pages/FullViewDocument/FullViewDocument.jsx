import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import MyFooter from '@components/Footer/Footer';
import ChatBot from '@components/ChatBot/ChatBot';
import Courses from './Course';
import styles from './styles.module.scss';

function FullViewDocument() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(0);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:8888/api/v1/course/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                });
                const data = await res.json();
                if (data.code === 1000 && data.result) {
                    setCourse(data.result);
                } else {
                    alert('Không tìm thấy khoá học!');
                }
            } catch (e) {
                alert('Lỗi lấy dữ liệu khoá học!');
            }
        };
        fetchData();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    const lessons = course.videoFiles || [];
    const lesson = lessons[activeLesson];

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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {showSidebar && (
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleSidebarClose} />
                )}

                {/* Sidebar */}
                <aside className={styles.sidebarLesson}>
                    <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Tên Tài liệu</div>
                    <div className={styles.lessonList}>
                        {lessons.map((ls, idx) => (
                            <div
                                key={idx}
                                className={`${styles.lessonItem} ${activeLesson === idx ? styles.active : ''}`}
                                onClick={() => {
                                    setActiveLesson(idx);
                                    handleSidebarClose();
                                }}
                            >
                                Lesson {idx + 1}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 32 }}>
                        <div style={{ fontWeight: 600, color: '#374151', marginBottom: 6 }}>Câu hỏi</div>
                        <div
                            style={{
                                background: '#fef08a',
                                borderRadius: 8,
                                padding: '8px 14px',
                                fontSize: 15,
                                marginBottom: 6,
                            }}
                        >
                            Câu hỏi 1
                        </div>
                        <div style={{ background: '#fee2e2', borderRadius: 8, padding: '8px 14px', fontSize: 15 }}>
                            Câu hỏi 2
                        </div>
                        <div style={{ fontWeight: 600, color: '#374151', margin: '22px 0 6px' }}>Luyện tập</div>
                        <div
                            style={{
                                background: '#d1fae5',
                                borderRadius: 8,
                                padding: '8px 14px',
                                fontSize: 15,
                                marginBottom: 6,
                            }}
                        >
                            Luyện tập 1
                        </div>
                        <div style={{ background: '#c7d2fe', borderRadius: 8, padding: '8px 14px', fontSize: 15 }}>
                            Luyện tập 2
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 space-y-6 px-4 md:px-0">
                    {/* Info Card */}
                    <div className="bg-blue-600 text-white p-4 md:p-8 rounded-2xl shadow mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold">{`Bài học ${activeLesson + 1}`}</h1>
                        <div className="text-base md:text-lg">Tác giả: {course.author}</div>
                    </div>
                    <div className="bg-gray-800 rounded-2xl shadow overflow-hidden">
                        {lesson ? (
                            <video key={lesson} className="w-full aspect-video" controls>
                                <source src={lesson} type="video/mp4" />
                                Trình duyệt không hỗ trợ video.
                            </video>
                        ) : (
                            <div className="text-white p-8 text-center">Chưa có video cho bài này</div>
                        )}
                    </div>
                    <div className={styles.courseInfoBlock}>
                        <h2>Điều bạn nhận được khi học khóa này</h2>
                        <p>
                            Khóa học cung cấp kiến thức từ cơ bản đến nâng cao, giúp bạn xây dựng nền tảng vững chắc và
                            phát triển kỹ năng thực tiễn. Tất cả nội dung đều được giảng giải rõ ràng, có ví dụ minh họa
                            và ứng dụng thực tế. Bạn có thể học theo tốc độ riêng, chủ động luyện tập qua các bài tập
                            đính kèm và được cập nhật nội dung mới miễn phí trọn đời.
                        </p>

                        <h2>Khóa học này phù hợp với ai?</h2>
                        <p>
                            Khóa học dành cho người mới bắt đầu, người muốn củng cố kiến thức nền tảng, cũng như những
                            ai đang tìm kiếm giải pháp học tập chủ động, tiết kiệm thời gian. Nếu bạn muốn học bài bản,
                            tự tin thực hành và ứng dụng ngay, đây là lựa chọn phù hợp.
                        </p>

                        <h2>Cam kết của chúng tôi</h2>
                        <p>
                            Đội ngũ giảng viên và hỗ trợ luôn đồng hành cùng bạn trong suốt quá trình học. Bạn sẽ được
                            giải đáp thắc mắc, tham gia cộng đồng học viên, nhận chứng chỉ hoàn thành và hỗ trợ cập nhật
                            tài liệu mới nhất. Sự thành công của bạn là mục tiêu của chúng tôi!
                        </p>

                        <div className={styles.reviewBox}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt="user"
                                    style={{ width: 46, height: 46, borderRadius: 16 }}
                                />
                                <div>
                                    <div style={{ fontWeight: 700 }}>Nguyễn Thị Hạnh</div>
                                    <div style={{ color: '#efb24e', fontSize: 20, marginTop: 2 }}>★★★★★</div>
                                </div>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                "Khóa học trình bày dễ hiểu, có hướng dẫn chi tiết từng bước và nhiều ví dụ thực tế. Hỗ
                                trợ giải đáp nhanh, mình cảm thấy rất hài lòng và tự tin ứng dụng sau khi học xong."
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <ChatBot />
            <Courses title="Tài liệu gợi ý" size={5} />
            <MyFooter />
        </MainLayout>
    );
}

export default FullViewDocument;
