import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Pages({ totalPages, currentPage, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <li key={i} className={cx('pagination__item')}>
                <button
                    className={cx('pagination__button', {
                        active: i == currentPage,
                    })}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            </li>,
        );
    }
    return pages;
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    useEffect(() => {
        if (currentPage > totalPages) onPageChange(totalPages);
        if (currentPage < 1 || !+currentPage) onPageChange(1);
    }, [totalPages, onPageChange, currentPage]);

    return (
        <nav className={cx('pagination')} aria-label="Page navigation">
            <ul className={cx('pagination__list')}>
                <li className={cx('pagination__item')}>
                    <button
                        className={cx('pagination__arrow')}
                        aria-label="Previous page"
                        onClick={() => onPageChange(+currentPage - 1)}
                        disabled={currentPage == 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                </li>

                <Pages currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />

                <li className={cx('pagination__item')}>
                    <button
                        className={cx('pagination__arrow')}
                        aria-label="Next page"
                        onClick={() => onPageChange(+currentPage + 1)}
                        disabled={currentPage == totalPages}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
