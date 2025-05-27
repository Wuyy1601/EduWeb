import Button from "@components/Button/Button";

import styles from "../styles.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ProfileNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className={cx("profile-navigate")}>
      <Button
        className={cx({
          active: activeTab === "description",
        })}
        onClick={() => onTabChange("description")}
        content={"Giới thiệu"}
      />
      <Button
        className={cx({
          active: activeTab === "post",
        })}
        onClick={() => onTabChange("post")}
        content={"Bài đăng"}
      />
      <Button
        className={cx({
          active: activeTab === "document",
        })}
        onClick={() => onTabChange("document")}
        content={"Tài liệu"}
      />
    </div>
  );
};

export default ProfileNavigation;
