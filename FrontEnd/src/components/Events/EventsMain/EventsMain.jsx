import styles from './EventsMain.module.css';
import EventsImage from '../../../assets/pexels-maorattias-5191742.jpg';

import Description from '../../shared/static/Description/Description';
import Carousel from '../../shared/static/Carousel/Carousel';

export default function EventsMain() {
  return (
    <div className={styles.container}>
      <Description text="Our hotel is the perfect venue for all types of events, from corporate gatherings to private celebrations. We offer versatile spaces, tailored services, and a professional atmosphere to ensure your event is a resounding success. With exceptional decor, state-of-the-art amenities, and dedicated support, every detail is crafted to exceed your expectations." />
      <div className={styles['inner-container']}>
        <Carousel
          image={EventsImage}
          links={[{ text: 'Make a reservation', to: '/book' }]}
          text="events"
        />
      </div>
    </div>
  );
}
