import classNames from "classnames/bind"
import styles from './styles.module.scss'

const cx = classNames.bind(styles)
function LoadingPage() {
    return (
        <div className={cx('loading-container')}>
            <div className={cx('loading')}>
                <span>U</span>
                <div className={cx('border')}></div>
            </div>
        </div>
    )
}

export default LoadingPage;