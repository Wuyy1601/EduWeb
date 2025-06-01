import React from 'react';
import styles from './styles.modules.scss';

const mockCart = {
    items: [
        // Bỏ comment dòng dưới để test trạng thái có khóa học
        // { id: 1, name: 'JavaScript', price: 2000000, quantity: 1, image: 'https://i.imgur.com/0y8Ftya.png' }
    ]
};

export default function Cart() {
    const cart = mockCart; // Thay bằng state thực tế nếu có

    const handleCheckout = () => {
        // Xử lý thanh toán
        alert('Thanh toán thành công!');
    };

    const handleContinueShopping = () => {
        window.location.href = '/';
    };

    return (
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
                            <table className={styles.cartTable}>
                                <thead>
                                    <tr>
                                        <th>Tên khóa học</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className={styles.courseInfo}>
                                                <img src={item.image} alt={item.name} className={styles.courseImg} />
                                                {item.name}
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                {item.price.toLocaleString('vi-VN')} đ
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
    );
}
