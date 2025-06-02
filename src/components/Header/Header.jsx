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
        desktopAuth,
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
                setCurrentUser(userData);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                        <div className="relative flex flex-col items-center group">
                            {/* Avatar + Name Button */}
                            <button
                                className="
                                    flex items-center gap-3 px-4 py-2
                                    bg-[#255f94] hover:bg-[#3387ce] transition-colors
                                    rounded-2xl shadow-md
                                    text-white font-semibold
                                    border border-blue-800
                                    focus:outline-none
                                "
                                style={{ minWidth: 170, fontSize: 18 }}
                            >
                                <div
                                    className="
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    bg-gradient-to-br from-blue-400 to-blue-700
                                    font-bold text-xl
                                "
                                >
                                    {(currentUser.firstName || currentUser.username || 'U')[0].toUpperCase()}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="leading-5">{currentUser.firstName || currentUser.username}</span>
                                    {currentUser.email && (
                                        <span className="text-xs opacity-70">{currentUser.email}</span>
                                    )}
                                </div>
                            </button>
                            {/* Dropdown - show on hover */}
                            <div
                                className="
                                    absolute z-50 left-1/2 -translate-x-1/2 top-full mt-3
                                    w-60 min-w-max bg-[#223d67] text-white rounded-2xl shadow-2xl border border-[#3a5b96]
                                    opacity-0 pointer-events-none scale-95
                                    group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100
                                    transition-all duration-200 origin-top
                                "
                            >
                                <a
                                    href="/profile"
                                    className="
                                        flex items-center gap-2 px-5 py-3 text-base
                                        hover:bg-[#3170b7] hover:text-white rounded-2xl transition
                                        font-medium
                                    "
                                >
                                    <svg width="20" height="20" fill="none" className="opacity-70 mr-1">
                                        <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2" />
                                    </svg>
                                    Profile
                                </a>
                                <a
                                    href="/cart"
                                    className="
                                        flex items-center gap-2 px-5 py-3 text-base
                                        hover:bg-[#3170b7] hover:text-white rounded-2xl transition
                                        font-medium
                                    "
                                >
                                    <svg width="20" height="20" fill="none" className="opacity-70 mr-1">
                                        <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2" />
                                        <rect x="6" y="8" width="8" height="5" rx="2" fill="#fff" opacity="0.3" />
                                    </svg>
                                    Giỏ hàng
                                </a>
                                <div className="border-t border-[#395789] mx-3" />
                                <div
                                    onClick={handleLogout}
                                    className="
                                        flex items-center gap-2 px-5 py-3 text-base text-red-300 hover:bg-[#274875] hover:text-red-400 rounded-2xl cursor-pointer transition font-medium
                                    "
                                >
                                    <svg width="20" height="20" fill="none" className="opacity-70 mr-1">
                                        <path
                                            d="M6 10h8M12 6l4 4-4 4"
                                            stroke="#ff6b6b"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Đăng xuất
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Menu content="Đăng nhập" href="/login" />
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className={`${mobileMenuBtn} md:hidden`} onClick={toggleMenu} aria-label="Toggle menu">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && <div className={overlay} onClick={toggleMenu} />}

                {/* Mobile Menu */}
                <div className={`${mobileMenu} ${isMenuOpen ? mobileMenuActive : ''}`}>
                    {/* Mobile Login/Username */}
                    <div className="mb-6 px-4">
                        {currentUser ? (
                            <div className="space-y-2 relative">
                                <button
                                    className="text-white text-lg block focus:outline-none"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Xin chào {currentUser.firstName || currentUser.username}
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-40 bg-[#223d67] rounded-2xl shadow-lg border border-[#3a5b96] z-50">
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 text-white hover:bg-[#3170b7] hover:text-white rounded-lg transition"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="/cart"
                                        className="block px-4 py-2 text-white hover:bg-[#3170b7] hover:text-white rounded-lg transition"
                                    >
                                        Giỏ hàng
                                    </a>
                                    <div
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-red-300 hover:bg-[#274875] hover:text-red-400 rounded-lg cursor-pointer transition"
                                    >
                                        Đăng xuất
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Menu content="Đăng nhập" href="/login" onClick={toggleMenu} />
                        )}
                    </div>

                    {/* Mobile Menu Items */}
                    <div className="flex flex-col space-y-4 px-4">
                        {dataMenu.map((item, index) => (
                            <Menu key={index} content={item.content} href={item.href} onClick={toggleMenu} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
