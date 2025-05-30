import React, { useState } from "react";
import styles from "./styles.module.scss";
import imgCat from "@images/cat.png";
import MainLayout from "@components/Layout/Layout";
import MyHeader from "@components/Header/Header";

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);

    const formValidation = (data) => {

    }

    const handleSubmit = (data) => {
        formValidation(data);
    }

    const handleRegister = async (formData) => {
        const res = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok) {
            alert('Đăng ký thành công!');
            // Chuyển sang trang đăng nhập hoặc tự động đăng nhập
        } else {
            alert(data.message || 'Đăng ký thất bại');
        }
    };

    const handleLogin = async (formData) => {
        const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok && data.token) {
            localStorage.setItem('token', data.token);
            // Cập nhật trạng thái đăng nhập, chuyển sang trang chính
        } else {
            alert(data.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <MainLayout>
            <MyHeader />
            <div style={{ minHeight: '100vh', marginTop: 100 }}>
                <div className={styles["auth-container"]} style={{ borderRadius: 10, margin: 40 }}>
                    <div className={styles["auth-left"]}>
                        <img
                            src={imgCat}
                            alt="Mascot"
                            className={styles["auth-image"]}
                        />
                    </div>
                    <div className={styles["auth-right"]}>
                        <h2>Welcome to Ulearn</h2>
                        <div className={styles["auth-toggle"]}>
                            <div className={styles["toggle-group"]}>
                                <div
                                    className={styles["toggle-indicator"]}
                                    style={{
                                        transform: isLogin ? "translateX(0%)" : "translateX(100%)"
                                    }}
                                />
                                <button
                                    className={isLogin ? styles.active : ""}
                                    onClick={() => setIsLogin(true)}
                                    type="button"
                                >
                                    Login
                                </button>
                                <button
                                    className={!isLogin ? styles.active : ""}
                                    onClick={() => setIsLogin(false)}
                                    type="button"
                                >
                                    Register
                                </button>
                            </div>
                        </div>

                        <form className={styles["auth-form"]}>
                            {!isLogin && (
                                <>
                                    <div className={styles["form-group"]}>
                                        <label for="fname">First Name</label>
                                        <input id="fname" type="text" placeholder="Enter your First Name" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label for="lname">Last Name</label>
                                        <input id="lname" type="text" placeholder="Enter your Last Name" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label for="bday">Birthday</label>
                                        <input id="bday" type="date" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label for="city">City</label>
                                        <input id="city" type="text" placeholder="Enter your City" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label for="email">Email Address</label>
                                        <input id="email" type="email" placeholder="Enter your Email Address" />
                                    </div>
                                </>
                            )}

                            <div className={styles["form-group"]}>
                                <label for="uname">User name</label>
                                <input id='uname' type="text" placeholder="Enter your User name" />
                            </div>

                            <div className={styles["form-group"]}>
                                <label for="password">Password</label>
                                <div className={styles["password-input"]}>
                                    <input id="password" type="password" placeholder="Enter your Password" />
                                </div>
                            </div>

                            {isLogin && (
                                <div className={styles["form-bottom"]}>
                                    <label>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <a href="#">Forgot password?</a>
                                </div>
                            )}

                            <button className={styles["submit-btn"]}>
                                {isLogin ? "Login" : "Register"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 
