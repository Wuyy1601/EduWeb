import styles from './styles.module.scss';
import { dataMenu } from './constant';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import { useEffect, useState, useRef } from 'react';
import useScrollHandling from '@/hooks/useScrollHandling';
import { useLocation, useNavigate } from 'react-router-dom';

function MyHeader() {

    const location = useLocation();
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
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (scrollPosition > 100) {
            setFixedPosition(true);
        } else {
            setFixedPosition(false);
        }
    }, [scrollPosition]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        fetch('http://localhost:8888/api/v1/identity/auth/token', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data && (data.firstName || data.lastName || data.username)) {
                    setCurrentUser(`${data.firstName || ''} ${data.lastName || ''}`.trim() || data.username);
                }
            })
            .catch(() => setCurrentUser(null));
    }, []);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
        setShowDropdown(false);
        navigate('/login');
    };
    const handleProfile = () => {
        setShowDropdown(false);
        navigate('/profile');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
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
                        <Menu key={index} content={item.content} href={item.href}
                            active={location.pathname === item.href} />
                    ))}
                </div>

                {/* Desktop Login/Username */}
                <div className={`${desktopAuth} hidden md:block`} ref={dropdownRef} style={{ position: 'relative' }}>
                    {currentUser ? (
                        <>
                            <span
                                className="text-white cursor-pointer select-none"
                                onClick={() => setShowDropdown((v) => !v)}
                                style={{ userSelect: 'none' }}
                            >
                                Xin chào, {currentUser} <span style={{ fontSize: 12 }}>▼</span>
                            </span>
                            {showDropdown && (
                                <div style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '100%',
                                    background: '#fff',
                                    borderRadius: 6,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    minWidth: 120,
                                    zIndex: 1000,
                                    marginTop: 4
                                }}>
                                    <div
                                        style={{ padding: '10px 16px', cursor: 'pointer', color: '#333' }}
                                        onClick={handleProfile}
                                    >
                                        Profile
                                    </div>
                                    <div
                                        style={{ padding: '10px 16px', cursor: 'pointer', color: '#e53935' }}
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </div>
                                </div>
                            )}
                        </>
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
                    <div className="mb-6 px-4" ref={dropdownRef}>
                        {currentUser ? (
                            <div style={{ position: 'relative' }}>
                                <span
                                    className="text-white text-lg cursor-pointer select-none"
                                    onClick={() => setShowDropdown((v) => !v)}
                                    style={{ userSelect: 'none' }}
                                >
                                    Xin chào, {currentUser} <span style={{ fontSize: 12 }}>▼</span>
                                </span>
                                {showDropdown && (
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: '100%',
                                        background: '#fff',
                                        borderRadius: 6,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        minWidth: 120,
                                        zIndex: 1000,
                                        marginTop: 4
                                    }}>
                                        <div
                                            style={{ padding: '10px 16px', cursor: 'pointer', color: '#333' }}
                                            onClick={() => { handleProfile(); setIsMenuOpen(false); }}
                                        >
                                            Profile
                                        </div>
                                        <div
                                            style={{ padding: '10px 16px', cursor: 'pointer', color: '#e53935' }}
                                            onClick={() => { handleLogout(); setIsMenuOpen(false); }}
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
                                active={location.pathname === item.href}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
