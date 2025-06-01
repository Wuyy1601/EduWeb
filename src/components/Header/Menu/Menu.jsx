import style from '../styles.module.scss';
import { useNavigate } from 'react-router-dom';

function Menu({ content, href, active, onClick }) {
    const navigate = useNavigate();
    const { menu, signUpButton, menuActive } = style;

    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) onClick(); // để đóng menu mobile
        if (href) navigate(href);
    };

    // Bổ sung menuActive nếu là trang hiện tại
    const classNames = `${menu} ${active ? menuActive : ''} ${content === 'Đăng nhập' ? signUpButton : ''}`;

    // Đăng nhập là button, còn lại là div (có thể đổi sang <a> nếu muốn)
    return content === 'Đăng nhập' ? (
        <button className={classNames} onClick={handleClick}>
            {content}
        </button>
    ) : (
        <div className={classNames} onClick={handleClick}>
            {content}
        </div>
    );
}

export default Menu;
