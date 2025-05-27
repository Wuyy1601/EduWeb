import { useState } from "react";
import MyFooter from "@components/Footer/Footer";
import MyHeader from "@components/Header/Header";
import MainLayout from "@components/Layout/Layout";

import profilePicture from "@images/profile-picture.png";
import profileBackground from "@images/profile-background.jpg";
import UserProfile from "./contents/UserProfile";

import ProfileBanner from "./components/ProfileBanner";
import ProfileNavigation from "./components/ProfileNavigation";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import Posts from "./contents/Posts";
import Documents from "./contents/Documents";

const cx = classNames.bind(styles);

function ProfileContent({ activeTab }) {
  switch (activeTab) {
    case "description":
      return <UserProfile />;
    case "post":
      return <Posts />;
    case "document":
      return <Documents />;
    default:
      return null;
  }
}

function Profile() {
  const [activeTab, setActiveTab] = useState("description");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const profileData = {
    name: "John Anderson",
    title: "Assistant Professor at McMaster University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enum ad minim veniam, quis",
    rating: "4.9",
    followers: "1.2k",
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Thêm logic xử lý follow/unfollow ở đây
  };

  const handleShowMore = () => {
    setShowFullDescription(!showFullDescription);
    // Thêm logic để hiển thị full description
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <MainLayout>
      <MyHeader />

      <div id={cx("content")}>
        <ProfileBanner
          profilePicture={profilePicture}
          backgroundImage={profileBackground}
          name={profileData.name}
          title={profileData.title}
          description={profileData.description}
          rating={profileData.rating}
          followers={profileData.followers}
          onFollow={handleFollow}
          onShowMore={handleShowMore}
          isFollowing={isFollowing}
        />

        <ProfileNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <ProfileContent activeTab={activeTab} />
      </div>

      <MyFooter />
    </MainLayout>
  );
}

export default Profile;
