import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';
const cx = classNames.bind(styles);

const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 10',
    'Option 11',
    'Option 12',
    'Option 13',
];

function DropdownFilter({ children, options, filter, setValue, filterValue }) {
    const [toggle, setToggle] = useState(false);
    const ref = useRef();

    function handleClick(value) {
        setToggle(false);
        setValue({ ...filterValue, [filter]: value });
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setToggle(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('filter')} ref={ref}>
            <button className={cx('filter-btn', { selected: filterValue[filter] })} onClick={() => setToggle(!toggle)}>
                <span>{filterValue[filter] || children}</span>
                <FontAwesomeIcon icon={faChevronDown} className={cx({ hidden: filterValue[filter] })} />
                <FontAwesomeIcon
                    icon={faXmark}
                    className={cx('clear', {
                        hidden: !filterValue[filter],
                    })}
                    onClick={(e) => {
                        e.stopPropagation();
                        setToggle(false);
                        setValue({ ...filterValue, [filter]: null });
                    }}
                />
            </button>

            <ul className={cx('dropdown', { hidden: !toggle })}>
                {options.map((option, index) => (
                    <li key={index} className={cx('option')}>
                        <button onClick={() => handleClick(option)}>{option}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownFilter;
