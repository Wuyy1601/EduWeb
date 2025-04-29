import { use } from 'react';
import style from '../styles.module.scss';
import { useNavigate } from 'react-router-dom';


function Menu({ content, href }) {
    const navigate = useNavigate();
    const { menu, signUpButton } = style;
    const handleClick = () => {
      if (href) {
      { 
        navigate(href);
      }
    }
    }

    return (
      <>
        {content === 'Đăng ký' ? (
          <button className={`${menu} ${signUpButton}`}  onClick={handleClick}>
            {content}
          </button>
        ) : (
          <div className={menu } onClick={handleClick}>
            {content}
          </div>
        )}
      </>
    );
  }

export default Menu;