import MyFooter from "@components/Footer/Footer";
import MyHeader from "@components/Header/Header";
import MainLayout from "@components/Layout/Layout";
import "./styles.css";

function Profile() {
    return (   <MainLayout>
        <MyHeader />
            <div className="huongdan">
{/*                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="./assets/css/profile.css">
</head>
<body>
    <main>
        <div id="content">
            <section class="profile-banner">
                <img src="./assets/images/avatar.png" alt="John Anderson" class="profile-avatar" />

                <div class="profile-banner__content">
                    <div class="profile-banner__header">
                        <div class="profile-banner_information">
                            <h1 class="profile-name">John Anderson</h1>
                            <p class="profile-title">Assistant Professor at McMaster University</p>
                        </div>
                        <button class="follow-button btn">Theo dõi</button>
                    </div>

                    <p class="profile-banner__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        utlabore et dolore magna aliqua. Ut enum ad minim veniam, quis
                        <i class="show-more">...Xem thêm</i>
                    </p>

                    <div class="profile-banner__footer">
                        <div class="profile-rating">
                            <div class="rating">
                                <i class="fa-regular fa-star"></i>
                                <span>4.9</span>
                                <span>Đánh giá</span>
                            </div>
                            <div class="follower">
                                <i class="fa-solid fa-eye"></i>
                                <span>1.2k</span>
                                <span>Theo dõi</span>
                            </div>

                        </div>
                        <div class="social">
                            <a href="#" class="social__link" aria-label="Twitter">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" class="social__link" aria-label="Youtube">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                            <a href="#" class="social__link" aria-label="Instagram">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <form class="profile-navigate" action="#">
                <input name="profile-selector" value="description" type="radio" id="description" checked>
                <input name="profile-selector" value="post" type="radio" id="post">
                <input name="profile-selector" value="document" type="radio" id="document">

                <label for="description" class="profile-navigate__button btn">
                    Giới thiệu
                </label>
                <label for="post" class="profile-navigate__button btn">
                    Bài đăng
                </label>
                <label for="document" class="profile-navigate__button btn">
                    Tài liệu
                </label>
            </form>


            <section class="profile-content">
                <div class="card">reusable card</div>
                <div class="card">reusable card</div>
                <div class="card">reusable card</div>
                <div class="card">reusable card</div>
            </section>

            <nav class="pagination" aria-label="Page navigation">
                <ul class="pagination__list">
                    <li class="pagination__item">
                        <button class="pagination__arrow" aria-label="Previous page"><i
                                class="fa-solid fa-angle-left"></i></button>
                    </li>
                    <li class="pagination__item"><button class="pagination__button">1</button></li>
                    <li class="pagination__item"><button class="pagination__button">2</button></li>
                    <li class="pagination__item">
                        <button class="pagination__button pagination__button--active">3</button>
                    </li>
                    <li class="pagination__item"><button class="pagination__button">4</button></li>
                    <li class="pagination__item"><button class="pagination__button">5</button></li>
                    <li class="pagination__item">
                        <button class="pagination__arrow" aria-label="Next page"><i
                                class="fa-solid fa-angle-right"></i></button>
                    </li>
                </ul>
            </nav>

        </div>
    </main>
</body>
</html> */}
            </div>
        <MyFooter />
    </MainLayout> );
}

export default Profile;
