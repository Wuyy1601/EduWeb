import styles from './styles.module.scss';
import avatarLina from '@images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import { dataCourse } from '@components/Recommend/constant';

function RecommendedDocuments() {


  const { container, header, cardWrapper, card, img ,cardImage, cardBody, cardInfo, cardTitle, cardDesc, cardFooter, cardAuthor, cardPrice } = styles;

  return (
    <div className={container}>
      <div className={header}>
        <h2>Tài liệu gợi ý</h2>
        <a href="#">Xem tất cả</a>
      </div>

      <div className={cardWrapper}>
        {dataCourse.map((item) => (
          <div key={item.id} className={card}>
            <div className={img}>
            <img src={item.img} alt="Document" className={cardImage} />
            </div>
            <div className={cardBody}>
              <div className={cardInfo}>
                <span><FontAwesomeIcon icon={faTableCellsLarge} /> Design</span>
                <span> <FontAwesomeIcon icon={faClock} /> 3 Month</span>
              </div>
              <h3 className={cardTitle}>{item.title}</h3>
              <p className={cardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
              <div className={cardFooter}>
                <div className={cardAuthor}>
                  <img src={avatarLina} alt="Author" />
                  <span>Lina</span>
                </div>
                <div className={cardPrice}>
                  <del>{item.priceOld}</del>
                  <span>{item.priceNew}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedDocuments;
