import React, { useState } from "react";
import styles from "./styles.module.scss";
import imgCat from "@images/cat.png";
import MainLayout from "@components/Layout/Layout";
import MyHeader from "@components/Header/Header";

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const formValidation = (data) => {
        if (isLogin) {
            if (!data.username || !data.password) {
                setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
                return false;
            }
        } else {
            if (!data.username || !data.password || !data.firstName || !data.lastName) {
                setError('Vui lòng nhập đầy đủ thông tin bắt buộc');
                return false;
            }
            if (data.password.length < 6) {
                setError('Mật khẩu phải có ít nhất 6 ký tự');
                return false;
            }
            if (data.username.length < 3) {
                setError('Tên đăng nhập phải có ít nhất 3 ký tự');
                return false;
            }
            // Validate username format (chỉ chứa chữ cái, số, underscore)
            if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
                setError('Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới');
                return false;
            }
        }
        return true;
    };

    const handleLogin = async (loginData) => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:8888/api/v1/identity/auth/token', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: loginData.username,
                    password: loginData.password
                })
            });

            const data = await res.json();
            console.log('Login response:', data);
            
            if (res.ok && data.result && data.result.token) {
                localStorage.setItem('token', data.result.token);
                localStorage.setItem('user', JSON.stringify(data.result));
                alert('Đăng nhập thành công!');
                window.location.href = '/';
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (registerData) => {
        try {
            setLoading(true);
            
            // Tạo payload theo format mà server mong đợi
            const payload = {
                username: registerData.username,
                password: registerData.password,
                firstName: registerData.firstName,
                lastName: registerData.lastName
            };

            // Chỉ thêm các field optional nếu có giá trị
            if (registerData.dob && registerData.dob.trim()) {
                payload.dob = registerData.dob;
            }
            if (registerData.city && registerData.city.trim()) {
                payload.city = registerData.city;
            }

            console.log('Sending registration payload:', payload); // Debug log

            const res = await fetch('http://localhost:8888/api/v1/identity/users/registration', {                                                                                   
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log('Register response:', data);
            
            if (res.ok) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                setIsLogin(true);
                setFormData({
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    dob: '',
                    city: ''
                });
            } else {
                // Hiển thị lỗi chi tiết từ server
                const errorMessage = data.message || data.error || `Đăng ký thất bại (${res.status})`;
                setError(errorMessage);
                console.error('Registration failed:', data);
            }
        } catch (error) {
            console.error('Register error:', error);
            setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formValidation(formData)) {
            return;
        }

        if (isLogin) {
            await handleLogin(formData);
        } else {
            await handleRegister(formData);
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
                                    onClick={() => {
                                        setIsLogin(true);
                                        setError('');
                                    }}
                                    type="button"
                                >
                                    Login
                                </button>
                                <button
                                    className={!isLogin ? styles.active : ""}
                                    onClick={() => {
                                        setIsLogin(false);
                                        setError('');
                                    }}
                                    type="button"
                                >
                                    Register
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div style={{ 
                                color: 'red', 
                                marginBottom: '15px', 
                                padding: '10px', 
                                backgroundColor: '#ffebee',
                                borderRadius: '5px',
                                border: '1px solid #ffcdd2'
                            }}>
                                {error}
                            </div>
                        )}

                        <form className={styles["auth-form"]} onSubmit={handleSubmit}>
                            {!isLogin && (
                                <>
                                    <div className={styles["form-group"]}>
                                        <label htmlFor="firstName">First Name *</label>
                                        <input 
                                            id="firstName" 
                                            name="firstName"
                                            type="text" 
                                            placeholder="Enter your First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required={!isLogin}
                                        />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input 
                                            id="lastName" 
                                            name="lastName"
                                            type="text" 
                                            placeholder="Enter your Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required={!isLogin}
                                        />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label htmlFor="dob">Birthday</label>
                                        <input 
                                            id="dob" 
                                            name="dob"
                                            type="date"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={styles["form-group"]}>
                                        <label htmlFor="city">City</label>
                                        <input 
                                            id="city" 
                                            name="city"
                                            type="text" 
                                            placeholder="Enter your City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </>
                            )}

                            <div className={styles["form-group"]}>
                                <label htmlFor="username">User name *</label>
                                <input 
                                    id="username" 
                                    name="username"
                                    type="text" 
                                    placeholder="Enter your User name"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles["form-group"]}>
                                <label htmlFor="password">Password *</label>
                                <div className={styles["password-input"]}>
                                    <input 
                                        id="password" 
                                        name="password"
                                        type="password" 
                                        placeholder="Enter your Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
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

                            <button 
                                className={styles["submit-btn"]}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Đang xử lý...' : (isLogin ? "Login" : "Register")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
