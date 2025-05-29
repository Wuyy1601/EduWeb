import styles from "../styles.module.scss";
import avatar from "@images/avatar.jpg";
import courseImage from "@images/course.png";
import { useNavigate } from "react-router-dom";


function CourseCard({ id = 1 }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.courseCard}
      onClick={() => navigate(`/reviewdocument/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageWrapper}>
        <img src={courseImage} alt="Course" />
      </div>

      <div className={styles.courseInfo}>
        <div className={styles.topInfo}>
          <span className={styles.category}>Design</span>
          <span className={styles.duration}>3 Month</span>
        </div>

        <h3 className={styles.courseTitle}>AWS Certified Solutions Architect</h3>

        <p className={styles.courseDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </p>

        <div className={styles.bottomInfo}>
          <div className={styles.userInfo}>
            <img src={avatar} alt="Lina" />
            <span>Lina</span>
          </div>

          <div className={styles.priceInfo}>
            <span className={styles.oldPrice}>$100</span>
            <span className={styles.newPrice}>$80</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
