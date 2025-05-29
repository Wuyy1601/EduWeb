import Button from "@components/Button/Button";
import styles from "../styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { slidesMenu } from "../constant";
import { useNavigate } from "react-router-dom";


function Banner() {
  const { containerBanner, cardImg, img } = styles;
  const navigate = useNavigate();

  return (
    <div className={containerBanner}>
      <section className={styles.banner}>
        <div className={styles.bannerHeader}>
          <h2>Chào mừng bạn trở lại, bạn đã sẵn sàng cho bài học tiếp theo chưa?</h2>
          <a href="#">Xem tất cả</a>
        </div>
        <div className={styles.slides}>
          {slidesMenu.map((item, index) => (
            <div
              key={index}
              className={styles.slide}
              onClick={() => navigate(`/reviewdocument/${item.id || index + 1}`)}
              style={{ cursor: "pointer" }}
            >
              <div className={cardImg}><img className={img} src={item.image} alt={item.title} /></div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <Button content={<FontAwesomeIcon icon={faAngleLeft} />}></Button>
          <Button content={<FontAwesomeIcon icon={faAngleRight} />}></Button>
        </div>
      </section>
    </div>
  )
}

export default Banner;
