import styles from './Landing-page.layout.module.css';

import { Outlet } from 'react-router-dom';
import Footer from '../../components/shared/Footer/Footer';

export default function LandingPageLayout() {
  return (
    <div className={styles.container}>
      <Outlet />
      <Footer />
    </div>
  );
}
