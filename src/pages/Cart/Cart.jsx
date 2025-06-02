import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import MeoDiCho from '@images/MeoDiCho.png';

export default function Cart() {
    const [cart, setCart] = useState({ items: [] });
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy cart từ localStorage
        const stored = localStorage.getItem('cart');
        if (stored) {
            setCart({ items: JSON.parse(stored) });
        } else {
            setCart({ items: [] });
        }
    }, []);

    const handleCheckout = () => {
        if (cart.items.length > 0) {
            navigate('/checkout');
        }
    };

    const handleContinueShopping = () => {
        window.location.href = '/';
    };

    const handleRemoveItem = (id) => {
        const updated = cart.items.filter((item) => item.id !== id);
        setCart({ items: updated });
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    return (
        <MainLayout>
            <MyHeader />
            <div className={styles.cartPage} style={{ marginTop: '100px' }}>
                <div className={styles.cartContainer}>
                    <h2 className={styles.cartTitle}>Giỏ hàng</h2>
                    <div className={styles.cartCount}>{cart.items.length} khóa học trong giỏ hàng</div>
                    <div className={styles.cartContent}>
                        {cart.items.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <img src={MeoDiCho} alt="empty cart" className={styles.emptyCartImg} />
                                <p className={styles.emptyCartText}>
                                    Giỏ hàng của bạn đang trống. Hãy tiếp tục mua sắm để tìm một khóa học!
                                </p>
                                <button className={styles.continueBtn} onClick={handleContinueShopping}>
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        ) : (
                            <div className={styles.cartTableWrapper}>
                                <table className={styles.cartTable}>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left', width: '70%' }}>Tên khóa học</th>
                                            <th style={{ textAlign: 'right', width: '30%' }}>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items.map((item) => (
                                            <tr key={item.id} style={{ verticalAlign: 'middle' }}>
                                                <td>
                                                    <div className={styles.courseInfo}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className={styles.courseImg}
                                                        />
                                                        <span>{item.name}</span>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    <span style={{ fontWeight: 500 }}>
                                                        {item.price?.toLocaleString('vi-VN')} đ
                                                    </span>
                                                    <button
                                                        className={styles.deleteBtn}
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        title="Xóa"
                                                    >
                                                        ×
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className={styles.totalRow}>
                                            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Tổng cộng:</td>
                                            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                                {cart.items
                                                    .reduce((total, item) => total + (item.price || 0), 0)
                                                    .toLocaleString('vi-VN')}{' '}
                                                đ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className={styles.checkoutBtnWrapper}>
                                    <button
                                        className={styles.checkoutBtn}
                                        onClick={handleCheckout}
                                        disabled={cart.items.length === 0}
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <MyFooter />
        </MainLayout>
    );
}
