import styles from './Button.module.scss';

function Button({ content }) {
    const { button } = styles;
  return (
    <button className={button}>
      {content}
    </button>
  );
}

export default Button;

  