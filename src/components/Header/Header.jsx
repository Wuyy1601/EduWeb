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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                setCurrentUser(userData); // lưu toàn bộ dữ liệu user vào state
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
        }
    }, []);

    useEffect(() => {
        if (!isDropdownOpen) return;
        const handleClickOutside = (e) => {
            setIsDropdownOpen(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

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
                        <div className="relative flex items-center space-x-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDropdownOpen((v) => !v);
                                }}
                                className="text-white focus:outline-none"
                            >
                                Xin chào <span style={{ color: 'white' }}>{currentUser.firstName || currentUser.username}</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-12 w-40 bg-white rounded shadow-lg z-50">
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="/cart"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Giỏ hàng
                                    </a>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Đăng xuất
                                    </div>
                                </div>
                            )}
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
                            <div className="space-y-2 relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDropdownOpen((v) => !v);
                                    }}
                                    className="text-white text-lg block focus:outline-none"
                                >
                                    Xin chào {currentUser.firstName || currentUser.username}
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-16 w-40 bg-white rounded shadow-lg z-50">
                                        <a
                                            href="/profile"
                                            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            Profile
                                        </a>
                                        <a
                                            href="/cart"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            Giỏ hàng
                                        </a>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                )}
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