import styles from './Footer.module.css';

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.left}>
        <p>035878709</p>
        <p>hotelname@gmail.com</p>
      </div>
      <div className={styles.center}>
        <img src="" alt="hotel logo" />
        <ul>
          <li>
            <Link to="/accomodations">accomodations</Link>
          </li>
          <li>
            <Link to="/occasions">occasions</Link>
          </li>
          <li>
            <Link to="/events">events</Link>
          </li>
          <li>
            <Link to="/wellness">wellness</Link>
          </li>
          <li>
            <Link to="/dinning">dinning</Link>
          </li>
          <li>
            <Link>join us</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <button>
          <Link>book now</Link>
        </button>
      </div>
    </footer>
  );
}
