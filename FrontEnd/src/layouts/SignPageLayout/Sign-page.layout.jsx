import styles from './Sign-page.layout.module.css';
import backgroundImage from '../../../public/images/sign-in-page.cover.png';

import { Outlet } from 'react-router-dom';

export default function SignPageLayout() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className={styles.container}
    >
      <Outlet />
    </div>
  );
}
