import MyFooter from "@components/Footer/Footer";
import MyHeader from "@components/Header/Header";
import MainLayout from "@components/Layout/Layout";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import courseImage from "@images/course.png";
import avatar from "@images/avatar.jpg";
import CourseCard from "@pages/Document/components/CourseCard";
import Button from "@components/Button/Button";
import Courses from "@pages/Document/components/Courses";



function ReviewDocument() {
    const { id } = useParams();
    return (<MainLayout>
        <MyHeader />
        <div className={styles.courseDetailWrapper}>
            <div className={styles.bannerSection}>
                <img src={courseImage} alt="Course Banner" className={styles.bannerImage} />
                <div className={styles.priceBox}>
                    <img src={courseImage} alt="preview" className={styles.miniImage} />
                    <h3>
                        $49.65 <span className={styles.oldPrice}>$99.00</span>{" "}
                        <span className={styles.discount}>50% OFF</span>
                    </h3>
                    <button className={styles.buyBtn}>Buy Now</button>

                    <ul className={styles.courseIncludes}>
                        <li>✅ 20 Hours video</li>
                        <li>✅ 3 Projects</li>
                        <li>✅ Certificate</li>
                        <li>✅ Mentor support</li>
                    </ul>

                    <p className={styles.groupTraining}>Training 5 or more people</p>

                    <div className={styles.socialShare}>
                        <p>Share this course</p>
                        <div className={styles.icons}>
                            <span>🔗</span>
                            <span>👍</span>
                            <span>💬</span>
                            <span>📤</span>
                        </div>
                    </div>
                </div>
            </div>
            <Button content="Thiết kế"></Button>
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
                <div className={styles.right}>
                    {/* Có thể để trống hoặc dùng cho responsive */}
                </div>
            </div>

            <Courses title="Tài liệu gợi ý" />
        </div>
        <MyFooter />
    </MainLayout>);
}

export default ReviewDocument;