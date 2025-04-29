import styles from "../styles.module.scss";
import CourseCard from "./CourseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Button from "@components/Button/Button";

function Courses({ title }) {
  const {courseContainer, sliderButtons, sliderButton} = styles;
  return (
    <div className={courseContainer}>
       <section className={styles.courses}>
      <div className={styles.courseHeader}>
        <h2>{title}</h2>
        <a href="#">Xem tất cả</a>
      </div>

      <div className={styles.courseGrid}>
        {Array(4).fill().map((_, index) => (
          <CourseCard key={index} />
        ))}
      </div>
      <div className={sliderButtons}>
        <Button className={sliderButton} content={<FontAwesomeIcon icon={faAngleLeft} />}></Button>
        <Button className={sliderButton} content={<FontAwesomeIcon icon={faAngleRight} />}></Button>
      </div>
    </section>
    </div>
  );
}

export default Courses;
