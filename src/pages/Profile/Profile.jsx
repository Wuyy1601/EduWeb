import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';

import profileBackground from '@images/profile-background.jpg';
import UserProfile from './contents/UserProfile';

import ProfileBanner from './components/ProfileBanner';
import ProfileNavigation from './components/ProfileNavigation';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Posts from './contents/Posts';
import Documents from './contents/Documents';
import ChatBot from '@components/ChatBot/ChatBot';

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
    const [profile, setProfile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef();
    let { id: activeTab } = useParams();
    activeTab = activeTab || '';
    const [isFollowing, setIsFollowing] = useState(false);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8888/api/v1/profile/users/my-profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        const user = data.result || data;
        setProfile(user);
        setForm(user);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        await fetch('http://localhost:8888/api/v1/profile/users/my-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });
        setEdit(false);
        fetchProfile();
    };

    const handleAvatarChange = async e => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('token');
        await fetch('http://localhost:8888/api/v1/profile/users/avatar', {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setAvatarPreview(null);
        fetchProfile();
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // Thêm logic follow/unfollow nếu cần
    };

    if (!profile) return <div>Đang tải...</div>;

    return (
        <MainLayout>
            <MyHeader />
            <div id={cx('content')}>
                {/* AVATAR + NÚT ĐỔI ẢNH */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={
                                avatarPreview ||
                                (profile.avatar ? profile.avatar + '?t=' + Date.now() : '/default-avatar.png')
                            }
                            alt="avatar"
                            style={{
                                width: 140,
                                height: 140,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '4px solid #fff',
                                boxShadow: '0 2px 8px #0001'
                            }}
                            onClick={() => fileInputRef.current.click()}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                        />
                        <button
                            style={{
                                position: 'absolute',
                                bottom: 8,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#ffe066',
                                border: 'none',
                                borderRadius: 8,
                                padding: '4px 12px',
                                cursor: 'pointer'
                            }}
                            onClick={() => fileInputRef.current.click()}
                        >
                            Đổi ảnh đại diện
                        </button>
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>{profile.fullName}</h2>
                        <div>{profile.title}</div>
                        <div>{profile.description}</div>
                    </div>
                </div>

                <ProfileNavigation activeTab={activeTab} />
                <ProfileContent activeTab={activeTab} />
            </div>
            <ChatBot />
            <MyFooter />
        </MainLayout>
    );
}

export default Profile;
