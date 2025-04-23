import { menuLinks } from '../../../../../constants';
import styles from './Links.module.css';

import { Link } from 'react-router-dom';

export default function Links() {
  return (
    <ul className={styles.container}>
      {menuLinks.map(({ name, to, subLinks }) => (
        <li>
          <Link to={to}>{name}</Link>
          {subLinks.length !== 0 && (
            <div className={styles['extra-links-container']}>
              {subLinks.map(({ name, to }) => (
                <Link to={to}>{name}</Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
