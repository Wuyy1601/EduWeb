import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import imgCat from '@images/cat.png';
import MainLayout from '@components/Layout/Layout';
import MyHeader from '@components/Header/Header';

export default function LoginRegister() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: '',
        city: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
        }
        return true;
    };

    const handleLogin = async (loginData) => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:8888/api/v1/identity/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: loginData.username,
                    password: loginData.password,
                }),
            });

            const data = await res.json();
            if (res.ok && data?.result?.token) {
                localStorage.setItem('token', data.result.token);
                navigate('/'); // chuyển hướng
            } else {
                setError(data?.message || 'Đăng nhập thất bại');
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
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const res = await fetch('http://localhost:8888/api/v1/identity/users/registration', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    username: registerData.username,
                    password: registerData.password,
                    firstName: registerData.firstName,
                    lastName: registerData.lastName,
                    dob: registerData.dob || null,
                    city: registerData.city || null,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                setIsLogin(true);
                setFormData({
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    dob: '',
                    city: '',
                });
            } else {
                setError(data?.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Register error:', error);
            setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (login) => {
        setIsLogin(login);
        setError('');
        setFormData({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dob: '',
            city: '',
        });
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
                <div className={styles['auth-container']} style={{ borderRadius: 10, margin: 40 }}>
                    <div className={styles['auth-left']}>
                        <img src={imgCat} alt="Mascot" className={styles['auth-image']} />
                    </div>
                    <div className={styles['auth-right']}>
                        <h2>Welcome to Ulearn</h2>
                        <div className={styles['auth-toggle']}>
                            <div className={styles['toggle-group']}>
                                <div
                                    className={styles['toggle-indicator']}
                                    style={{
                                        transform: isLogin ? 'translateX(0%)' : 'translateX(100%)',
                                    }}
                                />
                                <button
                                    className={isLogin ? styles.active : ''}
                                    onClick={() => handleToggle(true)}
                                    type="button"
                                >
                                    Login
                                </button>
                                <button
                                    className={!isLogin ? styles.active : ''}
                                    onClick={() => handleToggle(false)}
                                    type="button"
                                >
                                    Register
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                style={{
                                    color: 'red',
                                    marginBottom: '15px',
                                    padding: '10px',
                                    backgroundColor: '#ffebee',
                                    borderRadius: '5px',
                                    border: '1px solid #ffcdd2',
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <form className={styles['auth-form']} onSubmit={handleSubmit}>
                            {!isLogin && (
                                <>
                                    <div className={styles['form-group']}>
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
                                    <div className={styles['form-group']}>
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
                                    <div className={styles['form-group']}>
                                        <label htmlFor="dob">Birthday</label>
                                        <input
                                            id="dob"
                                            name="dob"
                                            type="date"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={styles['form-group']}>
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

                            <div className={styles['form-group']}>
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

                            <div className={styles['form-group']}>
                                <label htmlFor="password">Password *</label>
                                <div className={styles['password-input']}>
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
                                <div className={styles['form-bottom']}>
                                    <label>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <a href="#">Forgot password?</a>
                                </div>
                            )}

                            <button className={styles['submit-btn']} type="submit" disabled={loading}>
                                {loading ? 'Đang xử lý...' : isLogin ? 'Login' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
