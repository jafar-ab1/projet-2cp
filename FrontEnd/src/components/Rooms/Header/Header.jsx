import Cart from './Cart/Cart';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.container}>
      <div>
        <p className={styles.name}>hotel name</p>
        <Cart count={0} />
      </div>
    </header>
  );
}
