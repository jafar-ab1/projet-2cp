import styles from './Wellness.module.css';
import backgroundImage from '../../assets/pexels-asphotograpy-105028.jpg';

import Hero from '../../components/shared/static/Hero/Hero';
import Footer from '../../components/shared/Footer/Footer';
import WellnessThings from '../../components/Wellness/WellnessThings/WellnessThings';

export default function Wellness() {
  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={backgroundImage}
        heading="Where Wellness meet tranquility"
        subHeading="Our hotel combines relaxation, luxury, and wellness to create an experience that rejuvenates your body and spirit, whether through a soothing spa day or a complete wellness retreat."
        hasButtons={false}
      />
      <WellnessThings />
      <Footer />
    </div>
  );
}
