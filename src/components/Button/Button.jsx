import styles from './Button.module.scss';

function Button({ content, ...props }) {
    const { button } = styles;
    return (
        <button {...props} className={`${props.className} ${button}`}>
            {content}
        </button>
    );
}

export default Button;
