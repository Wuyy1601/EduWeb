import styles from './styles.module.scss';

function VideoModal({ src, onClose }) {
    return (
        <div className={styles.videoModal}>
            <div className={styles.videoContent}>
                <button className={styles.closeBtn} onClick={onClose}>
                    ✖
                </button>
                <video src={src} controls autoPlay className={styles.modalVideo} />
            </div>
        </div>
    );
}

export default VideoModal;
