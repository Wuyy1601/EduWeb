import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faStar, faUserFriends, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';

import profileBackground from '@images/profile-background.jpg';
import UserProfile from './contents/UserProfile';

import ProfileBanner from './components/ProfileBanner';
import ProfileNavigation from './components/ProfileNavigation';
import Background from '@images/BackGr.jpg';

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

function ProfileContent({ activeTab, profile }) {
    switch (activeTab) {
        case '':
            return <div className={cx('profile-intro')}>Chào mừng đến trang cá nhân của {profile?.firstName}! Chọn một mục ở trên để xem chi tiết.</div>;
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
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const avatarFileInputRef = useRef(null);
    const bannerFileInputRef = useRef(null);

    let { id: activeTab } = useParams();
    activeTab = activeTab || '';

    const token = localStorage.getItem('token');

    const fetchProfile = async () => {
        if (!token) {
            console.error("Không tìm thấy token.");
            return;
        }
        try {
            const res = await fetch('http://localhost:8888/api/v1/profile/users/my-profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Lỗi HTTP: ${res.status}`);
            }
            const apiResponse = await res.json();
            if (apiResponse.result) {
                const fetchedProfile = apiResponse.result;
                setProfile(fetchedProfile);
                setFormData({
                    firstName: fetchedProfile.firstName || '',
                    lastName: fetchedProfile.lastName || '',
                    city: fetchedProfile.city || '',
                    title: fetchedProfile.title || 'Chưa có tiêu đề',
                    description: fetchedProfile.description || 'Chưa có mô tả',
                });
            } else {
                console.error("Không có dữ liệu profile:", apiResponse.message);
            }
        } catch (error) {
            console.error("Không thể tải profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [token]);

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveProfileText = async () => {
        if (!token) return;
        try {
            const res = await fetch('http://localhost:8888/api/v1/profile/users/my-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setEditMode(false);
                fetchProfile();
                alert("Cập nhật thông tin thành công!");
            } else {
                const errData = await res.json();
                alert(`Lỗi khi cập nhật: ${errData.message || 'Vui lòng thử lại.'}`);
            }
        } catch (error) {
            console.error("Lỗi khi lưu profile:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    };

    const handleAvatarChange = async e => {
        const file = e.target.files[0];
        if (!file || !token) return;

        setAvatarPreview(URL.createObjectURL(file));
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            const res = await fetch('http://localhost:8888/api/v1/profile/users/avatar', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: uploadFormData,
            });
            if (res.ok) {
                setAvatarPreview(null);
                fetchProfile();
                alert("Cập nhật ảnh đại diện thành công!");
            } else {
                setAvatarPreview(null);
                alert("Cập nhật ảnh đại diện thất bại!");
            }
        } catch (error) {
            setAvatarPreview(null);
            console.error("Lỗi upload avatar:", error);
            alert("Lỗi khi upload ảnh đại diện.");
        }
    };

    const handleBannerChange = async e => {
        const file = e.target.files[0];
        if (!file || !token) return;

        setBannerPreview(URL.createObjectURL(file));
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            const res = await fetch('http://localhost:8888/api/v1/profile/users/banner', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: uploadFormData,
            });
            if (res.ok) {
                setBannerPreview(null);
                fetchProfile();
                alert("Cập nhật ảnh bìa thành công!");
            } else {
                setBannerPreview(null);
                alert("Cập nhật ảnh bìa thất bại!");
            }
        } catch (error) {
            setBannerPreview(null);
            console.error("Lỗi upload banner:", error);
            alert("Lỗi khi upload ảnh bìa.");
        }
    };

    const getFullName = () => {
        if (!profile) return "Người dùng";
        return `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || "Chưa cập nhật tên";
    };

    if (!profile) {
        return (
            <MainLayout>
                <MyHeader />
                <div className={cx('loading-profile')}>Đang tải thông tin trang cá nhân...</div>
                <ChatBot />
                <MyFooter />
            </MainLayout>
        );
    }

    const currentAvatarUrl = avatarPreview || (profile.avatar ? `${profile.avatar}?t=${Date.now()}` : Background);
    const currentBannerUrl = bannerPreview || (profile.bannerUrl ? `${profile.bannerUrl}?t=${Date.now()}` : Background);


    return (
        <MainLayout>
            <MyHeader />
            <div id={cx('content')} className={cx('profile-page-container')}>
                <div className={cx('profile-banner-container')} style={{ backgroundImage: `url(${currentBannerUrl})` }}>
                    <button className={cx('change-banner-btn')} onClick={() => bannerFileInputRef.current && bannerFileInputRef.current.click()}>
                        <FontAwesomeIcon icon={faCamera} /> Đổi ảnh bìa
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={bannerFileInputRef}
                        onChange={handleBannerChange}
                    />
                </div>

                <div className={cx('profile-header-content')}>
                    <div className={cx('profile-avatar-wrapper')}>
                        <img
                            src={currentAvatarUrl}
                            alt="Avatar"
                            className={cx('profile-avatar-image')}
                            onClick={() => avatarFileInputRef.current && avatarFileInputRef.current.click()}
                        />
                        <button className={cx('change-avatar-btn')} onClick={() => avatarFileInputRef.current && avatarFileInputRef.current.click()}>
                            <FontAwesomeIcon icon={faCamera} />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={avatarFileInputRef}
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <div className={cx('profile-info-card')}>
                        {editMode ? (
                            <div className={cx('profile-edit-form')}>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Tên" />
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Họ" />
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Chức danh/Nghề nghiệp" />
                                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Mô tả bản thân..." />
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Thành phố" />
                                <div className={cx('edit-actions')}>
                                    <button onClick={handleSaveProfileText} className={cx('save-btn')}>Lưu</button>
                                    <button onClick={() => setEditMode(false)} className={cx('cancel-btn')}>Hủy</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={cx('main-info')}>
                                    <h2 className={cx('profile-name')}>{getFullName()}</h2>
                                    <button onClick={() => setEditMode(true)} className={cx('edit-profile-btn')}>
                                        <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                                    </button>
                                </div>
                                <p className={cx('profile-title')}>{profile.title || formData.title}</p>
                                <p className={cx('profile-description')}>{profile.description || formData.description}</p>
                                {profile.city && <p className={cx('profile-city')}>Sống tại: {profile.city}</p>}
                            </>
                        )}

                        <div className={cx('profile-stats-social')}>
                            <div className={cx('profile-stats')}>
                                <span className={cx('rating')}>
                                    <FontAwesomeIcon icon={faStar} /> {profile.rating || 'N/A'} Instructor Rating
                                </span>
                                <span className={cx('followers')}>
                                    <FontAwesomeIcon icon={faUserFriends} /> {profile.followers || '0'} Theo dõi
                                </span>
                            </div>
                            <div className={cx('social-links')}>
                                <a href={profile.socialLinks?.twitter || '#'} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                                <a href={profile.socialLinks?.youtube || '#'} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a>
                                <a href={profile.socialLinks?.instagram || '#'} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <ProfileNavigation activeTab={activeTab} userId={profile?.userId} />
                <ProfileContent activeTab={activeTab} profile={profile} />
            </div>
            <ChatBot />
            <MyFooter />
        </MainLayout>
    );
}

export default Profile;
