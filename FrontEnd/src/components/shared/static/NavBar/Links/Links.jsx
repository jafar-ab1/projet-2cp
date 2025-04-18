import styles from './Links.module.css';

import { Link } from 'react-router-dom';

export default function Links() {
  return (
    <ul className={styles.container}>
      <li>
        <Link to="/accomodation">Accommodation</Link>
        <div className={styles['extra-links-container']}>
          <div>
            <Link to="/algiers">algiers</Link>
          </div>
          <div>
            <Link to="/oran">oran</Link>
          </div>
          <div>
            <Link to="/annaba">annaba</Link>
          </div>
        </div>
      </li>
      <li>
        <Link to="/occasions">Occasions</Link>
      </li>
      <li>
        <Link to="/events">Events</Link>
      </li>
      <li>
        <Link to="/wellness">Wellness</Link>
      </li>
      <li>
        <Link to="/dining">Dining</Link>
        <div className={styles['extra-links-container']}>
          <div>
            <Link to="#">the gourmet spot</Link>
          </div>
          <div>
            <Link to="#">the golden plate</Link>
          </div>
          <div>
            <Link to="#">the coffee nook</Link>
          </div>
        </div>
      </li>
    </ul>
  );
}
