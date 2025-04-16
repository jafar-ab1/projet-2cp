import image from '../../../assets/9em7.png';
import MainLogo from '../static/MainLogo/MainLogo';

import styles from './Footer.module.css';

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <MainLogo width={200} isfooter={true} />
      <div className={styles['inner-container']}>
        <div className={styles.left}>
          <p>035878709</p>
          <p>hotelname@gmail.com</p>
        </div>

        <div className={styles.center}>
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
      </div>
    </footer>
  );
}
