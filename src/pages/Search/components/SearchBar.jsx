import { useState } from 'react';

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
    return (
        <div className={cx('search-container')}>
            <div className={cx('search')}>
                <input type="text" className={cx('search-bar')} placeholder="Search your favourite course" />
                <Button className={cx('search-btn')} content="Search" />
            </div>
            <div className={cx('search-filter')}>
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
    );
}

export default SearchBar;
