import backgroundImage from '../../assets/pexels-kamenczak-775219.jpg';
import styles from './Accomodation.module.css';

import Hero from '../../components/shared/static/Hero/Hero';
import Branches from '../../components/Accomodation/sections/Branches/Branches';
import Footer from '../../components/shared/Footer/Footer';

export default function Accomodation() {
  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={backgroundImage}
        heading="Relax In Rooms Designed For Your Ultimate Comfort"
        subHeading="Wherever your journey takes you, our accommodations offer a blend of comfort, convenience, and luxury, making every stay unforgettable"
        hasButtons={false}
      />
      <Branches />
      <Footer />
    </div>
  );
}
