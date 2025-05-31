import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Button from '@components/Button/Button';
import DropdownFilter from './DropdownFilter';

import classNames from 'classnames/bind';
import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

const filterOptions = [
    { label: 'Subject', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
    { label: 'Partner', options: ['Option 1', 'Option 2'] },
    { label: 'Program', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
    { label: 'Language', options: ['Option 1'] },
    { label: 'Availability', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
    { label: 'Learning Type', options: ['Option 1', 'Option 2', 'Option 3'] },
];

function SearchBar() {
    const [filterValue, setFilterValue] = useState({});
    const [filterToggleMobile, setFilterToggleMobile] = useState(false);
    const ref = useRef()
    const filterRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && ref && !ref.current.contains(event.target) && !filterRef.current.contains(event.target)) {
                setFilterToggleMobile(false);
            }
        }
        console.log(filterRef.current)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={cx('search-container')}>
            <div className={cx('search')}>
                <input type="text" className={cx('search-bar')} placeholder="Search your favourite course" />
                <Button className={cx('search-btn')} content="Search" />
                <Button className={cx('search-btn', 'mobile')} content={<FontAwesomeIcon icon={faMagnifyingGlass} />} />
            </div>
            <div className={cx('search-filter', 'mobile-hide')}>
                {filterOptions.map((filter, index) => (
                    <DropdownFilter
                        key={index}
                        options={filter.options}
                        filter={filter.label}
                        setValue={setFilterValue}
                        filterValue={filterValue}
                    >
                        {filter.label}
                    </DropdownFilter>
                ))}
            </div>
            <div className={cx('mobile-filter')}>
                <Button ref={ref} className={cx('filter-toggle', { active: filterToggleMobile })} content={
                    <><FontAwesomeIcon icon={faFilter} />
                        Filter
                    </>}
                    onClick={() => setFilterToggleMobile(!filterToggleMobile)}
                />

                <div ref={filterRef} onClick={(e) => console.log('hello')} className={cx('mobile-filter-container')}>
                    {filterOptions.map((filter, index) => (
                        <DropdownFilter
                            key={index}
                            options={filter.options}
                            filter={filter.label}
                            setValue={setFilterValue}
                            filterValue={filterValue}
                        >
                            {filter.label}
                        </DropdownFilter>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default SearchBar;
