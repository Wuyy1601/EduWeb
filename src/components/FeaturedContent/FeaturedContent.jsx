import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import imgLaptop from '@images/laptop.jpg';
import avatarLina from '@images/avatar.jpg';
import Button from '@components/Button/Button';

function FeaturedContent() {
    const { featuredContent , container, header, contentWrapper, card, img ,cardImage, cardBody, cardTitle, cardAuthor, cardDescription, cardFooter, sliderButtons, sliderButton, cardViews } = styles;
  return (
    <div className={featuredContent}>
            <div className={container}>
      <div className={header}>
        <h2>Nội dung nổi bật</h2>
        <a href="#">Xem tất cả</a>
      </div>

      <div className={contentWrapper}>
        <div className={card}>
        <div className={img}>
            <img src={imgLaptop} alt="Class event" className={cardImage} />
          </div>
          <div className={cardBody}>
            <a href="#" className={cardTitle}>
              Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
            </a>
            <div className={cardAuthor}>
              <img src={avatarLina} alt="Author Lina" />
              <span>Lina</span>
            </div>
            <p className={cardDescription}>
              Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
            </p>
            <div className={cardFooter}>
              <a href="#">Read more</a>
              <div className={cardViews}>
              <FontAwesomeIcon icon={faEye} /> 251,232
              </div>
            </div>
          </div>
        </div>
        <div className={card}>
          <div className={img}>
            <img src={imgLaptop} alt="Class event" className={cardImage} />
          </div>
          <div className={cardBody}>
            <a href="#" className={cardTitle}>
              Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
            </a>
            <div className={cardAuthor}>
              <img src={avatarLina} alt="Author Lina" />
              <span>Lina</span>
            </div>
            <p className={cardDescription}>
              Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
            </p>
            <div className={cardFooter}>
              <a href="#">Read more</a>
              <div className={cardViews}>
              <FontAwesomeIcon icon={faEye} /> 251,232
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={sliderButtons}>
        <Button className={sliderButton} content={<FontAwesomeIcon icon={faAngleLeft} />}></Button>
        <Button className={sliderButton} content={<FontAwesomeIcon icon={faAngleRight} />}></Button>
      </div>
    </div>
    </div>
  );
}

export default FeaturedContent;
