import styles from './MenuButton.module.css';

// interface MenuButton {
//   isOpened: boolean;
//   toggle: () => void;
// }

export default function MenuButton({ isOpened, toggle }) {
  return (
    <button
      className={`${styles.container} ${isOpened ? styles.active : ''}`}
      onClick={toggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
