import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import Button from '@components/Button/Button';
import Courses from '@pages/Document/components/Courses';
import ChatBot from '@components/ChatBot/ChatBot';

import avatar from '@images/avatar.jpg';
import slide from '@images/slide.png'; // demo, thay bằng ảnh intro
import introVideo from '@videos/intro.mp4'; // demo, thay đúng đường dẫn
import VideoModal from '@components/VideoModal/VideoModal';

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram, faWhatsapp, faThreads } from '@fortawesome/free-brands-svg-icons';

// Giả lập card nổi bật nếu chưa có
const cards = [
    { id: 1, title: 'Java 101', description: 'Tài liệu Java cơ bản', thumbnailUrl: slide },
    { id: 2, title: 'React Advanced', description: 'Tài liệu React nâng cao', thumbnailUrl: slide },
    { id: 3, title: 'AI Cơ bản', description: 'Lý thuyết trí tuệ nhân tạo', thumbnailUrl: slide },
    { id: 4, title: 'Toán rời rạc', description: 'Ôn tập toán rời rạc', thumbnailUrl: slide },
];

function FeaturedCard({ title, description, thumbnailUrl }) {
    return (
        <div className={styles.featuredCard}>
            <img src={thumbnailUrl} alt={title} className={styles.featuredImg} />
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
}

function ReviewDocument() {
    useEffect(() => {
        document.title = "Ulearn - Document Review";
    }, []);

    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8888/api/v1/course/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 1000 && data.result) {
                    setCourse(data.result);
                } else {
                    setCourse(null);
                }
                setLoading(false);
            })
            .catch(() => {
                setCourse(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p style={{ textAlign: 'center', margin: '2rem' }}>Loading...</p>;
    if (!course) return <p style={{ textAlign: 'center', margin: '2rem' }}>Không tìm thấy tài liệu!</p>;

    return (
        <MainLayout>
            <MyHeader />
            <div className={styles.courseDetailWrapper}>
                <div className={styles.bannerSection}>
                    <img src={course.thumbnailUrl} alt="Course Banner" className={styles.bannerImage} />
                    <div className={styles.priceBox}>
                        <img src={course.thumbnailUrl} alt="preview" className={styles.miniImage} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>
                            {course.price?.toLocaleString('vi-VN')} VND
                        </h3>
                        {course.oldPrice && (
                            <>
                                <span
                                    style={{
                                        textDecoration: 'line-through',
                                        fontSize: '1rem',
                                        color: '#999',
                                        marginLeft: '0.5rem',
                                    }}
                                >
                                    <h3>{course.price?.toLocaleString('vi-VN')} VND</h3>
                                </span>
                                <span style={{ fontSize: '0.95rem', marginLeft: '0.4rem', color: '#999' }}>
                                    {/* Giả sử bạn muốn tính % giảm */}
                                    {Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)}% OFF
                                </span>
                            </>
                        )}

                        <Button
                            content="Buy Now"
                            className={styles.buyButton}
                            onClick={() => {
                                // Lấy cart hiện tại từ localStorage (nếu có)
                                const stored = localStorage.getItem('cart');
                                let cart = [];
                                if (stored) cart = JSON.parse(stored);

                                if (!cart.find((item) => item.id === course.id)) {
                                    cart.push({
                                        id: course.id,
                                        name: course.courseName,
                                        price: course.price,
                                        image: course.thumbnailUrl,
                                    });
                                    localStorage.setItem('cart', JSON.stringify(cart));
                                }

                                // Chuyển hướng sang trang Cart
                                navigate('/cart');
                            }}
                        />
                        <div style={{ borderTop: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <h4>Thông tin tài liệu</h4>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <li>
                                    Tên: <strong>{course.courseName}</strong>
                                </li>
                                <li>Danh mục: {course.category}</li>
                                <li>Tác giả: {course.author}</li>
                                <li>Thời lượng: {course.duration} phút</li>
                            </ul>
                        </div>
                        <div style={{ borderTop: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <h4>Mô tả</h4>
                            <p className={styles.note}>{course.description}</p>
                        </div>
                        <div style={{ borderTop: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <h4>Share this course</h4>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', fontWeight: 'bold' }}>
                                <a href="#">
                                    <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faWhatsapp} className={styles.icon} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faThreads} className={styles.icon} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Button content="Đánh giá" className={styles.designTag} />
                <div className={styles.mainContent}>
                    <div className={styles.left}>
                        <div className={styles.reviewBox}>
                            <h4>4 out of 5</h4>
                            <p>⭐⭐⭐⭐☆</p>
                            <p className={styles.topRating}>Top Rating</p>
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className={styles.ratingLine}>
                                    <span>{star} star</span>
                                    <div className={styles.ratingBar}></div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.comments}>
                            <div className={styles.comment}>
                                <img src={avatar} alt="user" />
                                <div>
                                    <p className={styles.name}>Lisa</p>
                                    <p>Course exceeded expectations, very engaging!</p>
                                </div>
                            </div>
                            <div className={styles.comment}>
                                <img src={avatar} alt="user" />
                                <div>
                                    <p className={styles.name}>David</p>
                                    <p>Awesome material. Loved the design patterns section.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>{/* responsive content here if needed */}</div>
                </div>
                <Courses title="Tài liệu gợi ý" size={4} />
            </div>
            <section className={styles.introSection}>
                <div className={styles.introContent}>
                    <div className={styles.text}>
                        <p>
                            <strong>
                                <span className={styles.logoU}>U</span>learn là nền tảng chia sẻ tài liệu học tập thông
                                minh – Tài liệu chất lượng, học nhanh – hiểu sâu
                            </strong>
                            <br />
                            Từ giáo trình, đề cương, bài tập, đến mẹo ôn thi và tóm tắt nội dung – tất cả đều được phân
                            loại rõ ràng theo môn học, cấp độ và đối chiếu. Người dùng có thể tải tài liệu ở nhiều định
                            dạng như PDF hoặc Word, đồng thời trải nghiệm nền tảng tìm kiếm nâng cao và hỗ trợ ưu tiên
                            khi nâng cấp lên gói Pro...
                        </p>
                    </div>
                    <div className={styles.videoPreview} onClick={() => setShowVideo(true)}>
                        <img src={slide} alt="preview" />
                        <div className={styles.playButton}>▶</div>
                    </div>
                    {showVideo && <VideoModal src={introVideo} onClose={() => setShowVideo(false)} />}
                </div>
            </section>
            <h3 style={{ textAlign: 'center' }}>
                <strong>TOP TÀI LIỆU NÊN ĐỌC</strong>
            </h3>
            <div
                style={{
                    alignItems: 'center',
                    display: 'grid',
                    gap: '2rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    padding: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {cards.map((card) => (
                    <FeaturedCard key={card.id} {...card} />
                ))}
            </div>
            <ChatBot />
            <MyFooter />
        </MainLayout>
    );
}

export default ReviewDocument;
