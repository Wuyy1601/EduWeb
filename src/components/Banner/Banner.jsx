import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import imgCat from '@images/cat.png';
import banner2 from '@images/banner2.png';
import Button from '../Button/Button';

function Banner() {
    const {
        container,
        container1,
        bannerTop,
        contentLeft,
        contentRight,
        title,
        description,
        buttonSignUp,
        catImage,
        bannerBottom,
        mobileDescription,
    } = styles;
    const navigate = useNavigate();

    return (
        <div className={container}>
            <div className={container1}>
                <div className={bannerTop}>
                    <div className={contentLeft}>
                        <h1 className={title}>Ulearn</h1>
                        <p className={description}>
                            Ulearn mang đến cho bạn kho tài liệu học tập được <strong>chọn lọc</strong> kỹ lưỡng, rõ
                            ràng và dễ tiếp cận. Dù bạn đang ôn thi, làm bài tập hay tìm hiểu kiến thức mới, Ulearn giúp
                            bạn nắm bắt cốt lõi, học tập hiệu quả mà không tốn thời gian tìm kiếm lan man.{' '}
                            <strong>Học thông minh, hiểu sâu bản chất</strong> – cùng Ulearn chạm đến thành công.
                        </p>
                        {/* Mobile description */}
                        <p className={mobileDescription}>
                            Ulearn - Kho tài liệu học tập <strong>chọn lọc</strong>, giúp bạn học tập hiệu quả.{' '}
                            <strong>Học thông minh, hiểu sâu bản chất</strong>
                        </p>
                    </div>

                    <div className={contentRight}>
                        <img src={imgCat} alt="Cute character" className={catImage} />
                    </div>
                </div>
            </div>

            {/* Phần dưới */}
            <div className={bannerBottom}>
                <img src={banner2} alt="Banner Ulearn" />
            </div>
        </div>
    );
}

export default Banner;
