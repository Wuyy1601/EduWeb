import featuredCards from '@data/featuredCards';
import FeaturedCard from './FeaturedCard';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import courseImage from '@images/course.png';
import slide from '@images/slide.png';
import avatar from '@images/avatar.jpg';
import exampleMustReadDoc from '@images/exampleMustReadDoc.png';
import CourseCard from '@pages/Document/components/CourseCard';
import introVideo from '@videos/intro.mp4';
import Button from '@components/Button/Button';
import Courses from '@pages/Document/components/Courses';
import BannerReviewDoc from '@images/BannerReviewDoc.png';
import VideoModal from '@components/VideoModal/VideoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar, faPhone, faCertificate, faWrench } from '@fortawesome/free-solid-svg-icons';
import {
    faTelegram,
    faFacebook,
    faLinkedin,
    faInstagram,
    faWhatsapp,
    faThreads,
} from '@fortawesome/free-brands-svg-icons';

function ReviewDocument() {
    const { id } = useParams();
    const [showVideo, setShowVideo] = useState(false);
    const [cards, setCards] = useState([]);
    useEffect(() => {
        setCards(featuredCards);
    }, []);
    if (!cards.length) return <p>Loading...</p>;
    return (
        <MainLayout>
            <MyHeader />
            <div className={styles.courseDetailWrapper}>
                <div className={styles.bannerSection}>
                    <img src={BannerReviewDoc} alt="Course Banner" className={styles.bannerImage} />
                    <div className={styles.priceBox}>
                        <img src={courseImage} alt="preview" className={styles.miniImage} />

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>
                            $49.65{' '}
                            <span
                                style={{
                                    textDecoration: 'line-through',
                                    fontSize: '1rem',
                                    color: '#999',
                                    marginLeft: '0.5rem',
                                }}
                            >
                                $99.00
                            </span>{' '}
                            <span style={{ fontSize: '0.95rem', marginLeft: '0.4rem', color: '#999' }}>50% OFF</span>
                        </h3>
                        <p
                            style={{
                                color: '#ffe999',
                                fontSize: '14px',
                                marginTop: '0.5rem',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            11 hour left at this price
                        </p>

                        <Button content="Buy Now" className={styles.buyButton} />

                        <div style={{ borderTop: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <h4>This Course included</h4>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <li>
                                    <FontAwesomeIcon icon={faSackDollar} /> Money Back Guarantee
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faPhone} /> Access on all devices
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCertificate} /> Certification of completion
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faWrench} /> 32 Modules
                                </li>
                            </ul>
                        </div>

                        <div style={{ borderTop: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <h4>Training 5 or more people</h4>
                            <p className={styles.note}>
                                Class, launched less than a year ago by Blackboard co-founder Michael Chasen...
                            </p>
                        </div>

                        <div style={{ borderTop: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <h4>Share this course</h4>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', fontWeight: 'bold' }}>
                                <a href="">
                                    <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={faWhatsapp} className={styles.icon} />
                                </a>
                                <a href="">
                                    <fontAwesomeIcon icon={faThreads} className={styles.icon} />
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

                    <div className={styles.right}>{/* bạn có thể dùng cho responsive */}</div>
                </div>

                <Courses title="Tài liệu gợi ý" />
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
            <h3 style={{ textAlign: 'center' }}>Top tài liệu nên đọc</h3>
            <div
                style={{
                    alignItems: 'center',
                    display: 'grid',
                    gap: '7rem',
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
            <MyFooter />
        </MainLayout>
    );
}

export default ReviewDocument;
