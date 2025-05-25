import MyFooter from "@components/Footer/Footer";
import MyHeader from "@components/Header/Header";
import MainLayout from "@components/Layout/Layout";
import "./styles.css";

function Profile() {
    return (
        <MainLayout>
            <MyHeader />
            <div className="huongdan">
                <main>
                    <div id="content">
                        <section className="profile-banner">
                            <img src="./assets/images/avatar.png" alt="John Anderson" className="profile-avatar" />

                            <div className="profile-banner__content">
                                <div className="profile-banner__header">
                                    <div className="profile-banner_information">
                                        <h1 className="profile-name">John Anderson</h1>
                                        <p className="profile-title">Assistant Professor at McMaster University</p>
                                    </div>
                                    <button className="follow-button btn">Theo dõi</button>
                                </div>

                                <p className="profile-banner__description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    utlabore et dolore magna aliqua. Ut enum ad minim veniam, quis
                                    <i className="show-more">...Xem thêm</i>
                                </p>

                                <div className="profile-banner__footer">
                                    <div className="profile-rating">
                                        <div className="rating">
                                            <i className="fa-regular fa-star"></i>
                                            <span>4.9</span>
                                            <span>Đánh giá</span>
                                        </div>
                                        <div className="follower">
                                            <i className="fa-solid fa-eye"></i>
                                            <span>1.2k</span>
                                            <span>Theo dõi</span>
                                        </div>
                                    </div>
                                    <div className="social">
                                        <a href="#" className="social__link" aria-label="Twitter">
                                            <i className="fa-brands fa-twitter"></i>
                                        </a>
                                        <a href="#" className="social__link" aria-label="Youtube">
                                            <i className="fa-brands fa-youtube"></i>
                                        </a>
                                        <a href="#" className="social__link" aria-label="Instagram">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <form className="profile-navigate">
                            <input name="profile-selector" value="description" type="radio" id="description" defaultChecked />
                            <input name="profile-selector" value="post" type="radio" id="post" />
                            <input name="profile-selector" value="document" type="radio" id="document" />

                            <label htmlFor="description" className="profile-navigate__button btn">
                                Giới thiệu
                            </label>
                            <label htmlFor="post" className="profile-navigate__button btn">
                                Bài đăng
                            </label>
                            <label htmlFor="document" className="profile-navigate__button btn">
                                Tài liệu
                            </label>
                        </form>

                        <section className="profile-content">
                            <div className="card">reusable card</div>
                            <div className="card">reusable card</div>
                            <div className="card">reusable card</div>
                            <div className="card">reusable card</div>
                        </section>

                        <nav className="pagination" aria-label="Page navigation">
                            <ul className="pagination__list">
                                <li className="pagination__item">
                                    <button className="pagination__arrow" aria-label="Previous page">
                                        <i className="fa-solid fa-angle-left"></i>
                                    </button>
                                </li>
                                <li className="pagination__item"><button className="pagination__button">1</button></li>
                                <li className="pagination__item"><button className="pagination__button">2</button></li>
                                <li className="pagination__item">
                                    <button className="pagination__button pagination__button--active">3</button>
                                </li>
                                <li className="pagination__item"><button className="pagination__button">4</button></li>
                                <li className="pagination__item"><button className="pagination__button">5</button></li>
                                <li className="pagination__item">
                                    <button className="pagination__arrow" aria-label="Next page">
                                        <i className="fa-solid fa-angle-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </main>
            </div>
            <MyFooter />
        </MainLayout>
    );
}

export default Profile;
