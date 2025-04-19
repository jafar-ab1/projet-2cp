import backgroundImage from '../../assets/pexels-pixabay-262978.jpg';
import styles from './Dinning.module.css';

import Hero from '../../components/shared/static/Hero/Hero';
import Footer from '../../components/shared/Footer/Footer';
import Spots from '../../components/Dinning/Spots/Spots';

export default function Dinning() {
  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={backgroundImage}
        hasButtons={false}
        heading="Savor culinary delights crafted for your ultimate satisfaction."
        subHeading="Wherever your journey takes you, our dining experiences combine flavor, ambiance, and exceptional service, making every meal unforgettable"
      />
      <Spots />
      <Footer />
    </div>
  );
}
