import { useNavigate } from 'react-router-dom';

import Button from '@components/Button/Button';

import routes from '../routes';

import styles from '../styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProfileNavigation = ({ activeTab = '' }) => {
    const navigate = useNavigate();

    return (
        <div className={cx('profile-navigate')}>
            {routes.map((route, id) => {
                return (
                    <Button
                        className={cx({ active: activeTab === route.path })}
                        onClick={() => navigate(`/profile/${route.path}`)}
                        content={route.content}
                        key={id}
                    />
                );
            })}
        </div>
    );
};

export default ProfileNavigation;
