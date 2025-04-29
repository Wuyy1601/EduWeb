import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import logo from '@icons/SVGS/logo.svg';

function MyFooter() {
  const { footer, topSection, logoBox, slogan, newsletter, subscribeForm, subscribeButton, bottomSection, links } = styles;
  return (
    <div className={footer}>
      {/* Logo + Slogan */}
      <div className={topSection}>
        <div className={logoBox}>
          <img src={logo} alt="Ulearn Logo" />
          <div className={slogan}>
            <p>Tài liệu học</p>
            <p>tập hiệu quả</p>
          </div>
        </div>

        {/* Newsletter */}
        <div className={newsletter}>
          <h3>Subscribe to get our Newsletter</h3>
          <div className={subscribeForm}>
            <input type="email" placeholder="Your Email" />
            <Button content="Subscribe" />
          </div>
        </div>
      </div>

      {/* Bottom link */}
      <div className={bottomSection}>
        <div className={links}>
          <a href="#">Careers</a>
          <span>|</span>
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms & Conditions</a>
        </div>
        <p>© 2025 Class Technologies Inc.</p>
      </div>
    </div>
  );
}

export default MyFooter;
