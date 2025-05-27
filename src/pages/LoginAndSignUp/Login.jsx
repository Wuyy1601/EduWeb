import React, { useState } from "react";
import styles from "./styles.module.scss";
import imgCat from "@images/cat.png";
import MainLayout from "@components/Layout/Layout";
import MyHeader from "@components/Header/Header";

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);

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
                                        <label>First Name</label>
                                        <input type="text" placeholder="Enter your First Name" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label>Last Name</label>
                                        <input type="text" placeholder="Enter your Last Name" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label>Birthday</label>
                                        <input type="date" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label>City</label>
                                        <input type="text" placeholder="Enter your City" />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label>Email Address</label>
                                        <input type="email" placeholder="Enter your Email Address" />
                                    </div>
                                </>
                            )}

                            <div className={styles["form-group"]}>
                                <label>User name</label>
                                <input type="text" placeholder="Enter your User name" />
                            </div>

                            <div className={styles["form-group"]}>
                                <label>Password</label>
                                <div className={styles["password-input"]}>
                                    <input type="password" placeholder="Enter your Password" />
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
