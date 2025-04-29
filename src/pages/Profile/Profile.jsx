import MyFooter from "@components/Footer/Footer";
import MyHeader from "@components/Header/Header";
import MainLayout from "@components/Layout/Layout";
import "./styles.css";

function Profile() {
    return (   <MainLayout>
        <MyHeader />
            <div className="huongdan">
                làm Html vào đây - Profile
            </div>
        <MyFooter />
    </MainLayout> );
}

export default Profile;