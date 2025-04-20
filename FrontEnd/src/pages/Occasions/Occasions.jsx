import styles from './Occasions.module.css';
import backgroundImage from '../../assets/pexels-bertellifotografia-17023023.jpg';

import Hero from '../../components/shared/static/Hero/Hero';
import Footer from "../../components/shared/Footer/Footer"
import OccasionsMain from '../../components/Occasions/OccasionsMain/OccasionsMain';

export default function Occasions() {
  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={backgroundImage}
        hasButtons={false}
        heading="Where Your Special Moments Become Unforgettable"
        subHeading="Our hotel transforms your special occasions into unforgettable celebrations, blending elegance, charm, and exceptional service"
      />
      <OccasionsMain />
      <Footer />
    </div>
  );
}
