import styles from './styles.module.scss';
import { dataMenu } from './constant';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import { useEffect, useState } from 'react';
import useScrollHandling from '@/hooks/useScrollHandling';

function MyHeader() {
    const {
        container,
        containerHeader,
        logo,
        containerMenu,
        fixedHeader,
        topHeader,
        mobileMenuBtn,
        mobileMenu,
        mobileMenuActive,
        overlay,
        desktopAuth
    } = styles;

    const { scrollPosition } = useScrollHandling();
    const [fixedPosition, setFixedPosition] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (scrollPosition > 100) {
            setFixedPosition(true);
        } else {
            setFixedPosition(false);
        }
    }, [scrollPosition]);

    useEffect(() => {
        try {
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                // Kiểm tra nhiều trường có thể chứa tên
                setCurrentUser(userData.username || userData.name || userData.firstName || 'User');
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user'); // Xóa data lỗi
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Prevent body scroll when menu is open
        if (typeof document !== 'undefined') {
            document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
        window.location.href = '/login';
    };

    return (
        <div className={`${container} ${topHeader} ${fixedPosition ? fixedHeader : ''}`}>
            <div className={containerHeader}>
                {/* Logo */}
                <div className={logo}>
                    <Logo type="logo" href="/home" />
                </div>

                {/* Desktop Menu */}
                <div className={containerMenu}>
                    {dataMenu.map((item, index) => (
                        <Menu key={index} content={item.content} href={item.href} />
                    ))}
                </div>

                {/* Desktop Login/Username */}
                <div className={`${desktopAuth} hidden md:block`}>
                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-white">Xin chào {currentUser.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300 text-sm"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <Menu content="Đăng nhập" href="/login" />
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`${mobileMenuBtn} md:hidden`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div
                        className={overlay}
                        onClick={toggleMenu}
                    />
                )}

                {/* Mobile Menu */}
                <div className={`${mobileMenu} ${isMenuOpen ? mobileMenuActive : ''}`}>
                    {/* Mobile Login/Username */}
                    <div className="mb-6 px-4">
                        {currentUser ? (
                            <div className="space-y-2">
                                <span className="text-white text-lg block">Xin chào {currentUser.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-gray-300 text-sm"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <Menu content="Đăng nhập" href="/login" onClick={toggleMenu} />
                        )}
                    </div>

                    {/* Mobile Menu Items */}
                    <div className="flex flex-col space-y-4 px-4">
                        {dataMenu.map((item, index) => (
                            <Menu
                                key={index}
                                content={item.content}
                                href={item.href}
                                onClick={toggleMenu}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;