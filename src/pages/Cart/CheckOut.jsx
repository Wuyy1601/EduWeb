import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';

const mockOrder = {
    course: {
        name: 'Relational Databases & SQL: Complete Guide for Developers',
        price: 929000,
        discount: 660000,
        image: 'https://img-c.udemycdn.com/course/240x135/1921420_3845_3.jpg',
    },
    country: 'Vietnam',
    total: 269000,
    usd: 10.23,
};

const countries = [
    'Vietnam', 'United States', 'Japan', 'South Korea', 'China', 'Singapore', 'Thailand', 'Malaysia', 'Indonesia', 'Philippines', 'India', 'Australia', 'United Kingdom', 'France', 'Germany', 'Canada', 'Russia', 'Brazil', 'Mexico', 'Other'
];

const paymentMethods = [
    { key: 'spay', label: 'S Pay', icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ShopeePay-V-1024x1024.png' },
    { key: 'qrpay', label: 'QR PAY', icon: 'https://th.bing.com/th/id/OIP.zsHE4ELaw12_LsdfAuSZMQHaHa?rs=1&pid=ImgDetMain' },
    { key: 'bankapp', label: 'NẠP QUA APP NGÂN HÀNG', icon: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png' },
    { key: 'atm', label: 'Thẻ ATM - iBanking', icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png' },
    { key: 'visa', label: 'Visa - Master', icon: 'https://img.icons8.com/color/48/000000/visa.png' },
    { key: 'amex', label: 'Amex - JCB', icon: 'https://img.icons8.com/color/48/000000/amex.png' },
    { key: 'viettel_sms', label: 'viettel SMS', icon: 'https://mfvietnam.com/wp-content/uploads/2021/01/Viettel_logo_2021.svg_.png' },
    { key: 'viettel_otp', label: 'viettel OTP', icon: 'https://mfvietnam.com/wp-content/uploads/2021/01/Viettel_logo_2021.svg_.png' },
    { key: 'vina_sms', label: 'vinaphone SMS', icon: 'https://th.bing.com/th/id/OIP.1H43rNDWd3BDkyVqnBIH-wHaHa?rs=1&pid=ImgDetMain' },
    { key: 'mobi_sms', label: 'mobifone SMS', icon: 'https://www.freepnglogos.com/uploads/mobil-oil-logo-png-image-29.png' },
    { key: 'mobi_otp', label: 'mobifone OTP', icon: 'https://www.freepnglogos.com/uploads/mobil-oil-logo-png-image-29.png' },
];

export default function CheckOut() {
    useEffect(() => {
        document.title = "Ulearn - Check out";
    }, []);

    const [cart, setCart] = useState([]);
    const [payment, setPayment] = useState('spay');
    const [country, setCountry] = useState(mockOrder.country);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) setCart(JSON.parse(stored));
    }, []);

    // Tính tổng giá
    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    return (
        <MainLayout>
            <MyHeader />
            <div className={styles.cartPage}>
                <div className={styles.checkoutContainer} style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: 12,
                            padding: 32,
                            width: 480,
                            color: '#222',
                            marginRight: 40,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
                        }}
                    >
                        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Checkout</h2>
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ fontWeight: 600, marginBottom: 8 }}>Billing address</div>
                            <div>
                                <label style={{ fontSize: 14 }}>Country</label>
                                <select style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 4 }} value={country} onChange={e => setCountry(e.target.value)}>
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>Payment method</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, background: '#f7f7fa', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                            {paymentMethods.map(pm => (
                                <button
                                    key={pm.key}
                                    onClick={() => setPayment(pm.key)}
                                    style={{
                                        border: payment === pm.key ? '2px solid #a435f0' : '1px solid #ccc',
                                        background: payment === pm.key ? '#fff' : '#f7f7fa',
                                        color: payment === pm.key ? '#a435f0' : '#222',
                                        borderRadius: 8,
                                        padding: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        minHeight: 70,
                                        minWidth: 70,
                                        outline: 'none',
                                        boxShadow: payment === pm.key ? '0 0 0 2px #a435f033' : 'none',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <img src={pm.icon} alt={pm.label} style={{ width: 32, height: 32, marginBottom: 4, objectFit: 'contain' }} />
                                    <span style={{ fontSize: 13, fontWeight: 500 }}>{pm.label}</span>
                                </button>
                            ))}
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>Order details ({cart.length} course{cart.length > 1 ? 's' : ''})</div>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', background: '#f7f7fa', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                                <img src={item.image} alt="course" style={{ width: 60, height: 36, borderRadius: 6, marginRight: 16 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, color: '#222' }}>{item.name}</div>
                                    <div style={{ color: '#222', fontWeight: 700 }}>{item.price?.toLocaleString('vi-VN')} đ</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: 12,
                            padding: 32,
                            width: 340,
                            color: '#222',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
                        }}
                    >
                        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Order summary</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 18, marginBottom: 24 }}>
                            <span>Total:</span>
                            <span>{total.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <button style={{ width: '100%', background: '#a435f0', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '14px 0', marginBottom: 16, cursor: 'pointer' }}>
                            <span role="img" aria-label="lock">🔒</span> Proceed
                        </button>
                        <div style={{ color: '#bbb', fontSize: 13, marginTop: 8 }}>
                            <b>30-Day Money-Back Guarantee</b><br />
                            Not satisfied? Get a full refund within 30 days. Simple and straightforward!
                        </div>
                    </div>
                </div>
            </div>
            <MyFooter />
        </MainLayout>
    );
}
