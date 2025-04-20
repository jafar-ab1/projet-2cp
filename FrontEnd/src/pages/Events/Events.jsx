import styles from './Events.module.css';
import backgroundImage from '../../assets/pexels-iustin-boghitoi-2148940010-30350589.jpg';

import Hero from '../../components/shared/static/Hero/Hero';
import Footer from '../../components/shared/Footer/Footer';
import EventsMain from '../../components/Events/EventsMain/EventsMain';

export default function Events() {
  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={backgroundImage}
        hasButtons={false}
        heading="Where Every Event Becomes Extraordinary."
        subHeading="Our hotel blends elegance and convenience to host events that leave a lasting impression, whether it's a business meeting or a special celebration"
      />
      <EventsMain />
      <Footer />
    </div>
  );
}
