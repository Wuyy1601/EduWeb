import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import ChatGPT from '@components/ChatGPT/ChatGPT';

import profilePicture from '@images/profile-picture.png';
import profileBackground from '@images/profile-background.jpg';
import UserProfile from './contents/UserProfile';

import ProfileBanner from './components/ProfileBanner';
import ProfileNavigation from './components/ProfileNavigation';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Posts from './contents/Posts';
import Documents from './contents/Documents';

const cx = classNames.bind(styles);

const profileData = {
    name: 'John Anderson',
    title: 'Assistant Professor at McMaster University',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enum ad minim veniam, quis',
    rating: '4.9',
    followers: '1.2k',
};

function ProfileContent({ activeTab }) {
    switch (activeTab) {
        case '':
            return <UserProfile />;
        case 'posts':
            return <Posts />;
        case 'documents':
            return <Documents />;
        default:
            return null;
    }
}

function Profile() {
    let { id: activeTab } = useParams();
    activeTab = activeTab || '';
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // Thêm logic xử lý follow/unfollow ở đây
    };

    return (
        <MainLayout>
            <MyHeader />
            const [profileData, setProfileData] = useState(null);
            {/* useEffect(() => {
  const token = localStorage.getItem('token');
            axios.get('http://localhost:8081/profile/me', {
                headers: {Authorization: `Bearer ${token}` }
  })
  .then(res => setProfileData(res.data))
  .catch(err => console.error(err));
}, []); */}
            <div id={cx('content')}>
                <ProfileBanner
                    profilePicture={profilePicture}
                    backgroundImage={profileBackground}
                    name={profileData.name}
                    title={profileData.title}
                    description={profileData.description}
                    rating={profileData.rating}
                    followers={profileData.followers}
                    onFollow={handleFollow}
                    isFollowing={isFollowing}
                />

                <ProfileNavigation activeTab={activeTab} />

                <ProfileContent activeTab={activeTab} />
            </div>
            <ChatGPT />
            <MyFooter />
        </MainLayout>
    );
}

export default Profile;
