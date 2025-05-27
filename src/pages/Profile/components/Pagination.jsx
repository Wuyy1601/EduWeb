import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "../styles.module.scss";
const cx = classNames.bind(styles);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={cx("pagination__item")}>
          <button
            className={cx("pagination__button", {
              active: i === currentPage,
            })}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav className={cx("pagination")} aria-label="Page navigation">
      <ul className={cx("pagination__list")}>
        <li className={cx("pagination__item")}>
          <button
            className={cx("pagination__arrow")}
            aria-label="Previous page"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>

        {renderPageNumbers()}

        <li className={cx("pagination__item")}>
          <button
            className={cx("pagination__arrow")}
            aria-label="Next page"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
