import userProfileImg from "@images/user-profile.jpg";

import classNames from "classnames/bind";
import styles from "../styles.module.scss";

const cx = classNames.bind(styles);

function UserProfile() {
  return (
    <div id={cx("profile-container")}>
      <img
        src={userProfileImg}
        alt={"Thông tin cá nhân"}
        className={cx("user-profile")}
      />
    </div>
  );
}
export default UserProfile;
