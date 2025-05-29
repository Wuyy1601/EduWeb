import Button from '@components/Button/Button';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);

function Highlight({ img }) {
    return (
        <section className={cx('highlight-container')}>
            <div className={cx('highlight')}>
                <div className={cx('highlight-list')}>
                    <h2>Ulearn có gì nổi bật?</h2>
                    <ul>
                        <li>📚 Kho tài liệu chất lượng cao</li>
                        <li>🔍 Tìm kiếm thông minh, theo chủ đề</li>
                        <li>📥 Tải tài liệu linh hoạt (PDF/Word)</li>
                    </ul>
                    <Button content="Start now" className={cx('start-btn')} />
                </div>
                <img src={img} alt={'highlight'} className={cx('image')} />
            </div>
        </section>
    );
}

export default Highlight;
