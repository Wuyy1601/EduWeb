import styles from './styles.module.scss';
import { dataMenu } from './constant';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import { useEffect, useState } from 'react';
import useScrollHandling from '@/hooks/useScrollHandling';

function MyHeader() {
    const { container, containerHeader, logo, containerMenu, fixedHeader, topHeader } = styles;
    const { scrollPosition } = useScrollHandling();
    const [fixedPosition, setFixedPosition] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if (scrollPosition > 100) {
            setFixedPosition(true);
        } else {
            setFixedPosition(false);
        }
    }, [scrollPosition]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setUsername(user.name);
    }, []);

    return (
        <div className={`${container} ${topHeader} ${fixedPosition ? fixedHeader : ''}`}>
            <div className={containerHeader}>
                <div className={logo}>
                    <Logo type="logo" href="/home" />
                </div>
                <div className={containerMenu}>
                    {dataMenu.map((item, index) => (
                        <Menu key={index} content={item.content} href={item.href} />
                    ))}
                </div>
                <div>{username ? <span>Xin chào, {username}</span> : <Menu content="Đăng nhập" href="/login" />}</div>
            </div>
        </div>
    );
}

export default MyHeader;
