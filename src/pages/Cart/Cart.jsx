import React from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import MyHeader from '@components/Header/Header';

const mockCart = {
    items: [
        { id: 1, name: 'JavaScript Cơ Bản', price: 2000000, quantity: 1, image: 'https://i.imgur.com/0y8Ftya.png' },
        { id: 2, name: 'React.js Advanced', price: 2500000, quantity: 1, image: 'https://i.imgur.com/YWN7h2T.png' }
    ]
};

export default function Cart() {
    const navigate = useNavigate();
    const cart = mockCart;

    const handleCheckout = () => {
        alert('Thanh toán thành công!');
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    return (
        <div className={styles.pageWrapper}>
            <MyHeader />

            <div className={styles.cartPage}>
                <div className={styles.cartContainer}>
                    <h2 className={styles.cartTitle}>Giỏ hàng</h2>
                    <div className={styles.cartCount}>
                        {cart.items.length} khóa học trong giỏ hàng
                    </div>
                    <div className={styles.cartContent}>
                        {cart.items.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                                    alt="empty cart"
                                    className={styles.emptyCartImg}
                                />
                                <p className={styles.emptyCartText}>
                                    Giỏ hàng của bạn đang trống. Hãy tiếp tục mua sắm để tìm một khóa học!
                                </p>
                                <button className={styles.continueBtn} onClick={handleContinueShopping}>
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        ) : (
                            <div className={styles.cartTableWrapper}>
                                <div className={styles.cartTable}>
                                    <div className={styles.cartTableHeader}>
                                        <div>Tên khóa học</div>
                                        <div>Số lượng</div>
                                        <div>Thành tiền</div>
                                    </div>
                                    <div className={styles.cartTableBody}>
                                        {cart.items.map((item) => (
                                            <div key={item.id} className={styles.cartItem}>
                                                <div className={styles.courseInfo}>
                                                    <img src={item.image} alt={item.name} className={styles.courseImg} />
                                                    <span className={styles.courseName}>{item.name}</span>
                                                </div>
                                                <div className={styles.quantity}>{item.quantity}</div>
                                                <div className={styles.price}>
                                                    {item.price.toLocaleString('vi-VN')} đ
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.cartTableFooter}>
                                        <div className={styles.totalRow}>
                                            <span>Tổng cộng:</span>
                                            <span>
                                                {cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.checkoutBtnWrapper}>
                                    <button className={styles.checkoutBtn} onClick={handleCheckout}>
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
