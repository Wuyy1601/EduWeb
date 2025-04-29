import styles from '../styles.module.scss';
import logo from '@icons/SVGS/Logo.svg';
function  BoxIcons({type, href}) {
    const boxIcons = styles;
    return <div className='logo'><img src={logo} alt="type" /></div>;
}

export default  BoxIcons;