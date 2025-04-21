import styles from './Image.module.css';

export default function Image({ image, reverse }) {
  return (
    <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
      <div
        className={`${styles['inner-container']} ${reverse ? styles.reverse : ''}`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
    </div>
  );
}
